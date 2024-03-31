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
        applicantScore: payload
      };
    default:
      return state;
  }
};

export default scoreReducer;
