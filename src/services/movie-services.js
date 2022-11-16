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
    const res = await this.getResource(
      `search/movie?api_key=5e847ceaa13e81e351a64ec0755ba00e&language=en-US&query=${string}&page=${number}`,
    )
    return res.results
  }
}
