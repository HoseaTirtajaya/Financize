import React from "react";
import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth,
  profile,
  redirectLimitCustomers,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={renderProps =>
        auth.token ? (
          <Component {...renderProps} />
        ) : (
          <Navigate to={{ pathname: "/" }} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(PrivateRoute);
