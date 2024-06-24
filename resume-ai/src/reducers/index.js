import { combineReducers } from "redux";
import resumeReducer from "./resumeReducer";
import resumeIdReducer from "./resumeIdReducer";

export default combineReducers({
    resumeReducer , resumeIdReducer
});