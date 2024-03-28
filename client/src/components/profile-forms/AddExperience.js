import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addExperience } from '../../actions/profile'
import { Link, useNavigate } from 'react-router-dom'

const AddExperience = ({addExperience}) => {

    const [formData, setFormData] = useState({
        company: '', 
        title:'',
        location:'',
        from:'',
        to:'',
        current: false,
        description:'',
    })
    
    const [toDateDisabled, toggleDisabled] = useState(false)

    const {company, title, location, from, to, current, description} = formData

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckbox = () => {
        setFormData({
            ...formData,
            current: !current
        })
        toggleDisabled(!toDateDisabled)
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExperience(formData)
    }

    const navigate= useNavigate()

  return (
    <div className='container'>
        <div className='ml-10 mb-8'>
            <button onClick={() => navigate(-1)} className='btn btn-light my-1' ><i className="fa fa-chevron-left text-dark" aria-hidden="true"></i> Back</button>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" value={current} checked={current} onChange={() => handleCheckbox()} />
                {' '}Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" disabled={toDateDisabled ? 'disabled' : ''} value={to} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description} onChange={e => onChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </div>
    </div>
  )
}



AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, {addExperience})(AddExperience)