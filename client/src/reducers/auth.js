import { 
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    COMPANY_LOADED,
    COMPANY_REGISTER_SUCCESS,
    COMPANY_LOGIN_SUCCESS,
    ADMIN_LOADED,
    ADMIN_LOGIN_SUCCESS
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isCompanyAuthenticated: null,
    isAdminAuthenticated: null,
    loading: true,
    user: null,
    company: null
}

export default function(state = initialState, action){
    const {type, payload} = action

    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true,
            }
        case COMPANY_REGISTER_SUCCESS:
        case COMPANY_LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                loading: false,
                isCompanyAuthenticated: true,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                loading: false,
                user: null,
                company: null,
                isAuthenticated:false,
                isAdminAuthenticated:null,
                isCompanyAuthenticated: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case COMPANY_LOADED:
            return {
                ...state,
                isCompanyAuthenticated: true,
                loading: false,
                company: payload
            }        
        case ADMIN_LOADED:
            return {
                ...state,
                isAdminAuthenticated: true,
                loading: false
            }     
        case ADMIN_LOGIN_SUCCESS:  
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                loading: false,
                isAdminAuthenticated: true,
            }
        default:
            return state
    }
}