export function setRegisteredStudents (state, students) {
  state.registeredStudents = students
}

export function setFloatingStudents (state, students) {
  state.floatingStudents = students
}

export function setStudentInfo (state, studentInfo) {
  state.studentInfo = studentInfo
}

export function setInitValues (state) {
  state.studentInfo = []
}

export function setWebsocketConnection (state, connection) {
  state.wsConnection = connection
}