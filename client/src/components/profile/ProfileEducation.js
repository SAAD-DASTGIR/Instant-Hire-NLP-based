import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education:{
    school,
    degree,
    fieldofstudy,
    current,
    to,
    from,
    description
}}) => {
  return (
    <div className='text-gray-600 space-y-1'>
        <h3 className="text-2xl font-semibold mt-3">School: {school}</h3> 
        <p>
            <strong>Degree: </strong>{degree} 
        </p>
        <p>
            <strong>Field of Study: </strong>{fieldofstudy} 
        </p>
        <p>
            <Moment format='DD/MM/YYYY' >{from}</Moment> - {current ? (<span>Now</span>) : (<Moment format='DD/MM/YYYY' >{to}</Moment>)}
        </p>
        {description && (
            <p>
            <strong>Description: </strong> {description}
            </p>
        )}
    </div>
  )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
}

export default ProfileEducation