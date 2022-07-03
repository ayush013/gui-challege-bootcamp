const API_KEY = "3RxA3kiBwdUQ5S2X6IzXpLJoLACjzhr1";

export default class ApiUtil {
  static searchEndpoint = "https://api.giphy.com/v1/gifs/search";

  constructor() {}

  static async getSearchResults(query, offset = 0, limit = 20) {
    const response = await fetch(
      `${ApiUtil.searchEndpoint}?q=${query}&offset=${offset}&limit=${limit}&api_key=${API_KEY}`
    );
    const data = await response.json();
    return data;
  }
}

// API UTIL (DUMB)
// static API fetch method
