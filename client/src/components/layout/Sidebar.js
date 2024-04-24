import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { logout } from '../../actions/auth'

function Navbar({ auth:{isAuthenticated,isCompanyAuthenticated, isAdminAuthenticated, user ,loading, company}, logout }) {

  const authLinks = (
    <ul className=' divide-y '>
      <li className=' py-3 '>
        <Link className=' text-customBlue hover:text-black px-2' to="/dashboard">
        <i className="fa fa-id-card-o" aria-hidden="true"></i>
          <span className='text-xl ml-2'> Dashboard</span> 
        </Link>
      </li>
      <li className=' py-3 '>
        {user && (
            <Link className=' text-customBlue hover:text-black px-2'to={`/profile/${user._id}`}>
                <i className='fas fa-user ' />{' '} 
                <span className='text-xl  ml-3'> My Profile</span> 
            </Link>
        )}
      </li>
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/edit-profile" >
        <i class="fa-solid fa-user-pen"></i>
              <span className='text-xl  ml-3'>Edit Profile</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/edit-cv">
            <i className="fa fa-file-text-o" aria-hidden="true"></i>
            <span className='text-xl  ml-5'>Build CV</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className= 'text-customBlue hover:text-black px-2' to="/jobs">
            <i className="fa fa-briefcase" aria-hidden="true"></i>
            <span className='text-xl  ml-5'>Jobs</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/posts">
        <i class="fa-regular fa-comment"></i>
              <span className='text-xl  ml-4'>Commuinty</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/profiles">
            <i className="fa fa-users" aria-hidden="true"></i>  
            <span className='text-xl  ml-3'>Profiles</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/video">
            <i className="fa fa-video-camera" aria-hidden="true"></i>  
            <span className='text-xl  ml-3'>Interviews</span> 
        </Link>
      </li>
      {/* <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/parser">
        <i className="fa fa-clipboard" aria-hidden="true"></i>
              <span className='text-xl  ml-3'>Parser</span> 
        </Link>
      </li> */}
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/" onClick={logout}>
        <i className="fa-solid fa-right-from-bracket"aria-hidden="true"></i>
              <span className='text-xl  ml-3'>Logout</span> 
        </Link>
      </li>
      
    </ul>
  )
  const companyAuthLinks = (
    <ul>
      <li className=' py-3 '>
        <Link className='text-blue px-2' to="/dashboard">
        <i className="fa fa-id-card-o text-blue-300"  aria-hidden="true"></i>
          <span className=' text-customBlue hover:text-black px-2' >  Dashboard</span> 
        </Link>
      </li>
      <li className=' py-3 '>
        {company && (
            <Link className=' text-customBlue hover:text-black px-2'to={`/company-profile/${company._id}`}>
                <i className='fas fa-user ' />{' '} 
                <span className=' text-customBlue hover:text-black px-2 text-xl  ml-3'>My Profile</span> 
            </Link>
        )}
      </li>
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/edit-company-profile" >
        <i class="fa-solid fa-user-pen"></i>
              <span className='text-xl  ml-3'>Edit Profile</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/post-job">
            <i className="fa fa-briefcase " aria-hidden="true"></i>  
            <span className='  text-customBlue hover:text-black px-2text-xl  ml-3'>   Post Job</span> 
        </Link>
      </li>
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/profiles">
            <i className="fa fa-users" aria-hidden="true"></i>  
            <span className=' text-customBlue hover:text-black px-2 text-xl  ml-3'>Profiles</span> 
        </Link>
      </li>
   
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/" onClick={logout}>
        <i className="fa-solid fa-right-from-bracket"aria-hidden="true"></i>
              <span className='text-xl  ml-3'>  Logout</span> 
        </Link>
      </li>
      
    </ul>
  )

  const guestLinks = (
    <ul className='divide-y'>
      <li><Link to="/profiles">Profiles</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  const adminLinks = (
    <ul>
     
      <li className=' py-3'>
        <Link className=' text-customBlue hover:text-black px-2' to="/" onClick={logout}>
        <i className="fa-solid fa-right-from-bracket"aria-hidden="true"></i>
              <span className='text-xl  ml-3'>  Logout</span> 
        </Link>
      </li>
    </ul>
  )
  

  return (
     isAuthenticated || isCompanyAuthenticated ? (
    <div className='sidebar fixed  h-screen border-blue bg-gray-100 w-80 -mt-14 border-b-8 bordeer- border-blue-600' >
        <div className='px-16 mt-20 py-3'>
                {!loading && (
                <Fragment>
                    {isAuthenticated && authLinks }
                    {isCompanyAuthenticated && companyAuthLinks }
                    {isAdminAuthenticated && adminLinks }
                    {!isCompanyAuthenticated && !isAuthenticated && !isAdminAuthenticated && guestLinks }
                </Fragment>
                )}
        </div>
    </div>
    ) : (
        null
    ) 
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  
})

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {logout})(Navbar)
