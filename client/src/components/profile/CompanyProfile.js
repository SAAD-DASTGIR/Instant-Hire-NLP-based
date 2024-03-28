import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCompanyProfileById, markCompanySpam } from '../../actions/profile'
import {Spinner} from '../layout/Spinner'
import { Link, useParams, useNavigate } from 'react-router-dom'
import CompanyProfileAbout from './CompanyProfileAbout'
import CompanyProfileTop from './CompanyProfileTop'
import CompanyProfileBottom from './CompanyProfileBottom'


const CompanyProfile = ({getCompanyProfileById, markCompanySpam, profile:{profile, loading}, auth}) => {

    const {id} = useParams()

    useEffect(()=> {
        getCompanyProfileById(id)
    },[getCompanyProfileById])
    const navigate = useNavigate()
  return (
    <div className='container'>
        <div className='ml-10 mb-12'>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button onClick={() => navigate(-1)} className='btn btn-light' ><i className="fa fa-chevron-left text-dark" aria-hidden="true"></i> Back</button>
                    <div>
                        {auth.isAdminAuthenticated && <button className='btn btn-danger'>Delete Company</button>}
                        {!auth.isAdminAuthenticated && <button onClick={() => markCompanySpam(id)} className='btn btn-light'>Mark company Spam</button>}
                    </div>
                    </div>
                    
                    <div className=" mt-6">
                        <CompanyProfileTop profile={profile} auth={auth} />
                        <CompanyProfileAbout profile={profile} />
                        <CompanyProfileBottom profile={profile} />
                    </div>
                </Fragment>
            )}
        </div>
    </div>
  )
}

CompanyProfile.propTypes = {
    getCompanyProfileById: PropTypes.func.isRequired,
    markCompanySpam: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired    
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect( mapStateToProps, {getCompanyProfileById, markCompanySpam})(CompanyProfile)