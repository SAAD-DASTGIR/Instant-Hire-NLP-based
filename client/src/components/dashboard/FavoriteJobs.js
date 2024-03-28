import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeFromFavorites } from '../../actions/job'
import { Link } from 'react-router-dom'

const FavoriteJobs = ({jobs, removeFromFavorites}) => {
  return (
    <div id='favorite_jobs' className='my-10'>
        <h2 className="text-3xl font-semibold text-primary mb-5">Favorite Jobs:</h2>
            {jobs ? (jobs.map(job => (
                <div key={job._id} className='mb-5 shadow-md border py-4 px-12 rounded-md border-2 border-gray-300 grid grid-cols-6 text-secondary items-center'>
                    <div className="col-span-4">
                        <div className="grid grid-cols-2">
                            <h3 className='text-2xl font-semibold mb-1'>{job.title}</h3>
                            <p className='text-xl'><span className='font-semibold'>Company: </span>{job.company.name}</p>
                        </div>
                        <div className="grid grid-cols-2">
                            <p className="text-xl"><span className="font-semibold">Location: </span>{job.location}</p>
                            <p className="text-xl"><span className="font-semibold">Type: </span> {job.type}</p>
                        </div>
                    </div>
                    <div className="grid justify-items-end">
                        <Link className='btn btn-primary w-40 text-center ' to={`/job/${job._id}`} >
                            <p>View Job</p>
                        </Link>
                    </div>
                    <div className="grid justify-items-end">
                        <button onClick={() => removeFromFavorites(job._id)} className="btn btn-danger w-40 text-center">Remove</button>
                    </div>
                </div>
            ))
            ) : (
                <p>You haven't added any job to favorites</p>
            )}
    </div>
  )
}

FavoriteJobs.propTypes = {
    jobs: PropTypes.array.isRequired,
    removeFromFavorites: PropTypes.func.isRequired
}

export default connect( null, {removeFromFavorites})(FavoriteJobs)