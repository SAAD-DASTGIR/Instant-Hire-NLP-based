import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({
    profile:{
        user: { _id, name, avatar},
        status,
        company,
        location,
        skills
        }}) => {
  return (
    <div className="profile bg-light">
        <img src={avatar} alt="avatar" className='round-img' />
        <div className='text-gray-700'>
            <h2 className='text-3xl font-semibold'>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
            <p className='mt-2'> <i className="fa fa-building " aria-hidden="true"></i> {status} {company && <span>at {company} </span>}</p>
            <p className="mt-2"><i className="fa fa-map-marker " aria-hidden="true"></i>  {location && <span>{location} </span>} </p>
            <Link className='btn btn-primary mt-3' to={`/profile/${_id}`} >
                <p>View Profile</p>
            </Link>
        </div>
        <ul>
            {skills.slice(0,4).map((skill, index) => (
                <li key={index} className='text-primary flex items-center' >
                    <i className="fas fa-check mr-2 text-sm"></i>
                    <p>{skill }</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

ProfileItem.propTypes = {
    profile: PropTypes.object
}

export default ProfileItem