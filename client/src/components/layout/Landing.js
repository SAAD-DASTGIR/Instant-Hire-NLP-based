import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Land from './AboutPage'
import AboutPage from './AboutPage'
import ServicesPage from './ServicesPage'
import MeetCreatorsPage from './MeetCreatersPage'
import LandingloginPage from './Landinglogin'
import Landingexplore from './Landingexplore'
import Footer from './Footer'
import AnalyzePage from './AnaylzePage'

function Landing({isAuthenticated, isCompanyAuthenticated}) {
  if(isAuthenticated){
    return <Navigate to='/dashboard' />
  }
  if(isCompanyAuthenticated){
    return <Navigate to='/company-dashboard' />
  }
  
  return (
      <div>

    <section className="landing ">
      <div className="dark-overlay">
        <div className="landing-inner">
          <br></br>
          <h1 className="x-large"><i class="fa-solid fa-house-laptop"></i>INSTANT HIRE</h1>
          <p className="lead">
          Craft your identity, share your story, explore opportunities, and chase your career dreams.
          </p>
          <br></br>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
      <AboutPage/>
      <ServicesPage/>
      <LandingloginPage/>
      <Landingexplore/>
      <AnalyzePage/>
      <MeetCreatorsPage/>
      <Footer/>
      </div>
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