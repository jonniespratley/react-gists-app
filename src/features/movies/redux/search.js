import axios from 'axios';
import {
  MOVIES_SEARCH_BEGIN,
  MOVIES_SEARCH_SUCCESS,
  MOVIES_SEARCH_FAILURE,
  MOVIES_SEARCH_DISMISS_ERROR,
} from './constants';

//https://untitled-x5sq3bi1hg0x.runkit.sh/?apikey={{API_KEY}}&s=elf&type=movie&page=1
//http://www.omdbapi.com?apikey=aba065d3&s=elf&type=movie&page=1
const API_URL = 'http://www.omdbapi.com';
const DEFAULT_PARAMS = {
  apikey: 'aba065d3',
  page: 1
};

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function search(args = {}) {
  console.log('search', args);
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: MOVIES_SEARCH_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      //const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      const doRequest = axios.get(API_URL, {params: Object.assign({}, DEFAULT_PARAMS, {s: args.text})})
      doRequest.then(
        (res) => {
          dispatch({
            type: MOVIES_SEARCH_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: MOVIES_SEARCH_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSearchError() {
  return {
    type: MOVIES_SEARCH_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  console.log('movies.search', state, action);
  switch (action.type) {
    case MOVIES_SEARCH_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        searchPending: true,
        searchError: null,
      };

    case MOVIES_SEARCH_SUCCESS:
      // The request is success
      return {
        ...state,
        ...action.data.data,
        searchPending: false,
        searchError: null,
      };

    case MOVIES_SEARCH_FAILURE:
      // The request is failed
      return {
        ...state,
        searchPending: false,
        searchError: action.data.error,
      };

    case MOVIES_SEARCH_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        searchError: null,
      };

    default:
      return state;
  }
}
