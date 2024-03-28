import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import {Spinner} from '../layout/Spinner'
import {connect} from 'react-redux'
import JobItem from './JobItem'
import { getJobs, searchJobs } from '../../actions/job'
import JobFilters from '../layout/JobFilters'


const Jobs = ({getJobs, searchJobs, job:{ jobs, loading}}) => {

    const [searchTitle, setSearchTitle] = useState('');

    const handleSearch = async () => {
        searchJobs(searchTitle)
      };

    useEffect(()=>{
        getJobs()
    },[getJobs])
    const navigate = useNavigate()
  return (
    <div className='container  relative'>
        <div className='ml-10 mr-10'>
            <button onClick={() => navigate(-1)} className='btn btn-light mb-1' ><i className="fa fa-chevron-left" aria-hidden="true"></i>  Back</button>
            {loading ? (<Spinner />) : (
                <Fragment>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-6xl font-semibold my-6 text-primary">Jobs</h1>
                        <div className='flex h-12 rounded-lg border-2 border-gray-400'>
                            <input
                                type="text"
                                placeholder="Enter job title"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className='px-3 rounded-l-lg focus:outline-none'
                            />
                            <button className=' rounded-r-lg hover:opacity-80 transition duration-300 btn-primary text-md px-3 flex items-center' onClick={handleSearch}>
                            <i className="fa fa-search mr-2" aria-hidden="true"></i>
                            <p>Search</p>   
                            </button>
                        </div>
                    </div> 
                    
                    <p className="lead">
                        <i className="fas fa-user"></i> Welcome to the community
                    </p>
                    <div className="">
                        {jobs.map(job => (
                            <JobItem key={job._id} job={job} />
                        ))}
                    </div>
                </Fragment>
            ) }
        </div>
        <JobFilters />
    </div>
  )
}

Jobs.propTypes = {
    getJobs: PropTypes.func.isRequired,
    searchJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    job: state.job
})

export default connect( mapStateToProps, {getJobs, searchJobs} )( Jobs)