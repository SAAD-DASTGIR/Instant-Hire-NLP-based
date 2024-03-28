import axios from 'axios'
import { setAlert } from './alert'
import { 
    GET_PROFILE,
    PROFILE_ERROR, 
    UPDATE_PROFILE, 
    ACCOUNT_DELETED, 
    CLEAR_PROFILE,
    GET_PROFILES,
    DELETE_PROFILE
} from './types'


// Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get current company profile
export const getCurrentCompanyProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/companyProfile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get all profile
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get profile by ID
export const getProfileById = (userID) => async dispatch => {
    try { 
        const res = await axios.get(`/api/profile/user/${userID}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get company profile by ID
export const getCompanyProfileById = (id) => async dispatch => {
    try { 
        const res = await axios.get(`/api/companyProfile/company/${id}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Create or Update User profile
export const createProfile = (formData, update=0) => async dispatch => {
    try {
        const config = { 
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`/api/profile/${update}`, formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(update===0 ? 'Profile Created' : 'Profile Updated', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })        
    }
}

// Add experience 
export const addExperience = (formData) => async dispatch => {
    try {
        const config = { 
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Added', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })        
    }
}


// Add education 
export const addEducation = (formData) => async dispatch => {
    try {
        const config = { 
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Added', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })        
    }
}

// Delete Experience
export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience Deleted', 'success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }) 
    }
}

// Delete Education
export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education Removed', 'success'))
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Delete Account
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete your account? This cannot be undone!')){
        try {
            await axios.delete('/api/profile')
            dispatch({ type: ACCOUNT_DELETED})
            dispatch({ type: CLEAR_PROFILE })
            dispatch(setAlert('Account deleted', 'success'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            })
        }
    } 
}

// Delete Company Account
export const deleteCompanyAccount = () => async dispatch => {
    if(window.confirm('Are you sure you want to delete your account? This cannot be undone!')){
        try {
            await axios.delete('/api/companyProfile')
            dispatch({ type: ACCOUNT_DELETED})
            dispatch({ type: CLEAR_PROFILE })
            dispatch(setAlert('Account deleted', 'success'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            })
        }
    } 
}

// Delete Company Account as admin
export const deleteCompanyAccountAsAdmin = (id) => async dispatch => {
    if(window.confirm('Are you sure you want to delete this company account? This cannot be undone!')){
        try {
            await axios.delete(`/api/companyProfile/admin/${id}`)
            dispatch({ type: ACCOUNT_DELETED})
            dispatch({ type: CLEAR_PROFILE })
            dispatch(setAlert('Account deleted', 'success'))
        } catch (err) {

            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status}
            })
        }
    } 
}


//Create or Update Company Profile
export const createCompanyProfile = (formData, update=0 ) => async dispatch => {
    try {
        const config = { 
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`/api/companyProfile/${update}`, formData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(update === 0 ? 'Profile Created' : 'Profile Updated', 'success'))

    } catch (err) {
        const errors = err.response.data.errors 
        if (errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })        
    }
}

// Get spam companies
export const getSpamCompanies = () => async dispatch => {
    try {
        const res = await axios.get('/api/spam/companies')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Mark company as spam
export const markCompanySpam = (id) => async dispatch => {
    try {
        await axios.post(`/api/spam/company/${id}`)
        dispatch(setAlert('Company has been marked spam','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Remove company from spam companies
export const removeFromSpamCompanies = (id) => async dispatch => {
    try {
        await axios.delete(`/api/spam/company/${id}`)
        dispatch({
            type: DELETE_PROFILE,
            payload: id
        })
        dispatch(setAlert('Company removed from spam companies!','success'))
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Search profiles based on skills
export const searchProfile = (skills) => async dispatch => {
    try {
        console.log(skills)
        const res = await axios.get(`/api/profile/search?skills=${skills}`)
        console.log(res.data)
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}