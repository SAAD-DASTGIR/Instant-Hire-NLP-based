import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login, companyLogin } from '../../actions/auth';

function Login({ login, isAuthenticated, isCompanyAuthenticated, companyLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showCompanyLogin, setShowCompanyLogin] = useState(false);

  const { email, password } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showCompanyLogin) {
      companyLogin({ email, password });
    } else {
      login({ email, password });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleLogin = () => {
    setShowCompanyLogin(!showCompanyLogin);
    // Clear form data when toggling between user login and company login
    setFormData({
      email: '',
      password: ''
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  if (isCompanyAuthenticated) {
    return <Navigate to="/company-dashboard" />;
  }

  return (
    <div className="auth bg-cover bg-center h-screen" style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1677194562330-2210f33e2576?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZ2lufGVufDB8fDB8fHww)' }}>
      <div className='auth-container '>
        <div className="btn-container ">
          <button disabled={!showCompanyLogin} onClick={handleToggleLogin} className={showCompanyLogin ? "btn btn-disable" : "btn btn-primary"}>User Login</button>
          <button disabled={showCompanyLogin} onClick={handleToggleLogin} className={showCompanyLogin ? "btn btn-primary" : "btn btn-disable"}>Company Login</button>
        </div>
        <h1 className="large text-center text-primary">
          {showCompanyLogin ? 'Company Login' : 'User Login'}
        </h1>
        <p className="lead ml"><i className="fas fa-user"></i> Sign in Account</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="btn btn-primary mb-1" value="Log in" />
        </form>
        <p className="mt-3 mb-6">
          Do not have an account? <Link className='text-primary' to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  companyLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCompanyAuthenticated: state.auth.isCompanyAuthenticated
});

export default connect(mapStateToProps, { login, companyLogin })(Login);
