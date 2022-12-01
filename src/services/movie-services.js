export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/'
  session
  apiKey = '5e847ceaa13e81e351a64ec0755ba00e'

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`) + `, received ${res.status}`
    }
    return await res.json()
  }

  async getMovies(string, number) {
    let res
    if (string === '') {
      res = await this.getResource(`search/movie?api_key=${this.apiKey}&query=return&page=${number}`)
      return res.results
    } else {
      res = await this.getResource(`search/movie?api_key=${this.apiKey}&query=${string}&page=${number}`)
      return res.results
    }
  }

  async getRatedMovies(guestId, page) {
    if (!guestId) throw new Error('Guest session not created')
    const req = await fetch(`${this.apiBase}guest_session/${guestId}/rated/movies?api_key=${this.apiKey}&page=${page}`)
    const res = await req.json()
    console.log(res.results)
    return res.results
  }

  async getGuestSession() {
    let res
    res = await this.getResource(`authentication/guest_session/new?api_key=${this.apiKey}`)
    this.session = res.guest_session_id
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

  async getGenres() {
    let res
    res = await this.getResource(`genre/movie/list?api_key=${this.apiKey}`)
    return res.genres
  }
}
