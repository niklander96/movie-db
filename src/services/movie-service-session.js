export default class MovieServiceSession {
  apiBase = 'https://api.themoviedb.org/3/'
  apiKey = '5e847ceaa13e81e351a64ec0755ba00e'

  async getRatedMovies(guestId, page) {
    let newUrl = new URL(`guest_session/${guestId}/rated/movies`, this.apiBase)
    newUrl.searchParams.set('api_key', this.apiKey)
    newUrl.searchParams.set('page', page)
    try {
      if (!guestId) {
        throw new Error('Guest session not created')
      }
      const req = await fetch(newUrl)
      const res = await req.json()
      return res.results
    } catch (e) {
      alert(e.message)
    }
  }

  async getGuestSession() {
    let newUrl = new URL('authentication/guest_session/new', this.apiBase)
    newUrl.searchParams.set('api_key', this.apiKey)
    const req = await fetch(newUrl)
    const res = await req.json()
    return res.guest_session_id
  }

  async setRated(movieId, rating, guestId) {
    let newUrl = new URL(`movie/${movieId}/rating`, this.apiBase)
    newUrl.searchParams.set('api_key', this.apiKey)
    newUrl.searchParams.set('guest_session_id', guestId)
    try {
      let req = await fetch(newUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: `${rating}` }),
      })
      const res = await req.json()
      if (!res.success) throw new Error('Failed to rated movie')
      return res
    } catch (e) {
      alert(e.message)
    }
  }
}
