import SearchBar from "./app/SearchBar";
import store, { ACTION_TYPES } from "./app/store";
import "./style.css";

class Main {
  constructor() {
    const searchbar = new SearchBar();
    searchbar.onChange((searchTerm) => {
      console.log(store.getStore());

      store.dispatch({
        type: ACTION_TYPES.SET_DATA,
        payload: ["yo"],
      });
    });

    store.subscribe(({ data }) => {
      console.log("callback from subscription", data);
    });

    store.subscribe(({ pagination }) => {
      console.log("callback from subscription 2", pagination);
    });
  }
}

new Main();

// Api Util with API fetch
// Store with data and page number
// search component with event on change
// tile component with props
// main class with driver logic
// intersection observer class with onchange callback

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
