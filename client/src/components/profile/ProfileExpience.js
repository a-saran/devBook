import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExpience = ({ experience: {
  company, title, to, from, description
}}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p><Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? 'Now': <Moment format='YYYY/MM/DD'>{to}</Moment>}</p>
    <p><strong>Position: </strong>{title}</p>
    <p><strong>description: </strong>{description}</p>
  </div>
)

ProfileExpience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExpience
