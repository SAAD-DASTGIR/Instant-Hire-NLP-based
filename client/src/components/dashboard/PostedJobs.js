import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteJob } from '../../actions/job'

const PostedJobs = ({jobs, deleteJob}) => {
    const postedJobs = jobs.map(job => (
        <tr key={job._id}>
            <td>{job.title}</td>
            <td className="hide-sm"> {job.type} </td>
            <td className="hide-sm"> {job.location} </td>
            <td>
                <Link className='btn btn-primary' to={`/job-company/${job._id}`} >
                    <p>View Job</p>
                </Link>
            </td>
            <td>
                <button onClick={() => deleteJob(job._id)} className="btn btn-danger">Delete Job</button>
            </td>
        </tr>
    ))
  return (
    <div>
        <h2 className="text-3xl font-semibold text-primary mt-10 mb-5">Posted Jobs</h2>
        {postedJobs.length > 0 ? (
            jobs.map( job => (
                <div key={job._id} className='mb-5 shadow-md border py-4 px-12 rounded-md border-2 border-gray-300 grid grid-cols-6 text-secondary items-center'>
                    <div className="col-span-4 ">
                        <div className='grid grid-cols-2'>
                            <h3 className='text-2xl font-semibold mb-1'>{job.title}</h3>
                            <p className='text-xl'><span className='font-semibold'>Company: </span>{job.company.name}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p className="text-xl"><span className="font-semibold">Location: </span>{job.location}</p>
                            <p className="text-xl"><span className="font-semibold">Type: </span> {job.type}</p>
                        </div>
                    </div>  
                    <div className="grid justify-items-end">
                        <Link className='btn btn-primary w-40 text-center ' to={`/job-company/${job._id}`} >
                            <p>View Job</p>
                        </Link>
                    </div>
                    <div className="grid justify-items-end">
                        <button onClick={() => deleteJob(job._id)} className="btn btn-danger w-40 text-center">Delete Job</button>
                    </div>
                </div>
            ) )
        ) : (
            <div>
                <span>
                    You have not posted any job
                </span>
            </div>
        ) }
    </div>
  )
}

PostedJobs.propTypes = {
    jobs: PropTypes.array,
    deleteJob: PropTypes.func.isRequired
}

export default connect(null, {deleteJob})(PostedJobs)