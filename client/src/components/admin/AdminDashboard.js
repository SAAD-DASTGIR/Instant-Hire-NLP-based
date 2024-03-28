import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from '../layout/Spinner'
import { Link } from 'react-router-dom'
import { getSpamCompanies } from '../../actions/profile'
import { getSpamJobs } from '../../actions/job'
import { getSpamPosts } from '../../actions/post'
import SpamCompanies from './SpamCompanies'
import SpamJobs from './SpamJobs'
import SpamPosts from './SpamPosts'


const AdminDashboard = ({
  getSpamCompanies,
  getSpamJobs,
  getSpamPosts,
  job,
  post,
  profile,
  removeFromSpamCompanies,
  removeFromSpamJobs,
  removeFromSpamPosts

}) => {

  useEffect(() => {
    getSpamCompanies()
    getSpamJobs()
    getSpamPosts()
  },[getSpamCompanies,getSpamJobs,getSpamPosts])

  return (
    profile.loading || post.loading || job.loading ? <Spinner /> : <div className='bg-white -mr-4 container'>
      <div className='ml-4 mb-12'>
        <h1 className="text-6xl font-semibold mt-3 mb-6 text-primary">Admin Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user "></i>
          <span className='inline-block ml-1 '>Welcome Admin</span>
        </p>
        <Fragment>
          <SpamCompanies profiles={profile.profiles} />
          <SpamJobs jobs={job.jobs} />
          <SpamPosts posts={post.posts} />
        </Fragment>
      </div>
    </div>
  )
}

AdminDashboard.propTypes = {
  getSpamCompanies: PropTypes.func.isRequired,
  getSpamPosts: PropTypes.func.isRequired,
  getSpamJobs: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  job: state.job,
  post: state.post
})

export default connect( mapStateToProps, { 
  getSpamCompanies, 
  getSpamJobs, 
  getSpamPosts,
 } )(AdminDashboard)