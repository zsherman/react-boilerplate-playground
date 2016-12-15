/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  SET_LOADING_STATE,
  SET_ERROR_STATE
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload.loading
      };

    case SET_ERROR_STATE:
      return {
        ...state,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export default appReducer;
