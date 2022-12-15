export default class MovieServiceSession {
  apiBase = 'https://api.themoviedb.org/3/'
  apiKey = '5e847ceaa13e81e351a64ec0755ba00e'

  async getRatedMovies(page) {
    const guestId = localStorage.getItem('guestId')
    let newUrl = new URL(`guest_session/${guestId}/rated/movies`, this.apiBase)
    newUrl.searchParams.set('api_key', this.apiKey)
    newUrl.searchParams.set('page', page)
    try {
      if (!guestId) {
        throw new Error('Guest session not created')
      }
      const req = await fetch(newUrl)
      return req.json()
    } catch (e) {
      alert(e.message)
    }
  }

  async getGuestSession() {
    let newUrl = new URL('authentication/guest_session/new', this.apiBase)
    newUrl.searchParams.set('api_key', this.apiKey)
    const req = await fetch(newUrl)
    return await req.json()
  }

  async setRated(movieId, rating) {
    const guestId = localStorage.getItem('guestId')
    let newUrl = new URL(`movie/${movieId}/rating`, this.apiBase)
    newUrl.searchParams.set('api_key', this.apiKey)
    newUrl.searchParams.set('guest_session_id', guestId)
    try {
      let res = await fetch(newUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rating }),
      })
      // const res = await req.json()
      if (!res.ok) throw new Error('Failed to rated movie')
      return res.json()
    } catch (e) {
      alert(e.message)
    }
  }
}
