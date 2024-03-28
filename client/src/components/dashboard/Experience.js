import React , {Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profile'

const Experience = ({experience, deleteExperience}) => {

  return (
    <div className='my-10'>
        <h2 className="text-3xl font-semibold text-primary mb-5">Job Experiences:</h2>
        {experience.length > 0 ? (
            experience.map(exp => (
                <div key={exp._id} className='shadow-md border py-4 px-12 rounded-md border-2 border-gray-300 grid grid-cols-6 text-secondary items-center'>
                    <div className='col-span-5'>
                        <h3 className='text-2xl font-semibold mb-1'>{exp.title} at {exp.company}</h3>
                        <div className='grid grid-cols-2 '>
                            <p className='text-xl'>{exp.location}</p>
                            <p className='text-xl'>
                                <span className='font-semibold'>From: </span>
                                <Moment format='DD/MM/YYYY'>{exp.from}</Moment> - { exp.to === null ? (
                                    ' Now'
                                    ) : (
                                <Moment format='DD/MM/YYYY'>
                                    {exp.to}
                                </Moment>)}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
                </div>
                )
            )
        ) : (
            <div>
                <span>
                    No experience credentials found
                </span>
                <p>Click here to <Link style={{textDecoration: 'underline'}} to={'/add-experience'} >Add Experience</Link> </p>
            </div>
        )}
    </div>
  )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})( Experience ) 