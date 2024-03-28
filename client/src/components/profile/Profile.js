import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Spinner} from '../layout/Spinner'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import { scheduleInterview } from '../../actions/interview'


const Profile = ({getProfileById,scheduleInterview, profile:{profile, loading}, auth}) => {
    const [displayScheduleInterview, toggleScheduleInterview] = useState(false)
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const {id} = useParams()
    useEffect(()=>{
        getProfileById(id)
    },[getProfileById])

    const navigate = useNavigate()

    const schedule = () => {
        const data={
            userId: profile.user._id,
            companyId: auth.company._id,
            date: date,
            time: time
        }
        console.log(data)
        scheduleInterview(data)
    }

  return (
    <div className='container'>
        {profile === null || loading ? (
        <Spinner />
        ) : (
        <div className='ml-10 shadow-lg'>
            <button onClick={() => navigate(-1)} className='btn btn-light mr-6' ><i className="fa fa-chevron-left" aria-hidden="true"></i>  Back</button>
            {profile && 
            <div className=" mt-6 mb-12">
            <ProfileTop profile={profile} auth={auth} />
            <ProfileAbout profile={profile} />
            <div className='grid grid-cols-2 bg-white'>
                <div className="  p-10">
                    <h2 className="text-primary text-3xl font-semibold"> Experience: </h2>
                    {profile.experience && profile.experience.length > 0 ? (
                        <Fragment>
                            {profile.experience.map(experience => (
                                <ProfileExperience key={experience._id} experience={experience} />
                            ))}
                        </Fragment>
                    ) : (<h4> No expereince credentials found</h4>) }
                </div>
                <div className=" p-10  ">
                    <h2 className="text-primary text-3xl font-semibold"> Education: </h2>
                    {profile.education && profile.education.length > 0 ? (
                        <Fragment>
                            {profile.education.map(education => (
                                <ProfileEducation key={education._id} education={education} />
                            ))}
                        </Fragment>
                    ) : (<h4> No expereince credentials found</h4>) }
                </div>
            </div>
            {auth.isCompanyAuthenticated && 
                <div className=" p-10 bg-light">
                <button onClick={()=> toggleScheduleInterview(!displayScheduleInterview)} type="button" className="btn btn-dark ">
                    Schedule Interview
                </button>
                <div>
                {displayScheduleInterview && 
                    <Fragment>
                        <div className="">
                            <p className='text-primary text-xl font-semibold mt-8'>Select Date for Interview</p>
                            <input className='border-2 border-gray-900 bg-light rounded px-4 py-2 text-gray-600 mt-2' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            <p className='text-primary text-xl font-semibold mt-4'>Select Time for Interview</p>
                            <input className='border-2 border-gray-900 bg-light rounded px-4 py-2 text-gray-600 mt-2 block' type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                            <button onClick={() => schedule()} className='btn btn-primary mt-6 block'>
                                Schedule
                            </button>
                        </div>
                    </Fragment>}
                </div>
            </div> 
            }
        </div>
            }
            
        </div> )}
    </div>
  )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
    

export default connect(mapStateToProps, {getProfileById, scheduleInterview})(Profile)