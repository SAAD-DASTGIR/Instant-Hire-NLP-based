import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoutes = ({auth:{isAuthenticated, isAdminAuthenticated, loading}}) => {
  return (
    (isAuthenticated || isAdminAuthenticated) && !loading ? <Outlet /> :<Navigate to='/login' />
  )
}

PrivateRoutes.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoutes)