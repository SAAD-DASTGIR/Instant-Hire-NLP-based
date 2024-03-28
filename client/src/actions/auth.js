import axios from 'axios'
import { setAlert } from './alert'
import { 
    REGISTER_SUCCESS,
    COMPANY_REGISTER_SUCCESS,
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    COMPANY_LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT,
    CLEAR_PROFILE,
    COMPANY_LOADED,
    ADMIN_LOADED,
    ADMIN_LOGIN_SUCCESS
} from './types'
import setAuthToken from '../utils/setAuthToken'

// Load User
export const loadUser = () => async dispatch => {
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Load Company
export const loadCompany = () => async dispatch => {
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/companyAuth')
        dispatch({
            type: COMPANY_LOADED,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('/api/users',body, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Register Company
export const companyRegister = ({ name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password})

    try {
        const res = await axios.post('/api/company',body, config)

        dispatch({
            type: COMPANY_REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadCompany())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login User
export const login = ({email, password}) => async dispatch => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password})

    try {
        const res = await axios.post('/api/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())

    } catch (err) {
        const errors = err.response.data.errors
        if (errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Login Company
export const companyLogin = ({email, password}) => async dispatch => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password})

    try {
        const res = await axios.post('/api/companyAuth', body, config)
        dispatch({
            type: COMPANY_LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadCompany())

    } catch (err) {
        const errors = err.response.data.errors
        if (errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout / clear profile
export const logout =() => dispatch => {
    dispatch({ type: CLEAR_PROFILE})
    dispatch({ type: LOGOUT })
}


// Load Company
export const loadAdmin = () => async dispatch => {
    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/admin')
        dispatch({
            type: ADMIN_LOADED,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Login Admin
export const adminLogin = ({email, password}) => async dispatch => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password})

    try {
        const res = await axios.post('/api/admin/login', body, config)
        dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadAdmin())

    } catch (err) {
        const errors = err.response.data.errors
        if (errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}