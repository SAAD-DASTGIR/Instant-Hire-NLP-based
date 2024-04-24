// import {SET_APPLICANT_SCORE} from "./types"

// export const setReducer = (score) => async dispatch => {
//     try {
//         dispatch({
//             type: SET_APPLICANT_SCORE,
//             payload: score,
//         })
//     } catch (err) {
//         console.log(err.message)
//     }
// }

// import { SET_APPLICANT_SCORE } from "./types";

// // Action to set score for a specific applicant
// export const setApplicantScore = (applicantId, score) => ({
//   type: SET_APPLICANT_SCORE,
//   payload: { applicantId, score }
// });

import { SET_APPLICANT_SCORE } from "./types";

// Action to set score for each applicant
export const setReducer = (scores) => async (dispatch) => {
  try {
    scores.forEach(scoreObject => {
      const { applicantId, score } = scoreObject;
      dispatch({
        type: SET_APPLICANT_SCORE,
        payload: { applicantId, score }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

