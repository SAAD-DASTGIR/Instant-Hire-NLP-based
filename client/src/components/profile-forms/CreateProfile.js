import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { createProfile } from '../../actions/profile'

const CreateProfile = ({ createProfile }) => {
    const [formData, setFormData] = useState({
        company:'',
        website:'',
        location:'',
        qualification:'',
        field:'',
        status:'',
        skills:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    })
    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const navigate = useNavigate(); 

    const {
        company,
        website, 
        location, 
        qualification,
        field,
        status, 
        skills, 
        bio, 
        twitter, 
        facebook,
        linkedin, 
        youtube, 
        instagram} = formData

        const onChange = e => {
            
            setFormData({
                ...formData,
                
                [e.target.name]: e.target.value
            })
        }
        
        const handleSubmit = async (e) => {
            e.preventDefault()
            await createProfile(formData,0) // sending 0 to create profile
            navigate('/dashboard'); // navigate to create-profile after successful registration
        }

  return (
    <div className='container'>
        <div className='ml-10 mb-8'>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> 
                <p className="inline-block ml">Let's get some information to make your profile stand out</p>
            </p>
            
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Engineer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                    <select name="qualification" value={qualification} onChange={e => onChange(e)}>
                        <option value="0">* Select Qualification</option>
                        <option value="Matric">Matric</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="PhD">PhD</option>
                    </select>
                    <small className="form-text">
                        Select your Qualification
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study (eg. Computer Science)" name="field" value={field} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Enter field of Study
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Could be your own company or one you work for 
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location"  value={location} onChange={e => onChange(e)}/>
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website"  value={website} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">
                        Tell us a little about yourself
                    </small>
                </div>

                <div className="my-2">
                    <button onClick={()=> toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                    <i className="fab fa-twitter fa-2x"></i>
                    <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-youtube fa-2x"></i>
                    <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-linkedin fa-2x"></i>
                    <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                    </div>
                </Fragment>}
                
                <input type="submit" className="btn btn-primary my-1"  />
                <Link className="btn btn-light my-1" to="/dashboard">Skip</Link>
            </form>
        </div>
    </div>
  )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}



export default connect(null, {createProfile})(CreateProfile)