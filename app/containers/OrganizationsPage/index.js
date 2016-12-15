/*
 *
 * OrganizationsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectOrganizationsPage from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export class OrganizationsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = selectOrganizationsPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationsPage);
