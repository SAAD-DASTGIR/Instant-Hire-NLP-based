import React from 'react'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import { setDetails } from '../../actions/interview'
import { connect } from 'react-redux'

const ScheduledInterview = ({interviews,user, setDetails}) => {

    const navigate =useNavigate()
    const handleClick = (id,meetingId) =>{
        const data ={ 
            companyId: id,
            userId: user._id,
            meetingId
        } 
        console.log(data)
        setDetails(data)
        navigate('/video')
    }

  return (
    <div id='scheduled_interviews'>
        <p className='text-3xl font-semibold text-primary'>Scheduled Interviews:</p>
        {interviews ? (
            <div className='mt-6  rounded-lg border-2 shadow-md'>
                {interviews.map((interview) => (
                    <div className='grid grid-cols-5 border-2 border-gray-300 px-12 py-4 text-gray-600' key={interview._id}>
                        <div className='col-span-4'>
                            <p>Interview Scheduled with <span className='font-semibold capitalize'>{interview.company.name}</span> on </p>
                            <div className='grid grid-cols-2 mt-1'>
                                <p> <span className='font-semibold'>Date: </span> <Moment format='DD/MM/YYYY'>{interview.date}</Moment></p>
                                <p><span className='font-semibold'>Time: </span>{interview.time}</p>
                            </div>
                        </div>
                        {interview.meetingId && <button onClick={() => handleClick(interview.company._id, interview.meetingId)} className='btn btn-primary h-12 mt-4'>Join Meeting</button>}
                    </div>
                ))}
            </div>
        ) : (
            <p>You dont have any scheduled interviews</p>
        )}
    </div>
  )
}


export default connect(null,{setDetails})(ScheduledInterview)