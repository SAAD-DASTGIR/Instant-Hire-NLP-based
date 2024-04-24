// import { SET_APPLICANT_SCORE } from "../actions/types";

// const initialState = {
//   applicantScore: null
// };

// const scoreReducer = (state = initialState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_APPLICANT_SCORE:
//       return {
//         ...state,
//         applicantScore: state.applicantScore ? [...state.applicantScore, payload] : [payload]
//       };
//     default:
//       return state;
//   }
// };

// export default scoreReducer;


import { SET_APPLICANT_SCORE } from "../actions/types";

const initialState = {
  applicantScore: null
};

const scoreReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_APPLICANT_SCORE:
      return {
        ...state,
        applicantScore: state.applicantScore !== null ? state.applicantScore.concat(payload) : [payload]
      };
    default:
      return state;
  }
};

export default scoreReducer;
