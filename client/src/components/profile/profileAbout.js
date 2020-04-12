import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const profileAbout = ({ profile : {
  bio, skills, user: { name }
}}) => (
  <div class="profile-about bg-light card p-2">
    {bio && (
      <Fragment>
        <h2 class="text-primary">{name}'s Bio</h2>
        <p>
          {bio}
        </p>
      </Fragment>
    )}
    <div class="line"></div>
    <h2 class="text-primary">Skill set</h2>
    <div class="skills">
      {skills.map((skill, i ) => (
        <div key={i} class="p-1"><i class="fas fa-check"></i> {skill}</div>
      ))}
    </div>
  </div>
)


profileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default profileAbout
