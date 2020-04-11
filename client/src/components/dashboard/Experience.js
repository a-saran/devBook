import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {

  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td class="hide-sm">{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
          exp.to === null ? ('Now'): (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
        }
      </td>
      <td>
        <button className="btn-danger" onClick={() => deleteExperience(exp.id)}>Delete</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
    <div className='card'>
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">Title</th>
            <th class="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences}
        </tbody>
      </table>
    </div>
    </Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience)
