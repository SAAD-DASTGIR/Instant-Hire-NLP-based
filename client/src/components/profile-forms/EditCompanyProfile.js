import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { createCompanyProfile, getCurrentCompanyProfile } from '../../actions/profile'

const EditCompanyProfile = ({profile:{profile, loading}, createCompanyProfile, getCurrentCompanyProfile}) => {

    const [formData, setFormData] = useState({
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

    useEffect(() => {
        getCurrentCompanyProfile()

        setFormData({
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            headcount: loading || !profile.headcount ? '' : profile.headcount,
            industry: loading || !profile.industry ? '' : profile.industry,
            about: loading || !profile.about ? '' : profile.about,
            twitter: loading || !profile.social ? '' : profile.twitter,
            facebook: loading || !profile.social ? '' : profile.facebook,
            linkedin: loading || !profile.social ? '' : profile.linkedin,
            youtube: loading || !profile.social ? '' : profile.youtube,
            instagram: loading || !profile.social ? '' : profile.instagram,
        })
    }, [loading])

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
    
    const handleSubmit = e => {
        e.preventDefault()
        createCompanyProfile(formData, 1) // sending 1 to update profile
    }

    const navigate= useNavigate()

  return (
    <div className='container'>
        <div className='ml-10 mb-8'>
            <button onClick={() => navigate(-1)} className='btn btn-light my-1' ><i className="fa fa-chevron-left text-dark" aria-hidden="true"></i> Back</button>
            <h1 className="font-semibold text-6xl my-6 text-primary">
                Edit Company Profile
            </h1>
            <div className="lead">
                <i className="fas fa-user"></i> 
                <p className="inline-block ml-2">Let's get some information to make your company's profile stand out</p>
            </div>
            
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
                <Link className="btn btn-light my-1" to="/company-dashboard">Back</Link>
            </form>
        </div>
    </div>
  )
}

EditCompanyProfile.propTypes = {
    createCompanyProfile: PropTypes.func.isRequired,
    getCurrentCompanyProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {createCompanyProfile, getCurrentCompanyProfile})(EditCompanyProfile)