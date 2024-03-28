import React from 'react'
import Moment from 'react-moment'
import { setDetails } from '../../actions/interview'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompanyScheduledInterviews = ({interviews, setDetails, auth}) => {
    
    const navigate = useNavigate()
    const handleClick = (id) =>{
        const data ={ 
            companyId: auth.company._id,
            userId: id
        } 
        setDetails(data)
        navigate('/video')
    }
  return (
    <div >
        <p className='text-3xl font-semibold text-primary mt-10'>Scheduled Interviews:</p>
        {interviews ? (
            <div className='mt-6 px-12 rounded-lg border-2 divide-y-2 divide-gray-300 border-gray-300 shadow-md'>
                {interviews.map((interview) => (
                    <div className='grid grid-cols-5 py-4 text-gray-600' key={interview._id}>
                        <div className='col-span-4'>
                            <p>Interview Scheduled with <span className='font-semibold capitalize'>{interview.user.name}</span> on </p>
                            <div className='grid grid-cols-2 mt-1'>
                                <p> <span className='font-semibold'>Date: </span> <Moment format='DD/MM/YYYY'>{interview.date}</Moment></p>
                                <p><span className='font-semibold'>Time: </span>{interview.time}</p>
                            </div>
                        </div>
                        <button onClick={()=>handleClick(interview.user._id)} className='btn btn-primary h-12 mt-4'>Start Meeting</button>
                    </div>
                ))}
            </div>
        ) : (
            <p>You dont have any scheduled interviews</p>
        )}
    </div>
  )
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default connect(mapStateToProps, {setDetails})(CompanyScheduledInterviews)