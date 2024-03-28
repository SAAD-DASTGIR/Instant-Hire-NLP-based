import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile: {
    bio,
    skills,
    user: {name}
}}) => {
  return (
    <div className="profile-about bg-light p-6">
        {bio && (
        <Fragment>
            <h2 className="text-primary font-semibold text-2xl">{name && name.trim().split(' ')[0].charAt(0).toUpperCase() + name.slice(1) }'s Bio</h2>
            <p>
                {bio}
            </p>
        </Fragment>)}
          
          <div className="line"></div>
          <h2 className="text-primary font-semibold text-2xl">Skill Set</h2>
          <div className="skills">
            {skills && skills.map((skill, index) => (
                <div key={index } className="px-3"><i className="fas fa-check"></i> {skill} </div>
            ))}
          </div>
        </div>
  )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout