import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const CompanyProfileAbout = ({
  profile:{
    company:{name},
    about
  }
}) => {
  return (
    <div className=" px-20 py-12 bg-light ">
      {about && (
        <Fragment>
            <h2 className="text-primary font-semibold text-4xl">Company's About:</h2>
            <p className='mt-4 text-gray-600'>
                {about}
            </p>
        </Fragment>)}
    </div>
  )
}

CompanyProfileAbout.propTypes = {}

export default CompanyProfileAbout