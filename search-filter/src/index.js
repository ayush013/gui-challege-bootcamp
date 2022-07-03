import ApiUtil from "./app/ApiUtil";
import SearchBar from "./app/SearchBar";
import TileComponent from "./app/Tile";
import Store, { ACTION_TYPES } from "./app/store";
import "./style.css";

// MAIN
// initialize search component
// hook to search changes

// subscription to store data
// callback with render template logic

// intersection oberver to listen to load more element
// listens to viewability change
// calls methodX

const store = new Store();

class Main {
  constructor() {
    this.initializeSearchBar();

    this.resultGrid = document.querySelector(".result-grid");

    store.subscribe(({ data: { items } }) => {
      console.log("callback from subscription", items);

      this.renderSearchResults(items);
    });

    // store.subscribe(({ pagination }) => {
    //   console.log("callback from subscription 2", pagination);
    // });
  }

  renderSearchResults = (items) => {
    while (this.resultGrid.children.length) {
      this.resultGrid.firstElementChild.remove();
    }

    const tiles = items.map(
      (item) => new TileComponent(item.title, item.description, item.avatar)
    );

    const fragment = new DocumentFragment();

    tiles.forEach((tile) => fragment.appendChild(tile.getLayout()));

    this.resultGrid.appendChild(fragment);
  };

  // fetchSearchResultsAndNotifyStore
  // get pagination data from store
  // make API call
  // update store state loading
  // update store data on fetch
  fetchSearchResultsAndNotifyStore = (searchTerm) => {
    const {
      pagination: { pageNumber },
    } = store.getStore();

    store.dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });

    ApiUtil.getSearchResults(searchTerm, pageNumber).then((results) => {
      const { data, pagination } = results;

      const storeData = data.map((el) => ({
        title: el.title,
        description: "",
        avatar: el.images.fixed_height.url,
      }));

      store.dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
      store.dispatch({ type: ACTION_TYPES.SET_DATA, payload: storeData });
      store.dispatch({
        type: ACTION_TYPES.SET_PAGINATION,
        payload: {
          pageNumber: pagination.offset + 1,
          totalCount: pagination.total_count,
          pageSize: pagination.count,
        },
      });
    });
  };

  initializeSearchBar() {
    const searchbar = new SearchBar();
    searchbar.onChange((searchTerm) => {
      if (searchTerm) {
        this.fetchSearchResultsAndNotifyStore(searchTerm);
      } else {
        store.dispatch({ type: ACTION_TYPES.CLEAR_DATA });
      }
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

// INTERSECTION OBSERVER (PROVIDER)
// props -> element to observe
// onViewabilityChanged callback
