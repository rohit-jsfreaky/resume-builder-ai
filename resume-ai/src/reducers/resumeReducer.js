// src/reducers/resumeReducer.js

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RESUME_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "GET_RESUME_SUCCESS_ID":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default resumeReducer;
