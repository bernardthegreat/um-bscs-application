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