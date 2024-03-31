import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register, companyRegister } from '../../actions/auth';

function Register({ setAlert, register, isAuthenticated, isCompanyAuthenticated, companyRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [showCompanyRegister, setShowCompanyRegister] = useState(false);
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password does not match', 'danger');
    } else {
      if (showCompanyRegister) {
        await companyRegister({ name, email, password });
      } else {
        await register({ name, email, password });
        navigate('/create-profile');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleRegistration = () => {
    setShowCompanyRegister(!showCompanyRegister);
    // Clear form data when toggling between user registration and company registration
    setFormData({
      name: '',
      email: '',
      password: '',
      password2: ''
    });
  };

  if (isAuthenticated || isCompanyAuthenticated) {
    return isCompanyAuthenticated ? (
      <Navigate to="/company-dashboard" />
    ) : (
      <Navigate to="/dashboard" />
    );
  }

  return (
    <div className="auth bg-cover bg-center h-screen" style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1677194562330-2210f33e2576?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZ2lufGVufDB8fDB8fHww)' }}>
      <div className='auth-container'>
        <div className="btn-container ">
          <button disabled={!showCompanyRegister} onClick={handleToggleRegistration} className={showCompanyRegister ? "btn btn-disable" : "btn btn-primary"}>User Registration</button>
          <button disabled={showCompanyRegister} onClick={handleToggleRegistration} className={showCompanyRegister ? "btn btn-primary" : "btn btn-disable"}>Company Registration</button>
        </div>
        <h1 className="text-6xl my-4 font-semibold text-primary text-center ">
          {showCompanyRegister ? 'Company Registration' : 'User Sign Up'}
        </h1>
        <p className="lead">
          <i className="fas fa-user ml"></i>
          <p className='inline-block ml-4' >{showCompanyRegister ? 'Create Company Account' : 'Create User Account'}</p>
        </p>
        <form className="form" onSubmit={handleSubmit}>
          {showCompanyRegister && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Company Name"
                name="name"
                required
                value={name}
                onChange={handleChange}
              />
            </div>
          )}
          {!showCompanyRegister && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                value={name}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => handleChange(e)} />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary mb-1" value="Register" />
        </form>
        <p className="mb-6 mt-3">
          Already have an account?
          <span className='text-primary'>
            {showCompanyRegister ? (<Link to="/login"> Log In</Link>) : (<Link to={{ pathname: '/login', state: { company: true } }}> Log In</Link>)}
          </span>
        </p>

      </div>
    </div>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  companyRegister: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCompanyAuthenticated: state.auth.isCompanyAuthenticated,
});

export default connect(
  mapStateToProps,
  { setAlert, register, companyRegister }
)(Register);
