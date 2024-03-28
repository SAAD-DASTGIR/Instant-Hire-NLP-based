import { 
    ADD_JOB, 
    GET_JOB, 
    GET_JOBS,
    SEARCH_JOBS,
    JOB_ERROR,   
    UPDATE_JOBS,
    DELETE_JOB,
    GET_APPLIED_JOBS,
    GET_FAVORITE_JOBS,
    DELETE_APPLIED_JOB,
    REMOVE_FAVORITE_JOB
 } from "../actions/types"

const initialState = {
    jobs: [],
    applied_jobs:[],
    favorite_jobs:[],
    job: null,
    loading: true,
    error: {}
}

export default function(state=initialState, action) {
    const {type, payload} = action

    switch(type){
        case ADD_JOB:
            return{
                ...state,
                jobs: [payload,...state.jobs],
                loading: false
            }
        case GET_JOBS: 
        case UPDATE_JOBS:
            return{
                ...state,
                loading: false,
                jobs: payload
            }
        case SEARCH_JOBS:
            return{
                loading: false,
                jobs: payload
            }
        case JOB_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        case GET_JOB:
            return {
                ...state,
                job: payload,
                loading: false
            }
        case DELETE_JOB:
            return {
                ...state,
                jobs: state.jobs.filter(job => job._id !== payload),
                loading: false
            }
        case GET_APPLIED_JOBS:
            return{
                ...state,
                loading: false,
                applied_jobs: payload
            }
        case GET_FAVORITE_JOBS:
            return{
                ...state,
                loading: false,
                favorite_jobs: payload
            }
        case DELETE_APPLIED_JOB:
            return {
                ...state,
                applied_jobs: state.applied_jobs.filter(job => job._id !== payload),
                loading: false
            }
        case REMOVE_FAVORITE_JOB:
            return {
                ...state,
                favorite_jobs: state.favorite_jobs.filter(job => job._id !== payload),
                loading: false
            }
        default:
            return state
    }

}