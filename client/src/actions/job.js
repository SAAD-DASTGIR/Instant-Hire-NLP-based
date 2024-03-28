import axios from 'axios'
import {setAlert} from './alert'
import { 
    ADD_JOB,
    GET_JOBS,
    SEARCH_JOBS,
    JOB_ERROR,
    GET_JOB,
    UPDATE_JOBS,
    DELETE_JOB,
    GET_APPLIED_JOBS,
    GET_FAVORITE_JOBS,
    DELETE_APPLIED_JOB,
    REMOVE_FAVORITE_JOB
 } from './types'

 // Add Job
export const addJob = (formData, update=0) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/jobs',formData, config)
        dispatch({
            type: ADD_JOB,
            payload: res.data
        })
        dispatch(
            setAlert('Job Posted', 'success')
        )


    } catch (err) { 
        const errors = err.response.data.errors
        if (errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.message, status: null}
        })
          
    }
}

// Edit job
export const editJob = (formData,jobId) => async dispatch => {
    try {
        const config = { 
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`/api/jobs/${jobId}`, formData, config)

        dispatch({
            type: GET_JOB,
            payload: res.data
        })
        dispatch(setAlert('Profile Updated', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })        
    }
}

// Get Jobs
export const getJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/jobs')
        dispatch({
            type: GET_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
// Search Jobs
export const searchJobs = (title) => async dispatch => {
    try {
        const res = await axios.get('/api/jobs/search', {
            params: { title }
          });
        dispatch({
            type: SEARCH_JOBS,
            payload: res.data.similarJobs
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Filter Jobs
export const filterJobs = (formData) => async dispatch => {
    try {
        const response = await axios.get('/api/jobs/filter', {
            params: formData
          });
          console.log(response.data)
        dispatch({
            type: SEARCH_JOBS,
            payload: response.data
        })
        
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get Jobs user has applied to
export const getAppliedJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/jobs/applied')
        dispatch({
            type: GET_APPLIED_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get Jobs user has marked favorite
export const getFavoriteJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/jobs/favorites')
        dispatch({
            type: GET_FAVORITE_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}


// Get Jobs posted by company
export const getPostedJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/jobs/posted')
        dispatch({
            type: UPDATE_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}


// Get single Job by id
export const getJobById = (jobID) => async dispatch => {
    try { 
        const res = await axios.get(`/api/jobs/job/${jobID}`)

        dispatch({
            type: GET_JOB,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Delete Job by id
export const deleteJob = (jobID) => async dispatch => {
    try { 
        await axios.delete(`/api/jobs/${jobID}`)

        dispatch({
            type: DELETE_JOB,
            payload: jobID
        })
        dispatch(setAlert('Job has been deleted', 'success'))
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Job by id as admin
export const deleteJobAsAdmin = (jobID) => async dispatch => {
    try { 
        await axios.delete(`/api/jobs/admin/${jobID}`)

        dispatch({
            type: DELETE_JOB,
            payload: jobID
        })
        dispatch(setAlert('Job has been deleted', 'success'))
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// User apply for job
export const applyForJob = (jobID) => async dispatch => {
    try {
        await axios.post(`/api/jobs/apply/${jobID}`)
        const res = await axios.get(`/api/jobs/job/${jobID}`)
        dispatch({
            type: GET_JOB,
            payload: res.data
        })
        dispatch(setAlert('You have successfully applied for job', 'success'))
    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// User Delete job application
export const deleteApplication = (jobId) => async dispatch => {
    try {   
        await axios.delete(`/api/jobs/apply/${jobId}`);
        dispatch({
            type: DELETE_APPLIED_JOB,
            payload: jobId
        })
        dispatch(setAlert('You have deleted your application request', 'success'))
    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// User add job to favorites
export const addToFavorites = (jobID) => async dispatch => {
    try {
        await axios.post(`/api/jobs/favorite/${jobID}`)
        const res = await axios.get(`/api/jobs/job/${jobID}`)
        dispatch({
            type: GET_JOB,
            payload: res.data
        })
        dispatch(setAlert('Job added to favorites', 'success'))
    } catch (err) { 
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Remove job from favorites
export const removeFromFavorites = (jobId) => async dispatch => {
    try {
        await axios.delete(`/api/jobs/favorite/${jobId}`);
        dispatch({
            type: REMOVE_FAVORITE_JOB,
            payload: jobId
        })
        dispatch(setAlert('Job removed from favorites', 'success'))
    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: JOB_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Mark job as spam
export const markJobSpam = (id) => async dispatch => {
    try {
        await axios.post(`/api/spam/job/${id}`)
        dispatch(setAlert('Job has been marked spam', 'success'))
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
        dispatch(setAlert('You have already marked this job spam', 'danger'))
    }
}

// Remove job from spam jobs
export const removeFromSpamJobs = (id) => async dispatch => {
    try {
         await axios.delete(`/api/spam/job/${id}`)
        dispatch({
            type: DELETE_JOB,
            payload: id
        })
        dispatch(setAlert('Job removed from spam jobs!'),'success')
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Get spam jobs
export const getSpamJobs = () => async dispatch => {
    try {
        const res = await axios.get('/api/spam/jobs')
        dispatch({
            type: GET_JOBS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: JOB_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}



