export async function registerStudent (state, studentInfo) {
  const response = await fetch(
    `${this.state.students.apiUrl}students/register-student`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentInfo)
    }
  ).then((response) => response.json())
  console.log(response)
  return {
    error: response.error,
    message: response.success
  }
}