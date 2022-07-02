// API UTIL CLASS -> Singleton/static utils
// static api call method
// static BASE URL

export default class APIUtil {
  static baseUrl = "xyz";

  constructor() {}

  static fetchData(endpoint, options = undefined) {
    return fetch(`${this.baseUrl}/${endpoint}`, options).then((res) =>
      res.json()
    );
  }
}
