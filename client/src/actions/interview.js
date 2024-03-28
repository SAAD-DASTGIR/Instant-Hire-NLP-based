import axios from 'axios'

import { ADD_DATA,ADD_SCHEDULED_INTERVIEW,GET_INTERVIEWS } from './types'
import { setAlert } from './alert'


// Set userID, companyID  
export const setDetails = (data) => async dispatch => {
    try {
        dispatch({
            type: ADD_DATA,
            payload: data
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const scheduleInterview = (data) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const jsonData = JSON.stringify(data);
        const res = await axios.post('/api/interview/schedule', jsonData, config)
        dispatch({
            type: ADD_SCHEDULED_INTERVIEW,
            payload: res.data
        })
        dispatch(
            setAlert('Interview has been Scheduled', 'success')
        )
    } catch (error) {
        const errors = error.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        console.error('Error scheduling interview:', error);
    }
  };

  export const getUserInterviews = () => async dispatch => {
    try {
      const res = await axios.get('/api/interview/user');
      dispatch({
        type: GET_INTERVIEWS,
        payload: res.data
      });
    } catch (error) {
      console.error('Error getting interviews:', error);
      // Handle error if needed
    }
  };

  export const getCompanyInterviews = () => async dispatch => {
    try {
      const res = await axios.get('/api/interview/company');
      dispatch({
        type: GET_INTERVIEWS,
        payload: res.data
      });
    } catch (error) {
      console.error('Error getting interviews:', error);
      // Handle error if needed
    }
  };

  export const setMeeting = (data) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const jsonData = JSON.stringify(data);
      const res = await axios.post('/api/interview/set-meeting-id', jsonData, config);
  
      // Handle the response data as needed
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
    }
  };

  export const setMeetingNull = (data) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const jsonData = JSON.stringify(data);
      const res = await axios.post('/api/interview/set-meeting-null', jsonData, config);
  
      // Handle the response data as needed
      console.log(res.data)
    } catch (error) {
      console.log(error.message)
    }
  };


