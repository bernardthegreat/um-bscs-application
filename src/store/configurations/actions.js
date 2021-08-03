export async function getConfigurations (state) {
  try {
    const response = await fetch(
      `${this.state.students.apiUrl}configurations`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    if (response.length > 0) {
      state.commit('setConfigurations', response)
      return response
    }
  } catch (error) {
    return error
  }
}