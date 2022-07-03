// STORE (PROVIDER)
// stores data from API
// loading and error states
// pagination -> page number
// method to subscribe to store updates

export default class Store {
  _state = {
    data: {
      items: [],
      loading: false,
      error: false,
    },
    pagination: {
      pageNumber: 0,
      pageSize: 0,
      totalCount: Infinity,
    },
  };

  constructor() {
    this.callbacks = [];
  }

  getStore() {
    return this._state;
  }

  reducer(action) {
    const { type, payload } = action;

    switch (type) {
      case ACTION_TYPES.SET_DATA: {
        return {
          ...this._state,
          data: {
            ...this._state.data,
            items: payload,
          },
        };
      }
      case ACTION_TYPES.APPEND_DATA: {
        return {
          ...this._state,
          data: {
            ...this._state.data,
            items: this._state.data.items.concat(...payload),
          },
        };
      }
      case ACTION_TYPES.CLEAR_DATA: {
        return {
          data: {
            items: [],
            loading: false,
            error: false,
          },
          pagination: {
            pageNumber: 0,
            pageSize: 0,
            totalCount: Infinity,
          },
        };
      }
      case ACTION_TYPES.SET_LOADING: {
        return {
          ...this._state,
          data: {
            ...this._state.data,
            loading: payload,
          },
        };
      }
      case ACTION_TYPES.SET_ERROR: {
        return {
          ...this._state,
          data: {
            ...this._state.data,
            error: payload,
          },
        };
      }
      case ACTION_TYPES.SET_PAGINATION: {
        return {
          ...this._state,
          pagination: {
            pageNumber: payload.pageNumber ?? this._state.pagination.pageNumber,
            totalCount: payload.totalCount ?? this._state.pagination.totalCount,
            pageSize: payload.pageSize ?? this._state.pagination.pageSize,
          },
        };
      }
    }
  }

  subscribe = (callback) => {
    this.callbacks.push(callback);
  };

  dispatch = (action) => {
    this._state = this.reducer(action);

    console.log(this._state);

    this._notify();
  };

  _notify = () => {
    this.callbacks.forEach((callback) => callback(this._state));
  };
}

export const ACTION_TYPES = {
  SET_DATA: "SET_DATA",
  APPEND_DATA: "APPEND_DATA",
  CLEAR_DATA: "CLEAR_DATA",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_PAGINATION: "SET_PAGINATION",
};
