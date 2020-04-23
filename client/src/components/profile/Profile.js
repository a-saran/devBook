import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../layout/Loader";
import { getProfileById } from "../../actions/profile";
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop.js';
import ProfileAbout from './profileAbout';
import ProfileExpience from './ProfileExpience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

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
        <Link to='/edit-profile' className='btn-dark'>Edit profile</Link>
      )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />

        {/* Experiences */}
        <div className="profile-exp bg-white card p-2">
          <h2 className="text-primary">Experiences</h2>
          {profile.experience.length > 0 ? (
            <Fragment>
              {profile.experience.map(exp => (
                <ProfileExpience key={exp._id} experience={exp} />
              ))}
            </Fragment>
            ) : (<h4>No experience credentials</h4>)
          }
        </div>

        {/* Education */}
        <div className="profile-edu bg-white card p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            <Fragment>
              {profile.education.map(edu => (
                <ProfileEducation key={edu._id} education={edu} />
              ))}
            </Fragment>
            ) : (<h4>No education credentials</h4>)
          }
        </div>

        {/* github */}
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername}/>
        )}

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
