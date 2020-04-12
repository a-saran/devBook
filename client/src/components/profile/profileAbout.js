import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const profileAbout = ({ profile : {
  bio, skills, user: { name }
}}) => (
  <div className="profile-about bg-light card p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name}'s Bio</h2>
        <p>
          {bio}
        </p>
      </Fragment>
    )}
    <div className="line"></div>
    <h2 className="text-primary">Skill set</h2>
    <div className="skills">
      {skills.map((skill, i ) => (
        <div key={i} className="p-1"><i className="fas fa-check"></i> {skill}</div>
      ))}
    </div>
  </div>
)


profileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default profileAbout
