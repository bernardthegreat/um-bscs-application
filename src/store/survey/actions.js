import { Cookies } from 'quasar'
export async function computeSurvey (state, surveyResults) {
  var sortable = []
  var rawResults = []
  for (var results of surveyResults) {
    const rawScore = {
      name: `${results['name']}`,
      score: `${results['overallScore']}`
    }
    rawResults.push(rawScore)
    sortable.push([results['name'], results['overallScore']]);
  }
  sortable.sort(function(a, b) {
      return b[1] - a[1];
  });

  var arr = {};
  for (var i = 0; i < rawResults.length; i++) {
    arr[rawResults[i].name] = rawResults[i].score;
  }

  const top3 = sortable.slice(0, 3)
  const rolesInfo = {
    firstRole: top3[0][0],
    secondRole: top3[1][0],
    thirdRole: top3[2][0],
    roleResults: JSON.stringify(arr),
    studentNo: Cookies.get('studentID')
  }


  try {
    const response = await fetch(
      `${this.state.students.apiUrl}students/save-role`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rolesInfo)
      }
    ).then((response) => response.json())
    return {
      error: response.error,
      message: response.message
    }
  } catch (error) {
    return error
  }
}

export async function getShuffledStudents (state, studentRole) {
  var response = await fetch(
    `${this.state.students.apiUrl}students?auth=${this.state.students.apiKey}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  ).then((response) => response.json())

  const filterStudents = response.filter((result) => result.role_results !== null && result.final_role == null)
  const role = studentRole.finalRole

  
  var finalListOfStudents = []
  if (role !== 'Researcher') {
    const filterFirstRole = filterStudents.filter((result) => result.first_role == role)
    const filterSecondRole = filterStudents.filter((result) => result.second_role == role)
    const filterThirdRole = filterStudents.filter((result) => result.third_role == role)
    const filterFourthRole = filterStudents.filter((result) => result.fourth_role == role)

    for (var firstRole of filterFirstRole) {
      finalListOfStudents.push(firstRole)
    }

    for (var secondRole of filterSecondRole) {
      finalListOfStudents.push(secondRole)
    }

    for (var thirdRole of filterThirdRole) {
      finalListOfStudents.push(thirdRole)
    }

    for (var fourthRole of filterFourthRole) {
      finalListOfStudents.push(fourthRole)
    }
    for (let i = finalListOfStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [finalListOfStudents[i], finalListOfStudents[j]] = [finalListOfStudents[j], finalListOfStudents[i]];
    }
  } else {
    finalListOfStudents = filterStudents
  }

  const finalTop12 = finalListOfStudents.slice(0, 12)
  for (var finalStudents of finalTop12) {
    const studentInfo = {
      role: role,
      studentNo: finalStudents.student_id
    }
    await state.dispatch('postOfficialRole', studentInfo)
  }
}

export async function postOfficialRole (state, studentInfo) {
  try {
    const response = await fetch(
      `${this.state.students.apiUrl}students/update-official-role`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentInfo)
      }
    ).then((response) => response.json())
    console.log(response)
    return {
      error: response.error,
      message: response.message
    }
  } catch (error) {
    return error
  }

}
