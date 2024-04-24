import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { logout } from '../../actions/auth'
import Analyzer from './Anaylzer'
const emailAddress = "msaaddastgir@gmail.com"
function Navbar({ auth:{isAuthenticated,isCompanyAuthenticated, isAdminAuthenticated ,loading}, logout }) {

  const authLinks = (
    <ul>
      <li>
        <Link to={"/"} onClick={ logout }>
          <i className='fas fa-sign-out-alt' />{' '} 
          <span className='hide-sm' >Logout</span>
        </Link>
      </li>
    </ul>
  )
  const companyAuthLinks = (
    <ul>
      <li>
      <Link to={"/"} onClick={ logout }>
          <i className='fas fa-sign-out-alt' />{' '} 
          <span className='hide-sm' >Logout</span>
        </Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/profiles">Explore</Link></li>
    <li><Link to="/admin-dashboard">Admin</Link></li>
    {/* <li><Link to="/parser">Parser</Link></li> */}
    <li><Link to="/register">Register</Link></li>
    <li><Link to="/login">Login</Link></li>
    <li>
      <Link to="" className='text-customBlue ml-1' onClick={() => window.location.href = `mailto:${emailAddress}`}>
        Contact Us 
      </Link>
    </li>
  </ul>
  
  )

  const adminLinks = (
    <ul>
      <li>
        <Link to ='/Landing' onClick={ logout }>
          <i className='fas fa-sign-out-alt' />{' '} 
          <span className='hide-sm' >Logout</span>
        </Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark shadow-xl">
      <h1>
        <Link className='flex items-center' to="/"><i class="fa-solid fa-house-laptop"></i><p className='font-bold ml-1 text-2xl'>INSTANT HIRE</p></Link>
      </h1>
      {!loading && (
      <Fragment>
        {isAuthenticated && authLinks }
        {isCompanyAuthenticated && companyAuthLinks }
        {isAdminAuthenticated && adminLinks }
        {!isCompanyAuthenticated && !isAuthenticated && !isAdminAuthenticated && guestLinks }
      </Fragment>
      )}
    </nav>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {logout})(Navbar)
