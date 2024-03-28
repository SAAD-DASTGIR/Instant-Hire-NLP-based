import React , {Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profile'

const Education = ({education, deleteEducation}) => {

    const degrees = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm"> {edu.degree} </td>
            <td className="hide-sm"> {edu.fieldofstudy} </td>
            <td className="hide-sm">
                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - { edu.to === null ? (
                    ' Now '
                    ) : (
                <Moment format='DD/MM/YYYY'>
                    {edu.to}
                </Moment>) }
            </td>
            <td>
                
            </td>
        </tr>
    ))
  return (
    <div className='mt-10'>
        <h2 className="text-3xl font-semibold text-primary mb-5 ">Educational Experiences</h2>
        {education.length > 0 ? (
            education.map(edu => (
                <div key={edu._id} className='shadow-md border py-4 px-12 rounded-md border-2 border-gray-300 grid grid-cols-6 text-secondary items-center'>
                    <div className='col-span-5'>
                        <h3 className='text-2xl font-semibold mb-1'>{edu.degree} in {edu.fieldofstudy}</h3>
                        <div className='grid grid-cols-2 '>
                            <p className='text-xl'>{edu.school}</p>
                            <p className='text-xl'>
                                <span className='font-semibold'>From: </span>
                                <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - { edu.to === null ? (
                                    ' Now'
                                    ) : (
                                <Moment format='DD/MM/YYYY'>
                                    {edu.to}
                                </Moment>)}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
                </div>
            )
            )
        ) : (
            <div>
                <span>
                    No Education Record found 
                </span>
                <p>Click here to <Link style={{textDecoration: 'underline'}} to={'/add-education'} >Add Education</Link> </p>
            </div>
        ) }
        
    </div>
  )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)