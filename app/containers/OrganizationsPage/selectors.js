import { createSelector } from 'reselect';

/**
 * Direct selector to the organizationsPage state domain
 */
const selectOrganizationsPageDomain = () => (state) => state.get('organizationsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by OrganizationsPage
 */

const selectOrganizationsPage = () => createSelector(
  selectOrganizationsPageDomain(),
  (substate) => substate.toJS()
);

export default selectOrganizationsPage;
export {
  selectOrganizationsPageDomain,
};
