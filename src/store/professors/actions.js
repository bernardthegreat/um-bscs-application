import { Cookies } from 'quasar'
import { question } from '../announcements/getters'
export async function loginUser (state, professorInfo) {
  if (
    professorInfo.username == null ||
    professorInfo.password == null ||
    professorInfo.username.trim() === '' ||
    professorInfo.password.trim() === ''
  ) {
    return {
      success: null,
      error: 'Please provide Username/Password'
    }
  }
  if (professorInfo.username === 'admin' || professorInfo.password === 'um@b3rnard') {
    state.commit('isProfessorLoggedIn', true)
    Cookies.set('isProfessorLoggedIn', true)
    return {
      success: 'Success',
      error: null
    }
  } else {
    return {
      success: null,
      error: 'Username/Password is incorrect'
    }
  }
}

export async function logout (state) {
  Cookies.remove('isProfessorLoggedIn')
  state.commit('isProfessorLoggedIn', false)
}

export async function approveStudent (state, studentInfo) {
  const response = await fetch(
    `${this.state.students.apiUrl}students/approve-student?auth=${this.state.students.apiKey}`,
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

export async function askQuestion (state, questionRequest) {
  const response = await fetch(
    `${this.state.students.apiUrl}ask-question?auth=${this.state.students.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionRequest)
    }
  ).then((response) => response.json())
  console.log(response)
  return response
}

export async function getAllGrades (state) {
  try {
    const response = await fetch(
      `${this.state.students.apiUrl}grades?auth=${this.state.students.apiKey}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    console.log(response)
    if (response.length > 0) {
      const students = this.state.students.registeredStudents
      var studentGrades = []
      for (var studentInfo of students) {
        for (var result of response) {
          if (result.student_id === studentInfo.student_id) {
            const grades = {
              studentInfo: studentInfo,
              grades: result
            }
            console.log(grades)
            studentGrades.push(grades)
          }
        }
        // const gradesStudents = response.filter((result) => result.student_id = studentInfo.student_id)
        // const grades = {
        //   studentInfo: result,
        //   grades: gradesStudents
        // }
        // studentGrades = grades
      }
      console.log(studentGrades)
      state.commit('setAllGrades', studentGrades)
    }
  } catch (error) {
    console.log(error)
    return error
  }
}