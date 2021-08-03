export default function () {
  return {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    exteralAPIUrl: process.env.EXTERNAL_API_URL,
    externalAPIKey: process.env.EXTERNAL_API_URL,
    registeredStudents :[],
    floatingStudents: [],
    studentInfo: [],
    wsConnection: null
  }
}
