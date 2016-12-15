import expect from 'expect';
import authReducer from '../reducer';
import { fromJS } from 'immutable';

describe('authReducer', () => {
  it('returns the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(fromJS({}));
  });
});
