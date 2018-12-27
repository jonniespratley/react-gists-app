import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GISTS_SEARCH_BEGIN,
  GISTS_SEARCH_SUCCESS,
  GISTS_SEARCH_FAILURE,
  GISTS_SEARCH_DISMISS_ERROR,
} from '../../../../src/features/gists/redux/constants';

import {
  search,
  dismissSearchError,
  reducer,
} from '../../../../src/features/gists/redux/search';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('gists/redux/search', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when search succeeds', () => {
    const store = mockStore({});

    return store.dispatch(search())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GISTS_SEARCH_BEGIN);
        expect(actions[1]).toHaveProperty('type', GISTS_SEARCH_SUCCESS);
      });
  });

  it('dispatches failure action when search fails', () => {
    const store = mockStore({});

    return store.dispatch(search({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GISTS_SEARCH_BEGIN);
        expect(actions[1]).toHaveProperty('type', GISTS_SEARCH_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSearchError', () => {
    const expectedAction = {
      type: GISTS_SEARCH_DISMISS_ERROR,
    };
    expect(dismissSearchError()).toEqual(expectedAction);
  });

  it('handles action type GISTS_SEARCH_BEGIN correctly', () => {
    const prevState = { searchPending: false };
    const state = reducer(
      prevState,
      { type: GISTS_SEARCH_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchPending).toBe(true);
  });

  it('handles action type GISTS_SEARCH_SUCCESS correctly', () => {
    const prevState = { searchPending: true };
    const state = reducer(
      prevState,
      { type: GISTS_SEARCH_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchPending).toBe(false);
  });

  it('handles action type GISTS_SEARCH_FAILURE correctly', () => {
    const prevState = { searchPending: true };
    const state = reducer(
      prevState,
      { type: GISTS_SEARCH_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchPending).toBe(false);
    expect(state.searchError).toEqual(expect.anything());
  });

  it('handles action type GISTS_SEARCH_DISMISS_ERROR correctly', () => {
    const prevState = { searchError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GISTS_SEARCH_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.searchError).toBe(null);
  });
});

