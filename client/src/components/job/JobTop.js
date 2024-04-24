import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const JobTop = ({job:{company,title,location, description,applicants:{user}}}) => {


  return (
    <div className=" bg-primary px-24 py-16 text-gray-600">
        {/* insert image here */}
        <h2 className="text-7xl  font-bold text-gray-200">{title}</h2>
        <p className="text-3xl text-gray-200 font-semibold my-3">At <span className='text-5xl '>{company.name}</span> </p>
        <div className='grid grid-cols-3 text-gray-200'>
          <p className='col-span-2 text-xl mt-2'>{description}</p>
        </div>
        <div className='space-x-4 mt-8'>
          <Link to={`/company-profile/${company._id}`} className='px-12 py-4 bg-[#0E596D] text-lg text-gray-200 font-semibold hover:opacity-70 duration-300'>VIEW COMPANY</Link>
        </div>
        {/* <p className="">{location}</p>   */}
        {/* add socials here */}
    </div>
  )
}

JobTop.propTypes = {}

export default JobTop