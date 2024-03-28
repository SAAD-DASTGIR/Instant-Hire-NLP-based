import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


const PrivateAdminRoutes = ({auth:{isAdminAuthenticated, loading}}) => {
  return (
    isAdminAuthenticated && !loading ? <Outlet /> :<Navigate to='/admin' />
  )
}

PrivateAdminRoutes.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateAdminRoutes)