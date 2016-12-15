/*
 *
 * Auth actions
 *
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  IMPERSONATE_REQUEST,
  IMPERSONATE_SUCCESS,
  IMPERSONATE_FAILURE
} from './constants';

export function onLoginRequest(nextPathName) {
  return {
    type: LOGIN_REQUEST,
    nextPathName
  };
}

export function onLoginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function onLoginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function onLogoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function onLogoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function onLogoutFailure() {
  return {
    type: LOGOUT_FAILURE
  };
}

export function onImpersonateRequest() {
  return {
    type: IMPERSONATE_REQUEST
  };
}


export function onImpersonateSuccess() {
  return {
    type: IMPERSONATE_SUCCESS
  };
}

export function onImpersonateFailure() {
  return {
    type: IMPERSONATE_FAILURE
  };
}