import ApiUtil from "./app/ApiUtil";
import SearchBar from "./app/SearchBar";
import TileComponent from "./app/Tile";
import Store, { ACTION_TYPES } from "./app/store";
import "./style.css";
import ViewportObserver from "./app/ViewportObserver";

// MAIN
// initialize search component
// hook to search changes

// fetchSearchResultsAndNotifyStore
// get pagination data from store
// make API call
// update store state loading
// update store data on fetch

// subscription to store data
// callback with render template logic

// intersection oberver to listen to load more element
// listens to viewability change
// calls methodX

const store = new Store();

class Main {
  constructor() {
    this.resultGrid = document.querySelector(".result-grid");
    this.loadMoreButton = document.querySelector(".load-more");

    this.searchTerm = "";

    this.initializeSearchBar();
    this.initializeLoadMoreButton();

    store.subscribe(({ data: { items } }) => {
      this.renderSearchResults(items);
    });

    store.subscribe(({ data: { loading } }) => {
      this.toggleLoadMoreButton(loading);
    });
  }

  initializeLoadMoreButton = () => {
    const loadMoreClickedListener = () => {
      const {
        pagination: { pageNumber },
      } = store.getStore();

      store.dispatch({
        type: ACTION_TYPES.SET_PAGINATION,
        payload: {
          pageNumber: pageNumber + 1,
        },
      });

      this.fetchSearchResultsAndNotifyStore();
    };

    ViewportObserver.observe(this.loadMoreButton, loadMoreClickedListener);
    this.loadMoreButton.addEventListener("click", loadMoreClickedListener);
  };

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

  toggleLoadMoreButton = (loading) => {
    if (loading) {
      this.loadMoreButton.classList.add("hidden");
    } else {
      this.loadMoreButton.classList.remove("hidden");
    }
  };

  fetchSearchResultsAndNotifyStore = () => {
    const {
      pagination: { pageNumber },
    } = store.getStore();

    store.dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });

    ApiUtil.getSearchResults(this.searchTerm, pageNumber).then((results) => {
      const { data, pagination } = results;

      const storeData = data.map((el) => ({
        title: el.title,
        description: "",
        avatar: el.images.fixed_height.url,
      }));

      store.dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
      store.dispatch({
        type:
          pageNumber !== 0 ? ACTION_TYPES.APPEND_DATA : ACTION_TYPES.SET_DATA,
        payload: storeData,
      });
      store.dispatch({
        type: ACTION_TYPES.SET_PAGINATION,
        payload: {
          pageNumber: pagination.offset,
          totalCount: pagination.total_count,
          pageSize: pagination.count,
        },
      });
    });
  };

  initializeSearchBar() {
    const searchbar = new SearchBar();
    searchbar.onChange((searchTerm) => {
      this.searchTerm = searchTerm;

      store.dispatch({
        type: ACTION_TYPES.SET_PAGINATION,
        payload: {
          pageNumber: 0,
        },
      });

      if (searchTerm) {
        this.fetchSearchResultsAndNotifyStore();
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
