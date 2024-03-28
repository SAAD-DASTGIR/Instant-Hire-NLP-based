import React,{ Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from '../layout/Spinner'
import { getCurrentCompanyProfile, deleteCompanyAccount } from '../../actions/profile'
import { getPostedJobs } from '../../actions/job'
import PostedJobs from './PostedJobs'
import { getCompanyInterviews } from '../../actions/interview'
import CompanyScheduledInterviews from './CompanyScheduledInterviews'

const CompanyDashboard = ({getCurrentCompanyProfile, getCompanyInterviews, getPostedJobs, job, deleteCompanyAccount, auth:{ company },interview:{interviews}, profile:{profile, loading}}) => {

  useEffect(() => {
     async function fetchData() {
      await getCurrentCompanyProfile()
      await getPostedJobs()
      await getCompanyInterviews()
    }
    fetchData();
  }, [loading]);

  return (
    loading && job.loading && profile === null ? <Spinner /> : <div className='container'>
      <div className='ml-10 mb-8'>
        <h1 className="text-6xl font-semibold  text-primary">Company Dashboard</h1>
        <div className="my-6 shadow-md py-8 px-8  rounded-md border-2 border-gray-300 text-4xl">
          <i className="fas fa-user "></i>
          <p className='inline-block ml-2 '>
            Welcome <span className='font-semibold capitalize text-orange-500'>{company && company.name}</span> 
          </p>
          {profile !== null ? (
            // Dashboard Actions
            <div className="dash-buttons mt-5">
              <Link to='/edit-company-profile' className="btn btn-light">
                <i className="fas fa-user-circle text-primary"></i>
                <p className='inline-block ml-4'>Edit Profile</p>
              </Link>
              <Link to={'/post-job'} className="btn btn-light">
                <i className="fa fa-briefcase text-primary"></i>
                <p className='inline-block ml-4'>Post Job</p>
              </Link>
              {company && <Link to={`/company-profile/${company._id}`}  className="btn btn-primary">
                <p className='inline-block ml-4'>View Company Profile</p>
              </Link>}
            </div>
          ) : (
            // Company does not have Profile
            <div className='text-xl'>
            <p className='mt-3'>You have not created profile.</p>
            <p className='mt-1'>To post a job You must create Profile</p>
            <Link to='/create-company-profile' className='btn btn-primary mt-3' >Create Profile</Link> 
          </div>
          )}
        </div>
        {profile !== null ? (
          // Company has profile
        <Fragment>
          <CompanyScheduledInterviews interviews={interviews} />
          <PostedJobs jobs={job.jobs} />
          <div className='my-2'>
            <button onClick={() => deleteCompanyAccount()} className="btn btn-danger">
              <i className="fas fa-user-minus"></i>
              Delete Account
            </button>
          </div>
        </Fragment>) : (
          null
        )}
      </div>
    </div>
  )
}

CompanyDashboard.propTypes = {
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  deleteCompanyAccount: PropTypes.func.isRequired,
  getPostedJobs: PropTypes.func.isRequired,
  getCompanyInterviews: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  job: state.job,
  interview: state.interview
})

export default connect(mapStateToProps,{getCurrentCompanyProfile, getCompanyInterviews, deleteCompanyAccount, getPostedJobs})(CompanyDashboard)