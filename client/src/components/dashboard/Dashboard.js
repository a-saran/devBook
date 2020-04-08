import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../actions/profile";

const Dashboard = ({ getCurrentUserProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, []);

  return <div>Dashboard</div>;
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
