import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "./../../actions/profile";

import ProfileForm from "./ProfileForm";

const initialState = {
  company: "",
  website: "",
  location: "",
  status: "",
  skills: "",
  githubusername: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
};

const CreateProfile = ({ createProfile, history }) => {
  const onSubmit = (formData) => {
    console.log(formData);
    createProfile(formData, history);
  };

  return <ProfileForm values={initialState} onSubmit={onSubmit} />;
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  values: PropTypes.object,
};
CreateProfile.defaultProps = {
  values: initialState,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
