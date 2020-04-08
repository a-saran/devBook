import React, { useEffect, Fragment } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../actions/profile";
import Loader from '../layout/Loader';

const Dashboard = ({ getCurrentUserProfile, auth: {user}, profile: { loading, profile } }) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, []);

  if(loading && profile === null) {
    return (<Loader />);
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>has</Fragment>
      ): (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn-primary my-1'>
            Create profile
          </Link>
        </Fragment>)}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);
