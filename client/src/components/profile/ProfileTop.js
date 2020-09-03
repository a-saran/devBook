import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({
  profile: {
    status, company, location, website, social, user: {name, avatar}
  }
}) => {
  return (
    <div className="profile-top bg-primary card p-2">
      <img
        className="round-img my-1"
        src={avatar}
        alt="avatar"
      />

      <h1 className="large">{name}</h1>
      <p className="lead">{status} {company && (<span> at {company}</span>)}</p>
      {location && (<p>{location}</p>)}
      <div className="icons my-1">
        {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <i className="fas fa-globe fa-2x"></i>
            </a>
          )}
        {social && social.twitter && (
            <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
              <i className="fas fa-twitter fa-2x"></i>
            </a>
          )}
        {social && social.facebook && (
            <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
              <i className="fas fa-facebook fa-2x"></i>
            </a>
          )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className="fas fa-linkedin fa-2x"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className="fas fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileTop