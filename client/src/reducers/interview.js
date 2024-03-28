import { 
    ADD_DATA, 
    ADD_SCHEDULED_INTERVIEW, 
    GET_INTERVIEWS,
    SET_MEETING_NULL
} from "../actions/types"

const initialState = {
    interviews: [],
    interview:{},
    loading: true,
    error: {}
}

export default function(state=initialState, action) {
    const {type, payload} = action

    switch(type){
        case ADD_SCHEDULED_INTERVIEW:
            return{
                ...state,
                interviews: [payload,...state.interviews],
                loading: false
            }
        case GET_INTERVIEWS: 
            return{
                ...state,
                loading: false,
                interviews: payload
            }
        case ADD_DATA: 
            return{
                ...state,
                loading: false,
                interview: payload
            }
        case SET_MEETING_NULL: 
            return{
                ...state,
                loading: false,
                interview: {...state.interview, meetingId:null},
            }
        default:
            return state
    }

}