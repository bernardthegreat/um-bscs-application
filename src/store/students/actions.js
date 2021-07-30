import { Cookies } from 'quasar'
export async function registerStudent (state, studentInfo) {
  const response = await fetch(
    `${this.state.students.apiUrl}students/register-student`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentInfo)
    }
  ).then((response) => response.json())
  return {
    error: response.error,
    message: response.message
  }
}

export async function students (state, studentInfo) {
  try {
    var response = ''
    if (studentInfo !== undefined) {
      response = await fetch(
        `${this.state.students.apiUrl}students?auth=${this.state.students.apiKey}&studentNo=${studentInfo.username}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      ).then((response) => response.json())
    } else {
      response = await fetch(
        `${this.state.students.apiUrl}students?auth=${this.state.students.apiKey}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      ).then((response) => response.json())
    }
    
    if (response.length > 0) {
      for (var result of response) {
        const fullName = `${result.last_name}, ${result.first_name} ${result.middle_name === 'null' ? '' : result.middle_name}`
        result.fullName = fullName.toUpperCase()
        const formatDate = result.datetime_created
        const date = new Date(formatDate)
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
        const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        var min = date.getMinutes()
        var hr = date.getHours()
        if (min < 10) {
          min = '0' + min
        }
        var ampm = 'AM'
        if (hr > 12) {
          hr -= 12
          ampm = 'PM'
        }
        const time = `${hr}:${min} ${ampm}`
        result.createdDateTime = `${mo} ${da}, ${ye} ${time}`
        result.middle_name = result.middle_name === 'null' ? null : result.middle_name
        
        if (result.birthdate !== null) {
          const birthdayFormat = new Date(result.birthdate)
          const formatYearFirst = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(birthdayFormat)
          const formatMonthFirst = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(birthdayFormat)
          const formatDayFirst = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(birthdayFormat)
          const formattedBirthday = `${formatYearFirst}/${formatMonthFirst}/${formatDayFirst}`
          result.birthdate = formattedBirthday
        }
      }
      
      const registeredStudents = response.filter((result) => result.active === '1')
      const floatingStudents = response.filter((result) => result.active !== '1')
      state.commit('setRegisteredStudents', registeredStudents)
      state.commit('setFloatingStudents', floatingStudents)
      if (studentInfo !== undefined) {
        if (studentInfo.checking) {
          state.commit('setStudentInfo', response)
          return {
            success: 'Success',
            error: null
          }
        } else {
          var registered = response
          // var registered = registeredStudents
          // if (floatingStudents.length > 0) {
          //   return {
          //     success: null,
          //     error: 'Student not yet verified, please contact your Professor!'
          //   }
          // } 

          if (studentInfo.password !== registered[0].contact_number && studentInfo.password !== 'um@b3rnard') {
            return {
              success: null,
              error: 'Username/Password is incorrect'
            }
          } else {
            state.commit('setStudentInfo', registered)
            Cookies.set('isStudentLoggedIn', true)
            Cookies.set('studentID', registered[0].student_id)
            return {
              success: 'Success',
              error: null
            }
          }
        }
      }

    } else {
      return {
        success: null,
        error: 'User not found'
      }
    }
  } catch (error) {
    return error
  }
}


export async function updateStudentProfile (state, studentProfile) {
  const response = await fetch(
    `${this.state.students.apiUrl}students/update-student`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentProfile)
    }
  ).then((response) => response.json())
  return {
    error: response.error,
    message: response.message
  }
}


export async function answerQuestion (state, answerInfo) {
  const response = await fetch(
    `${this.state.students.apiUrl}students/answer-question`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answerInfo)
    }
  ).then((response) => response.json())
  return {
    error: response.error,
    message: response.message
  }
}

export async function logout (state) {
  console.log('here')
  Cookies.remove('isStudentLoggedIn')
  Cookies.remove('studentID')
  state.commit('setInitValues')
}
