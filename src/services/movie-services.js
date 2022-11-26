export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`) + `, received ${res.status}`
    }
    return await res.json()
  }

  async getMovies(string, number) {
    let res
    if (string === '') {
      res = await this.getResource(
        `search/movie?api_key=5e847ceaa13e81e351a64ec0755ba00e&language=en-US&query=return&page=${number}`,
      )
      return res.results
    } else {
      res = await this.getResource(
        `search/movie?api_key=5e847ceaa13e81e351a64ec0755ba00e&language=en-US&query=${string}&page=${number}`,
      )
      return res.results
    }
  }

  async getGuestSession() {
    let res
    res = await this.getResource('authentication/guest_session/new?api_key=5e847ceaa13e81e351a64ec0755ba00e')
    return res.guest_session_id
  }

  async getRated(idG) {
    let res
    res = await this.getResource(
      `guest_session/${idG}/rated/movies?api_key=5e847ceaa13e81e351a64ec0755ba00e&language=en-US&sort_by=created_at.asc`,
    )
    return res.results
  }

  async getGenres() {
    let res
    res = await this.getResource('genre/movie/list?api_key=5e847ceaa13e81e351a64ec0755ba00e&language=en-US')
    return res.genres
  }
}
