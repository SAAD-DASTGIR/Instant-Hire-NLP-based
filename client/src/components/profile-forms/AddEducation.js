import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addEducation } from '../../actions/profile'
import { Link, useNavigate } from 'react-router-dom'


const AddEducation = ({addEducation}) => {

    const [formData, setFormData] = useState({
        school: '', 
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current: false,
        description:'',
    })
    
    const [toDateDisabled, toggleDisabled] = useState(false)

    const {school, degree, fieldofstudy, from, to, current, description} = formData

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
        addEducation(formData)
    }

    const navigate= useNavigate()

  return (
    <div className='container'>
        <div className='ml-10 mb-8'>
            <button onClick={() => navigate(-1)} className='btn btn-light mb-2' ><i className="fa fa-chevron-left text-dark" aria-hidden="true"></i> Back</button>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i>
                Add your Educational experiences
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="* Institute Name" name="school" value={school} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Enter Degree or Certificate Name" name="degree" value={degree} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" required placeholder="* Enter Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" value={current} checked={current} onChange={() => handleCheckbox()} />
                {' '}Current </p>
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
                    placeholder="Degree Description"
                    value={description} onChange={e => onChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </div>
    </div>
  )
}



AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, {addEducation})(AddEducation)