import {CLEAR_PROFILE, GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, DELETE_PROFILE} from '../actions/types'

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}


export default function (state = initialState, action) {
    const {type, payload} = action

    switch (type){
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case DELETE_PROFILE:
            return {
                ...state,
                profiles: state.profiles.filter(profile =>profile._id !== payload),
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                loading: false
            }
        default:
            return state
    }
}