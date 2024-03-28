import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { createCompanyProfile } from '../../actions/profile'

const CreateCompanyProfile = ({ createCompanyProfile }) => {
    const [formData, setFormData] = useState({
        company:'',
        website:'',
        location:'',
        headcount:'',
        industry:'',
        about:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:''
    })
    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const navigate = useNavigate(); 

    const {
        website, 
        location,
        about,
        industry,
        headcount,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = formData

        const onChange = e => {
            
            setFormData({
                ...formData,
                
                [e.target.name]: e.target.value
            })
        }
        
        const handleSubmit = async (e) => {
            e.preventDefault()
            await createCompanyProfile(formData,0) // sending 0 to create profile
            navigate('/company-dashboard'); // navigate to create-profile after successful registration
        }

  return (
    <div className='container'>
        <div className='ml-10'>
            <h1 className="large text-primary">
                Create Company Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> 
                <p className="inline-block ml">Let's get some information to make your company's profile stand out</p>
            </p>
            
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Industry" required name="industry"  value={industry} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Your company belongs to which industry (eg. Tech)
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website"  value={website} onChange={e => onChange(e)} />
                    <small className="form-text">
                        Enter company website
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Location" name="location" required value={location} onChange={e => onChange(e)}/>
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <textarea placeholder="Short introduction of your company" name="about" value={about} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">
                        Tell us a little about your company
                    </small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Head Count" name="headcount" value={headcount} onChange={e => onChange(e)} />
                    <small className="form-text">
                        What is the headcount of your company
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
                <Link className="btn btn-light my-1" to="/company-dashboard">Skip</Link>
            </form>
        </div>
    </div>
  )
}

CreateCompanyProfile.propTypes = {
    createCompanyProfile: PropTypes.func.isRequired
}



export default connect(null, {createCompanyProfile})(CreateCompanyProfile)