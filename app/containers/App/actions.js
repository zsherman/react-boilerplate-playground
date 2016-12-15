import {
  SET_LOADING_STATE,
  SET_ERROR_STATE,
  SET_USER_STATE
} from './constants';

export function setLoadingState(loading) {
  return {
    type: SET_LOADING_STATE,
    payload: {
      loading
    }
  };
}

export function setErrorState(error = new Error('Something went wrong.')) {
  return {
    type: SET_ERROR_STATE,
    payload: {
      error
    }
  };
}