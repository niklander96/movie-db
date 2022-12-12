export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/fawfwf'
  apiKey = '5e847ceaa13e81e351a64ec0755ba00e'
  result

  async getResource(url) {
    let newUrl = new URL(`${url}`, this.apiBase)
    const res = await fetch(newUrl)
    try {
      if (res.ok) {
        return await res.json()
      }
    } catch (e) {
      alert(e.message)
    }
  }

  async getMovies(string, number) {
    try {
      let newUrl = new URL('search/movie', this.apiBase)
      newUrl.searchParams.set('api_key', this.apiKey)
      string === '' ? newUrl.searchParams.set('query', 'return') : newUrl.searchParams.set('query', string)
      newUrl.searchParams.set('page', number)
      return await this.getResource(newUrl)
    } catch (e) {
      alert(e.message)
    }
  }

  async getGenres() {
    try {
      let newUrl = new URL('genre/movie/list', this.apiBase)
      newUrl.searchParams.set('api_key', this.apiKey)
      let res = await this.getResource(newUrl)
      return res.genres
    } catch (e) {
      alert(e.message)
    }
  }
}
