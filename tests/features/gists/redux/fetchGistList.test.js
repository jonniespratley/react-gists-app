import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GISTS_FETCH_GIST_LIST_BEGIN,
  GISTS_FETCH_GIST_LIST_SUCCESS,
  GISTS_FETCH_GIST_LIST_FAILURE,
  GISTS_FETCH_GIST_LIST_DISMISS_ERROR,
} from '../../../../src/features/gists/redux/constants';

import {
  fetchGistList,
  dismissFetchGistListError,
  reducer,
} from '../../../../src/features/gists/redux/fetchGistList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('gists/redux/fetchGistList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGistList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGistList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GISTS_FETCH_GIST_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', GISTS_FETCH_GIST_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGistList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGistList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GISTS_FETCH_GIST_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', GISTS_FETCH_GIST_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGistListError', () => {
    const expectedAction = {
      type: GISTS_FETCH_GIST_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchGistListError()).toEqual(expectedAction);
  });

  it('handles action type GISTS_FETCH_GIST_LIST_BEGIN correctly', () => {
    const prevState = { fetchGistListPending: false };
    const state = reducer(
      prevState,
      { type: GISTS_FETCH_GIST_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistListPending).toBe(true);
  });

  it('handles action type GISTS_FETCH_GIST_LIST_SUCCESS correctly', () => {
    const prevState = { fetchGistListPending: true };
    const state = reducer(
      prevState,
      { type: GISTS_FETCH_GIST_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistListPending).toBe(false);
  });

  it('handles action type GISTS_FETCH_GIST_LIST_FAILURE correctly', () => {
    const prevState = { fetchGistListPending: true };
    const state = reducer(
      prevState,
      { type: GISTS_FETCH_GIST_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistListPending).toBe(false);
    expect(state.fetchGistListError).toEqual(expect.anything());
  });

  it('handles action type GISTS_FETCH_GIST_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGistListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GISTS_FETCH_GIST_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGistListError).toBe(null);
  });
});

