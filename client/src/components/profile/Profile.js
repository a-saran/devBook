import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../layout/Loader";
import { getProfileById } from "../../actions/profile";
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop.js';
import ProfileAbout from './profileAbout';

const Profile = ({
  match: {
    params: { id },
  },
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById]);

  if(loading || !profile) {
    return <Loader /> 
  }

  return (
    <Fragment>
      <Link to='/profiles' className="btn-light">Back to profiles</Link>
      {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
        <Link to='edit-profile' className='btn-dark'>Edit profile</Link>
      )}
      <div class="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ profile, auth }) => ({
  profile,
  auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
