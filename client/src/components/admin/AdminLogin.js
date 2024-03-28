import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { adminLogin } from '../../actions/auth'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const AdminLogin = ({ isAdminAuthenticated, adminLogin }) => {
    const [formData, setFormData] = useState({ 
        email: '',
        password: '' 
    })

    const {email, password} = formData

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        adminLogin({ email, password })     
    }

    if (isAdminAuthenticated) {
        return <Navigate to="/admin-dashboard" />
    }

  return (
    <div className='auth bg-black'>
        <div className="auth-container p-3">
            <h1 className="text-6xl font-semibold mt-10 mb-6 text-center text-primary">Admin Login</h1>
            <form className="form" onSubmit={e => handleSubmit(e)} >
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
                <input type="submit" className="btn btn-primary  mb-8" value="Log in" />
            </form>
            <Link to ='/admin-dashboard'></Link>
        </div>
    </div>
  )
}

AdminLogin.propTypes = {
    isAdminAuthenticated: PropTypes.bool,
    adminLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAdminAuthenticated: state.auth.isAdminAuthenticated,
  })

export default connect( mapStateToProps, {adminLogin} )(AdminLogin)