export default function () {
  return {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    registeredStudents :[],
    floatingStudents: [],
    studentInfo: []
  }
}
