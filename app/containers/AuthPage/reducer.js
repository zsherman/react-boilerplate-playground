/*
 *
 * Auth reducer
 *
 */

import { fromJS, Map } from 'immutable';
import { getStoredAuthState } from 'utils/auth';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from './constants';

const initialState = fromJS({
  user: {},
  loggingIn: false,
  loggingOut: false
});

function authReducer(state = initialState.merge(getStoredAuthState()), action) {
  switch (action.type) {

    case LOGIN_REQUEST:
      return state.set('loggingIn', true);

    case LOGIN_SUCCESS:
      return state
        .set('user', action.user)
        .set('loggingIn', false);

    case LOGOUT_REQUEST:
      return state.set('loggingOut', true);

    case LOGOUT_SUCCESS:
      return state.set('user', new Map());

    default:
      return state;
  }
}

export default authReducer;
