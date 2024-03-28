import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function Landing({isAuthenticated, isCompanyAuthenticated}) {
  if(isAuthenticated){
    return <Navigate to='/dashboard' />
  }
  if(isCompanyAuthenticated){
    return <Navigate to='/company-dashboard' />
  }
  
  return (
    <section className="landing ">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">INSTANT HIRE</h1>
          <p className="lead">
            Create User profile/portfolio, share posts, see jobs, and apply for jobs
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
            <Link to="/admin-dashboard" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes ={
  isAuthenticated: PropTypes.bool,
  isCompanyAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCompanyAuthenticated: state.auth.isCompanyAuthenticated
})

export default connect(mapStateToProps)(Landing)