import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigate } from "react-router-dom";
import { Creators as AuthActions } from "../reducers/userReducer";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { loginRequest } = this.props;
    console.log(this.state);
    loginRequest(this.state);
  };

  render() {
    const { email, password } = this.state;
    const { auth } = this.props;

    if (auth.token) return <Navigate to="/dashboard" />;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Email: </label>
          <input
            name="email"
            type="email"
            onChange={this.handleChange}
            value={email}
          />
          <br />

          <label>Password: </label>
          <input
            name="password"
            type="password"
            onChange={this.handleChange}
            value={password}
          />

          <br />

          <button type="submit">
            {auth.loading ? "Carregando" : "Entrar"}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
