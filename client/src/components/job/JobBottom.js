import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const JobBottom = ({job:{type, company, gender, qualification, salaryFrom, salaryTo, positions, date, requiredSkills}}) => {
  return (
    <div className=" bg-white px-24 py-12">
       
        <h2 className="text-primary text-4xl font-semibold">About this role:</h2>
        <div className='mt-5 text-gray-600 space-y-1'>
          {type && <p className=""><strong>Job Type: </strong>{type}</p>}
          {gender && <p className=""><strong>Gender: </strong> {gender}</p>}
          {qualification && <p className=""><strong>Qualification Required:</strong> {qualification}</p>}
          {salaryFrom && salaryTo && <p className=""><strong>Salary:</strong>{salaryFrom} - {salaryTo} per year</p>}
          {positions && <p className=""><strong>Positions Available:</strong> {positions}</p>}
          <p className=""><strong>Posted On:</strong><Moment format='DD/MM/YYYY' >{date}</Moment></p>
        </div>
        
        <h2 className="text-primary text-4xl font-semibold mt-8">Skills Required:</h2>
        <div className="flex mt-4">
          {requiredSkills.map((skill, index) => (
              <div key={index } className="px-3 py-1 border-4 bg-gray-200 text-lg font-semibold rounded text-gray-500 mr-2"><i className="fas fa-check"></i> {skill} </div>
          ))}
        </div>
    </div>
  )
}

JobBottom.propTypes = {}

export default JobBottom