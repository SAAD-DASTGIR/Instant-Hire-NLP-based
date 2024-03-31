import {SET_APPLICANT_SCORE} from "./types"

export const setReducer = (score) => async dispatch => {
    try {
        dispatch({
            type: SET_APPLICANT_SCORE,
            payload: score,
        })
    } catch (err) {
        console.log(err.message)
    }
}