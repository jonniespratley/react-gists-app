const cache = new Map();

/**
 * I fetch gists from github.
 * @param {String} username Github username
 */
export function getGists(username = 'jonniespratley') {
  if (cache.has(username)) {
    return Promise.resolve(cache.get(username));
  }
  
  return fetch(`https://api.github.com/users/${username}/gists`)
    .then(resp => (resp.json().then(json => {
      cache.set(username, json);
      return json;
    })));
}

/**
 * I fetch gist details from github.
 * @param {String} id Gist ID
 */
export function getGist(id) {
  if (cache.has(id)) {
    return Promise.resolve(cache.get(id));
  }
  
  return fetch(`https://api.github.com/gists/${id}`)
  .then(resp => (resp.json().then(json => {
    cache.set(id, json);
    return json;
  })));
}