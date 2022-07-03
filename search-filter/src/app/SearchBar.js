// SEARCH (PROVIDER)
// binds to template of search bar
// emits on change event with debounce

export default class SearchBar {
  constructor() {
    this.layout = document.querySelector(".search");
  }

  onChange = (callback) => {
    const keyupListener = ({ target: { value } }) => {
      callback(value);
    };

    this.layout.addEventListener("keyup", debounce(keyupListener));
  };
}

const debounce = (func, wait = 500) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
};
