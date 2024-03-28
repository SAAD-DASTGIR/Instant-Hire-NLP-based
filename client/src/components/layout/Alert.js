import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeAlert } from '../../actions/alert'

const Alert = ({ removeAlert ,alerts }) => { 
    
    return (
        <div className='alert-container'>
            
            {alerts !== null && alerts.length > 0 && alerts.map(alert => (
                <div key={alert.id} >
                    <div style={{position: 'relative'}}>
                        <button type="button" className="btn btn-light" onClick={() => removeAlert(alert.id)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div  className={` alert alert-${alert.alertType}`}>
                        { alert.msg }
                    </div>
                </div>
            ))}
        </div>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps, {removeAlert})(Alert)