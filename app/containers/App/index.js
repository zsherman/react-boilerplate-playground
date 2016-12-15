/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { onLogoutRequest } from 'containers/AuthPage/actions';
import Navigation from 'components/Navigation';
import { selectCurrentUser } from 'containers/AuthPage/selectors';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    handleLogout: React.PropTypes.func,
    user: React.PropTypes.object
  };

  render() {
    console.log(this.props.user)
    return (
      <div>
        {
          this.props.location.pathname !== "/auth" &&
          !this.props.user.isEmpty() &&
          <Navigation
            user={this.props.user}
            handleLogout={this.props.actions.handleLogout}
          />
        }
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser()
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      handleLogout: onLogoutRequest
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
