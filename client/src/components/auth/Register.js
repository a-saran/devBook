import React, { useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { setAlert } from '../../modules/alert/actions';

const Register = ({setAlert}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passowrd do not match", 'danger');
    } else {
      console.log("register");
    }
  };

  const onchange = ({ target: { name, value } }) =>
    setFormData({ ...formData, [name]: value });

  return (
    <div className="card register">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Create Your Account
      </p>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onchange}
            isrequired="true"
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            minLength="6"
            name="password"
            value={password}
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm assword"
            minLength="6"
            name="password2"
            value={password2}
            onChange={onchange}
          />
        </div>
        <input type="submit" value="Register" className="btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Register);
