import expect from 'expect';
import organizationsPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('organizationsPageReducer', () => {
  it('returns the initial state', () => {
    expect(organizationsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
