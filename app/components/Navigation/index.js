/**
*
* Navigation
*
*/

import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import { FormattedMessage } from 'react-intl';
import messages from './messages';


function Navigation({ user, handleLogout }) {
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <button onClick={handleLogout}>Logout</button>
      <div>{user.get('email')}</div>
    </div>
  );
}

Navigation.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default Navigation;
