import axios from 'axios';

const cache = new Map();

/**
 * I fetch gists from github.
 * @param {String} username Github username
 */
export function getGists(username = 'jonniespratley') {
  if (cache.has(username)) {
    return Promise.resolve(cache.get(username));
  }

  return axios.get(`https://api.github.com/users/${username}/gists`)
    .then(resp => {
      console.log('getGists', resp);
      cache.set(username, resp);
      return resp;
    });
}

/**
 * I fetch gist details from github.
 * @param {String} id Gist ID
 */
export function getGist(id) {
  if (cache.has(id)) {
    return Promise.resolve(cache.get(id));
  }

  return axios.get(`https://api.github.com/gists/${id}`)
    .then(resp => {
      cache.set(id, resp);
      return resp;
    });
}