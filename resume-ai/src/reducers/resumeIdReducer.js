

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const resumeIdReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_RESUME_SUCCESS_ID":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default resumeIdReducer;
