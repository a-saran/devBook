import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("success");
  };

  const onchange = ({ target: { name, value } }) =>
    setFormData({ ...formData, [name]: value });

  return (
    <div className="card sign-in">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Sign Into Your Account
      </p>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onchange}
          />
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
        <input type="submit" value="Log In" className="btn-primary m-auto" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
