import React from 'react'
import { Link } from 'react-router-dom'

const CompanyProfileTop = ({
  profile:{
    company:{name,_id},
    location,
    industry,
    website,
    social
  },
  auth
}) => {
  return (
    <div className="bg-primary px-20 py-16 text-gray-600 relative ">
      {/* <img
            className="round-img my-1"
            src={avatar}
            alt="profile pic"
      /> */}
      <h1 className="capitalize text-7xl  font-bold text-gray-200">{ name && name}</h1>
      <p className=" text-gray-200 mt-4 font-semibold text-4xl"><i className="fa fa-map-marker" aria-hidden="true"></i>{location && <span> {location.charAt(0).toUpperCase() + location.slice(1)}</span>}</p>
      <p className="text-gray-200 mt-4 font-semibold text-4xl"><i className="fa fa-industry" aria-hidden="true"></i> { industry &&   industry+' '}  </p>
      <div className="flex justify-center space-x-9 mt-5 text-gray-100">
            {website && (
                <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {social && social.twitter && (
                <a href={`https://${social.twitter}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-2x"></i>
                </a>
            )}
            {social && social.facebook && (
                <a href={`https://${social.facebook}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook fa-2x"></i>
                </a>
            )}
            {social && social.linkedin && (
                <a href={`https://${social.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x"></i>
                </a>
            )}
            {social && social.youtube && (
                <a href={`https://${social.youtube}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube fa-2x"></i>
                </a>
            )}
            {social && social.instagram && (
                <a href={`https://${social.instagram}`} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram fa-2x"></i>
                </a>
            )}
          </div>
          {auth.isCompanyAuthenticated && auth.loading === false && auth.company._id === _id && (
              <Link to='/edit-company-profile' className='btn btn-light absolute top-10 right-10' >Edit Profile</Link>
          )}
    </div>
  )
}

CompanyProfileTop.propTypes = {}

export default CompanyProfileTop