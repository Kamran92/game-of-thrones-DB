export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`);
    }
    return await res.json();
  }

  getAllBooks = async () => {
    const res = await this.getResource(`/books/`);
    return res.map(this._transformBook)
  }

  getBook = async (id) => {
    const res = await this.getResource(`/books/${id}/`);
    return this._transformBook(res)
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter)
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(res)
  }

  getAllHouses = async () => {
    const res = await this.getResource(`/houses/`);
    return res.map(this._transformHouses)
  }

  getHouse = async (id) => {
    const res = await this.getResource(`/houses/${id}/`);
    return this._transformHouses(res)
  }

  _transformCharacter = (char) => {
    const { url, name, gender,
            born, died, culture } = char

    return {
      id: this._searchId(url),
      name: this._noData(name),
      gender: this._noData(gender),
      born: this._noData(born),
      died: this._noData(died),
      culture: this._noData(culture)
    }
  }

  _transformBook = (book) => {
    const { url, name, numberOfPages,
            publisher, released } = book

    return {
      id: this._searchId(url),
      name: this._noData(name),
      numberOfPages: this._noData(numberOfPages),
      publisher: this._noData(publisher),
      released: this._noData(released)
    }
  }

  _transformHouses = (houses) => {
    const { url, name, region, words,
            titles, overlord, ancestralWeapons } = houses
    return {

      id: this._searchId(url),
      name: this._noData(name),
      region: this._noData(region),
      words: this._noData(words),
      titles: this._noData(titles),
      overlord: this._noData(overlord),
      ancestralWeapons: this._noData(ancestralWeapons)
    }
  }

  _noData = data => {
    if (Array.isArray(data)) {
      const string = data.join()
      return string === '' ? "no data :(" : data
    }

    return data === '' ? "no data :(" : data
  }

  _searchId = (url) => url.match(/\/(\d+)$/)[1]
}
