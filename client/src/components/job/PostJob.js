import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addJob, getJobs } from '../../actions/job';

const PostJob = ({addJob}) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    type: '',
    gender: '',
    qualification: '',
    requiredSkills: '',
    salaryFrom: '',
    salaryTo: '',
    positions: ''
  });

  const {
    title,
    location,
    description,
    type,
    gender,
    qualification,
    requiredSkills,
    salaryFrom,
    salaryTo,
    positions
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    addJob(formData);
  };
  useEffect(() => {getJobs()},[])

  return (
    <div className='container'>
      <div className='ml-10 mb-8'>
        <h1 className="font-semibold text-6xl mb-5 text-primary">Post a Job</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add a job posting
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="* Job Description"
              name="description"
              value={description}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <select name="type" value={type} onChange={e => onChange(e)}>
              <option>* Select Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
          <div className="form-group">
            <select name="gender" value={gender} onChange={e => onChange(e)}>
              <option>* Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="any">Any</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Qualification"
              name="qualification"
              value={qualification}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Enter Required Skills" name="requiredSkills" value={requiredSkills} onChange={e => onChange(e)} />
            <small className="form-text">
                Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Salary From"
              name="salaryFrom"
              value={salaryFrom}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Salary To"
              name="salaryTo"
              value={salaryTo}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter number of positions"
              name="positions"
              value={positions}
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
      </div>
    </div>
  )
}

PostJob.propTypes = {
    addJob: PropTypes.func.isRequired
}

export default connect(null, {addJob})(PostJob)
