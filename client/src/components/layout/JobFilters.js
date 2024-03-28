import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { filterJobs } from '../../actions/job';
import {connect} from 'react-redux'

const JobFilters = ({filterJobs}) => {

    const initialFormData = {
      title: '',
      location: '',
      type: '',
      gender: '',
      qualification: '',
      skills: '',
      salaryFrom: '',
      salaryTo: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const {
        location,
        type,
        gender,
        qualification,
        skills,
        salaryFrom,
        salaryTo
      } = formData;

    const handleSearch = async () => {
        filterJobs(formData)
      };
    const handleReset = () => {
        setFormData(initialFormData);
      };

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className='bg-light opacity-90 fixed h-screen right-0 w-80 top-16 p-8 text-base'>
            <h2 className="text-3xl text-primary font-bold mt-12 mb-4">Job Filters</h2>


            {/* Location */}
            <p className="font-semibold text-gray-600">Enter Location</p>
            <input
            type="text"
            placeholder="eg. Islamabad"
            name="location"
            value={location}
            onChange={e => onChange(e)}
            className="mb-4 p-2 rounded-lg border w-full"
            />

            {/* Type */}
            <p className="font-semibold text-gray-600">Select Job Type</p>
            <select className="mb-4 p-2 text-gray-400 rounded-lg border w-full h-11" name="type" value={type} onChange={e => onChange(e)}>
                <option value="">Any</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
            </select>

            {/* Gender */}
            <p className="font-semibold text-gray-600">Select Gender</p>
            <select className="mb-4 p-2 text-gray-400 rounded-lg border w-full h-11" name="gender" value={gender} onChange={e => onChange(e)}>
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            

            {/* Qualification */}
            <p className="font-semibold text-gray-600">Enter Qualification</p>
            <input
            type="text"
            placeholder="eg. Bachelors"
            name="qualification"
            value={qualification}
            onChange={e => onChange(e)}
            className="mb-4 p-2 rounded-lg border w-full"
            />

            {/* Skills */}
            <p className="font-semibold text-gray-600">Enter Skills</p>
            <input
            type="text"
            placeholder="eg. HTML,CSS,PHP"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
            className=" p-2 rounded-lg border w-full"
            />
            <small className="form-text mb-4">
              Please use comma separated values 
            </small>

            {/* Salary From */}
            <p className="font-semibold text-gray-600">Enter Salary from</p>
            <input
            type="number"
            placeholder="eg. 25000"
            name="salaryFrom"
            value={salaryFrom}
            onChange={e => onChange(e)}
            className="mb-4 p-2 rounded-lg border w-full"
            />

            {/* Salary To */}
            <p className="font-semibold text-gray-600">Enter Salary to</p>
            <input
            type="number"
            placeholder="eg. 35,000"
            name="salaryTo"
            value={salaryTo}
            onChange={e => onChange(e)}
            className="mb-8 p-2 rounded-lg border w-full"
            />

          <div className='flex justify-end'>
            <button
                onClick={() => handleReset()}
                className="bg-[#bbb] hover:opacity-80 transition duration-300 text-gray-600 font-bold py-2 px-4 rounded flex items-center mr-3">
                
                <p>Reset Filters</p>
                
            </button>
            <button
                onClick={() => handleSearch()}
                className="bg-primary hover:opacity-80 transition duration-300 text-white font-bold py-2 px-4 rounded flex items-center">
                  
                <p>Search</p>
            </button>

          </div>
            {/* Search Button */}
            
    </div>
  )
}

JobFilters.propTypes = {
    filterJobs: PropTypes.func.isRequired
}

export default connect(null, {filterJobs})(JobFilters)