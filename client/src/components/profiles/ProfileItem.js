import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light card">
      <img
        className="round-img"
        src={avatar}
        alt="profile img"
      />

      <div>
        <h2>{name}</h2>
        <p>{status} {company && (<span> at {company}</span>)}</p>
        {location && (<p className='my-1'>{location}</p>)}
        <Link to={`/profiles/${_id}`} className="btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0,4).map((skill, i) => (
          <li className="text-primary" key={i}><i className="fas fa-check"></i> {skill}</li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
