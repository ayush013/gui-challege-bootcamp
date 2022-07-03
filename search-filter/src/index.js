import "./style.scss";

class Main {
  constructor() {}
}

new Main();

// Api Util with API fetch
// Store with data and page number
// search component with event on change
// tile component with props
// main class with driver logic
// intersection observer class with onchange callback

// API UTIL (DUMB)
// static API fetch method

// STORE (PROVIDER)
// data from API
// loading and error states
// pagination -> page number
// method to subscribe to store updates

// SEARCH (PROVIDER)
// binds to template of search bar
// emits on change event with debounce

// TILE COMPONENT (CONSUMER)
// props -> title, desc, user avatar

// INTERSECTION OBSERVER (PROVIDER)
// props -> element to observe
// onViewabilityChanged callback

// MAIN
// initialize search component
// hook to search changes

// methodX
// get pagination data from store
// make API call
// update store state loading
// update store data on fetch

// subscription to store data
// callback with render template logic

// intersection oberver to listen to load more element
// listens to viewability change
// calls methodX
