import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


const PrivateCompanyRoutes = ({auth:{isCompanyAuthenticated, loading}}) => {
  return (
    isCompanyAuthenticated && !loading ? <Outlet /> :<Navigate to='/login' />
  )
}

PrivateCompanyRoutes.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateCompanyRoutes)