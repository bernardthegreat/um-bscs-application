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
    `${this.state.students.apiUrl}students/approve-student`,
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


export async function updateFourthRole (state, studentInfo) {
  const response = await fetch(
    `${this.state.students.apiUrl}students/update-fourth-role`,
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
}


export async function askQuestion (state, questionRequest) {
  const response = await fetch(
    `${this.state.students.apiUrl}announcements/ask-question`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionRequest)
    }
  ).then((response) => response.json())
  return response
}

export async function sendMessageRequest (state) {
  const response = await fetch(
    `${this.state.students.apiUrl}announcements/set-recitation`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  ).then((response) => response.json())
  return response
}

export async function removeQuestionMessage (state) {
  const response = await fetch(
    `${this.state.students.apiUrl}announcements/remove-question-dialog`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  ).then((response) => response.json())
  return response
}
