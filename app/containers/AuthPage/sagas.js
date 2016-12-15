// Global deps
import Immutable from 'immutable';
import { takeLatest } from 'redux-saga';
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import Auth0Lock from 'auth0-lock';

// Local deps
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from 'environment';
import { setStoredAuthState, removeStoredAuthState } from 'utils/auth';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from './constants';
import { selectCurrentUser } from './selectors';

// Authentication actions
import {
  onLoginSuccess,
  onLoginFailure,
  onLogoutSuccess,
  onLogoutFailure
} from './actions';

// Login is requested when the AuthPage runs willMount
export function* loginRequest(action) {

  // Create a new lock object
  const lock = new Auth0Lock(
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN,
    {
      auth: { redirect: false },
      closable: false,
      theme: {
        logo: "http://res.cloudinary.com/timber/image/upload/v1480447747/0b2868a4ab6ab7ad2a83e5d41e4f8198_xgjo6l.png",
        primaryColor: "#2D2457"
      },
      authParams: {
        scope: 'openid name email last_ip last_login logins_count picture'
      }
    }
  );

  // Returns a promise with the auth information
  const showLock = () => {
    return new Promise((resolve, reject) => {

      // Bring up the login form
      lock.show();

      // When authentication succeeds return the token
      lock.on('authenticated', (authResult) => {

        // Request user profile and store token
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (!error) {
            setStoredAuthState(authResult.idToken, profile);
            resolve({ user: Immutable.fromJS(profile), idToken: authResult.idToken });
            lock.hide();
          }
        });
      });

      // When authentication fails return the error
      lock.on('unrecoverable_error', (error) => {
        reject(error);
      });

    });
  }

  try {
    // Grab authentication info
    const { user, idToken } = yield call(showLock);

    // Store user info and redirect to requested page
    yield put(onLoginSuccess(user));
    yield put(push(action.nextPathName));
  } catch (error) {
    // When authentication fails show the error
    yield put(onLoginFailure(error));
  }
}

export function* loginRequestWatcher() {
  yield fork(takeLatest, LOGIN_REQUEST, loginRequest);
}

export function* loginRequestFlow() {
  const watcher = yield fork(loginRequestWatcher);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Logout button was clicked
export function* logoutRequest(action) {
  try {
    // Remove jwt token and user from local storage
    removeStoredAuthState();

    // Call logout success action and clear profile
    yield put(onLogoutSuccess());

    // Redirect to auth page
    yield put(push('/auth'));
  } catch (err) {
    yield put(onLogoutFailure(err));
  }
}

export function* logoutRequestFlow() {
  yield fork(takeLatest, LOGOUT_REQUEST, logoutRequest);
}

// All sagas to be loaded
export default [
  loginRequestFlow,
  logoutRequestFlow
];
