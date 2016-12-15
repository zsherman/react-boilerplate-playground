import Immutable from 'immutable';
import queryString from 'query-string'

const ID_TOKEN = `timber_${process.env.NODE_ENV}_id_token`;
const USER = `timber_${process.env.NODE_ENV}_user`;

export function isLoggedIn() {
  return localStorage.getItem(ID_TOKEN);
}

export function requireAuth(nextState, replace) {
  // Todo, there should also be a check that this user has access to the organization/app
  if (!isLoggedIn()) {

    const hash = nextState.location.hash;
    const query = queryString.parse(hash);

    replace({
      pathname: `/auth`,
      state: {
        nextPathname: nextState.location.pathname,
        query
      }
    });
  }
}

// Token getters/setters

export function setUserToken(token) {
  localStorage.setItem(ID_TOKEN, token);
}

export function getUserToken() {
  return localStorage.getItem(ID_TOKEN);
}

export function clearUserToken() {
  return localStorage.removeItem(ID_TOKEN);
}

// User getters/setters

export function setUser(user) {
  localStorage.setItem(USER, JSON.stringify(user));
}

export function getUser() {
  return localStorage.getItem(USER);
}

export function clearUser() {
  return localStorage.removeItem(USER);
}

// Combined token/user getters/setters

export function setStoredAuthState(idToken, user) {
  console.log(idToken, user)
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(USER, JSON.stringify(user));
}

export function removeStoredAuthState() {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(USER);
};

export function getStoredAuthState() {
  try {
    // Grab the cached token/user to hydrate the auth state
    const idToken = localStorage.getItem(ID_TOKEN);
    const user = Immutable.fromJS(JSON.parse(localStorage.getItem(USER)));
    return { idToken, user };
  } catch (err) {
    // If we can't get the token/user, clear it
    removeStoredAuthState();
    return {};
  }
};
