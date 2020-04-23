import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ProfileForm from "./ProfileForm";
import { getCurrentUserProfile } from "../../actions/profile";
import Loader from "../layout/Loader";
import { createProfile } from "./../../actions/profile";

const EditProfile = ({ getCurrentUserProfile, loading, profile, history, createProfile }) => {
  const [values, setValues] = useState();

  useEffect(() => {
    !profile && getCurrentUserProfile();

    if (!loading && profile) {
      const { company, website, location, githubusername, bio, status, skills, socials } = profile;
      const n = {
        company: company || "",
        website: website || "",
        location: location || "",
        status: status || "",
        skills: skills ? skills.join(', ') : "",
        githubusername: githubusername || "",
        bio: bio || "",
        twitter: (socials && socials.twitter) || "",
        facebook: (socials && socials.facebook) || "",
        linkedin: (socials && socials.linkedin) || "",
        youtube: (socials && socials.youtube) || "",
        instagram: (socials && socials.instagram) || "",
      };
      setValues(n);
    }
  }, [profile, loading]);

  const onSubmit = (formData) => {
    console.log('submitted',formData)
    createProfile(formData, history, true);
  };

  if (loading || !values) {
    return <Loader />;
  }
  return <ProfileForm values={values} onSubmit={onSubmit} />;
};

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = ({ profile }) => ({
  profile: profile.profile,
  loading: profile.loading,
});

export default withRouter(connect(mapStateToProps, { getCurrentUserProfile, createProfile })(EditProfile));
