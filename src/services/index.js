import axios from 'axios';

export function memoize(fn){
  const cache = new Map();
  const cached = function(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
};

const cache = new Map();

/**
 * I fetch gists from github.
 * @param {String} username Github username
 */
export function getGists(username) {
  let url = 'https://api.github.com/gists';
  
  if (username) {
    url = `https://api.github.com/users/${username}/gists`
  }

  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }

  return axios.get(url)
    .then(resp => {
      console.log('getGists', resp);
      cache.set(url, resp);
      return resp;
    });
}

/**
 * I fetch gist details from github.
 * @param {String} id Gist ID
 */
export function getGist(id) {
  let url = `https://api.github.com/gists/${id}`;
  
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }

  return axios.get(url)
    .then(resp => {
      cache.set(url, resp);
      return resp;
    });
}