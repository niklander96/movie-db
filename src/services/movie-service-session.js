export default class MovieServiceSession {
  apiBase = 'https://api.themoviedb.org/3/'
  apiKey = '5e847ceaa13e81e351a64ec0755ba00e'

  async getRatedMovies(guestId, page) {
    if (!guestId) throw new Error('Guest session not created')
    const req = await fetch(`${this.apiBase}guest_session/${guestId}/rated/movies?api_key=${this.apiKey}&page=${page}`)
    const res = await req.json()
    return res.results
  }

  async getGuestSession() {
    const req = await fetch(`${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`)
    const res = await req.json()
    return res.guest_session_id
  }

  async setRated(movieId, rating, guestId) {
    let req = await fetch(`${this.apiBase}movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: `${rating}` }),
    })
    const res = await req.json()
    if (!res.success) throw new Error('Failed to rated movie')
    return res
  }
}
