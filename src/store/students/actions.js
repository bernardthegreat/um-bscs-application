import { Cookies, LocalStorage } from 'quasar'
export async function initiateWebSocket (state) {
  console.log('Starting connection to WebSocket Server')
  try {
    const responseWS = await fetch(
      `${this.state.students.exteralAPIUrl}covid-vaccination/ws?auth=${this.state.students.exteralAPIKey}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response)
    if (responseWS) {
      var connection = new WebSocket(`${process.env.WS_URL}/covid-vaccination/ws`)
      connection.onopen = (event) => {
        console.log('Successfully connected to the websocket server...')
      }
      state.commit('setWebsocketConnection', connection)
      // connection.onmessage = (event) => {
      //   console.log(event)
      // }
    }
  } catch (error) {
    console.log(error)
    return error
  }
  // connection.onopen = (event) => {
  //   console.log(event)
  //   console.log('Successfully connected to the websocket server...')
  // }
}

export async function registerStudent (state, studentInfo) {
  const response = await fetch(
    `${this.state.students.apiUrl}register-student`,
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
    console.log(`${this.state.students.apiUrl}um-students?auth=${this.state.students.apiKey}`)
    var response = ''
    if (studentInfo !== undefined) {
      response = await fetch(
        `${this.state.students.apiUrl}um-students?auth=${this.state.students.apiKey}&studentNo=${studentInfo.username}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      ).then((response) => response.json())
    } else {
      response = await fetch(
        `${this.state.students.apiUrl}um-students?auth=${this.state.students.apiKey}`,
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
        const roleResults = result.role_results.split(',')
        result.role_results = roleResults
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
        
        console.log(result.answer_datetime)
        try {
          if (result.answer_datetime !== null) {
            const answerDate = result.answer_datetime.replace(/T/, ' ').replace(/Z/, ' ')
            const ansDate = new Date(answerDate)
            const ansYear = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(ansDate)
            const ansMonth = new Intl.DateTimeFormat('en', { month: 'long' }).format(ansDate)
            const ansDay = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(ansDate)
            var ansMin = ansDate.getMinutes()
            var ansHr = ansDate.getHours()
            if (ansMin < 10) {
              ansMin = '0' + ansMin
            }
            var ansAmpm = 'AM'
            if (ansHr > 12) {
              ansHr -= 12
              ansAmpm = 'PM'
            }
            const ansTime = `${ansHr}:${ansMin} ${ansAmpm}`
            result.answerDateTime = `${ansMonth} ${ansDay}, ${ansYear} ${ansTime}`
          }
        } catch (error) {
          console.log(error)
        }

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
      const registeredStudents = response.filter((result) => result.active)
      const floatingStudents = response.filter((result) => !result.active)
      state.commit('setRegisteredStudents', registeredStudents)
      state.commit('setFloatingStudents', floatingStudents)
      if (studentInfo !== undefined) {
        if (studentInfo.checking) {
          console.log(`${this.state.students.apiUrl}um-students?auth=${this.state.students.apiKey}`)
          var checkGroupmates = await fetch(
            `${this.state.students.apiUrl}um-students?auth=${this.state.students.apiKey}`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            }
          ).then((response) => response.json())

          for (var group of checkGroupmates) {
            group.middle_name = group.middle_name === 'null' ? '' : result.middle_name
          }
          if (response[0].group_name !== null) {
            const groupMates = checkGroupmates.filter((result) => result.group_name === response[0].group_name)
            state.commit('setGroupmates', groupMates)
          }
          
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
            LocalStorage.set('isStudentLoggedIn', true)
            LocalStorage.set('studentID', registered[0].student_id)
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
    `${this.state.students.apiUrl}update-student?auth=${this.state.students.apiKey}`,
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
    `${this.state.students.apiUrl}answer-question?auth=${this.state.students.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answerInfo)
    }
  ).then((response) => response.json())
  console.log(response)
  return {
    error: response.error,
    message: response.message
  }
}

export async function revertRecitation (state) {
  try {
    const response = await fetch(
      `${this.state.students.apiUrl}revert-questions?auth=${this.state.students.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    return {
      error: response.error,
      message: response.message
    }
  } catch (error) {
    return {
      error: error,
      message: null
    }
  }
}

export async function logout (state) {
  Cookies.remove('isStudentLoggedIn')
  Cookies.remove('studentID')
  LocalStorage.remove('isStudentLoggedIn')
  LocalStorage.remove('studentID')
  state.commit('setInitValues')
}
