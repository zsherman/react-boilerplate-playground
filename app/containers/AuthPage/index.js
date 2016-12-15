/*
 *
 * Auth
 *
 */

// Global dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import R from 'ramda';

// Auth utilities
import selectAuth from './selectors';
import { onLoginRequest, onLogoutRequest, onImpersonateRequest } from './actions';
import messages from './messages';

export class Auth extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    const { state } = this.props.location;
    const { query = {}, nextPathname = '/' } = state || {};

    // Don't just check for empty query
    // check for impersonation specific params
    if (R.isEmpty(query)) {
      this.props.actions.onLoginRequest(nextPathname);
    } else {
      this.props.actions.onImpersonate(query);
    }
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = selectAuth();

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      onLoginRequest,
      onLogoutRequest,
      onImpersonateRequest
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
