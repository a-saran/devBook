import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Loader from '../layout/Loader';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...props
}) => {
  if(loading) {
    return <Loader />
  }

  return (
    <Route
      {...props}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  loading: auth.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
