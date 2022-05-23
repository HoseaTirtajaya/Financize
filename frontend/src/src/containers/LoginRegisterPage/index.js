import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Divider, Header } from 'semantic-ui-react';
import CurrencyInput from '../Settings/Currency/Input';
import CurrencyExchangeRate from '../Settings/Currency/ExchangeRate';
import AccountForm from '../Accounts/Form';
import AccountList from '../Accounts/List';
import { completeSetup } from '../../actions/settings';
import { loadAccounts } from '../../actions/entities/accounts';
import { getAccountsList } from '../../selectors/entities/accounts';
import { isSignedIn } from 'features/user/state/User.selector';

class InitialSetup extends React.Component {
  componentDidMount() {
    this.props.loadAccounts();
  }

  render() {
    return (
      <div class="ui center aligned container">
      <Header as="h2" icon="money bill alternate icon" content="Financize"/>
        <div class="ui placeholder segment">
          <div class="ui two column very relaxed stackable grid">
            <div class="column">
              <div class="ui form">
                <div class="field">
                  <label>Username</label>
                  <div class="ui left icon input">
                    <input type="text" placeholder="Username"/>
                    <i class="user icon"></i>
                  </div>
                </div>
                <div class="field">
                  <label>Password</label>
                  <div class="ui left icon input">
                    <input type="password"/>
                    <i class="lock icon"></i>
                  </div>
                </div>
                <div class="ui blue submit button">Login</div>
              </div>
            </div>
            <div class="middle aligned column">
              <div class="ui big button">
                <i class="signup icon"></i>
                <Link to="/register">Sign Up</Link>
              </div>
            </div>
          </div>
          <div class="ui vertical divider">
            Or
          </div>
        </div>
    </div>
    );
  }
}

InitialSetup.propTypes = {
  isAuthenticated: PropTypes.bool,
  accounts: PropTypes.arrayOf(PropTypes.object),
  loadAccounts: PropTypes.func,
  completeSetup: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: isSignedIn(state),
  accounts: getAccountsList(state)
});

export default connect(
  mapStateToProps,
  { loadAccounts, completeSetup }
)(InitialSetup);
