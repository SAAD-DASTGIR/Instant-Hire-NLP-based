import { 
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED,
    COMPANY_LOADED
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isCompanyAuthenticated: null,
    loading: true,
    user: null,
    company:null
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
                isAuthenticated:false
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
                isAuthenticated: true,
                loading: false,
                company: payload
            }
        
        default:
            return state
    }
}