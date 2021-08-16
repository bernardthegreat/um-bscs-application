export async function getAnnouncements (state) {
  try {
    const response = await fetch(
      `${this.state.students.apiUrl}um-announcements`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    if (response.length > 0) {
      for (var result of response) {
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
      }
      const pinnedAnnouncements = response.filter((result) => result.pinned === '1' && result.type === 1)
      const otherAnnouncements = response.filter((result) => result.pinned !== '1' && result.type === 1)
      const question = response.filter((result) => result.pinned !== '1' && result.type === 2)
      state.commit('setPinnedAnnouncements', pinnedAnnouncements)
      state.commit('setOtherAnnouncements', otherAnnouncements)
      state.commit('setQuestion', question)
    }
  } catch (error) {
    return error
  }
}