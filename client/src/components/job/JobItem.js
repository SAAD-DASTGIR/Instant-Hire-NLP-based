import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const JobItem = ({
    job:{
        _id,
        company: { name},
        title,
        location,
        description,
        type,
        requiredSkills,
        date
    }
    }) => {
  return (
    <div className=" bg-light text-secondary  gap-4 my-4 p-8 shadow-md  ">
        <div className="flex justify-between">
            <h2 className='text-3xl font-semibold '>{title}  </h2>
            <p className='mr-3 bg-[#ccc] px-4 py-2 rounded-xl text-xl'><i className="fa fa-briefcase" aria-hidden="true"></i> {type}</p>
        </div>
        <div className="mt-2 mb-3 flex space-x-16 items-center">
            <p className='text-xl items-center '><i className="fa fa-building " aria-hidden="true"></i> <span className="inline-block"> {name && name}</span></p>
            <p className="text-xl"> {location && <span><i className="fa fa-map-marker " aria-hidden="true"></i> {location} </span>} </p>
            <p className='text-xl '> <i className="fa fa-clock-o" aria-hidden="true"></i> <span className='font-semibold '>Posted on:</span>  <Moment format='DD/MM/YYYY' >{date}</Moment></p> 
        </div>
        <div className='flex'>
            {requiredSkills.slice(0,4).map((skill, index) => (
                <div key={index} className='text-primary px-3 py-1 bg-[#d0d0d0]  rounded shadow-sm mr-4'>
                    <p className='inline-block  text-xl'>{skill }</p>
                </div>
            ))}
        </div>
        <p className="leading-6 text-xl mt-4 mb-4">{description}</p>
        <Link className='btn btn-primary' to={`/job/${_id}`} >
            <p>View Job</p>
        </Link>
        
        
        
    </div>
  )
}

JobItem.propTypes = {
    job: PropTypes.object.isRequired
}

export default JobItem