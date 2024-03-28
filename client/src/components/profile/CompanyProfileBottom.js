import React from 'react'
import PropTypes from 'prop-types'

const CompanyProfileBottom = ({
    profile:{
        headcount,
        industry,
        location
    }
}) => {
  return (
    <div className="bg-white  px-20 py-12 ">
        <h2 className='text-primary font-semibold text-4xl'>Company Details:</h2>
        <div className='mt-4 text-gray-600 '>
          {headcount && <p><strong>HeadCount:</strong> {headcount} </p>}
          <p><strong>Industry:</strong> {industry} </p>
          <p><strong>Location:</strong> {location} </p>
        </div>
        
    </div>
  )
}

CompanyProfileBottom.propTypes = {}

export default CompanyProfileBottom