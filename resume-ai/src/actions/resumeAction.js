import * as api from "../api";
import { toast } from "sonner"
export const addResume = (resumeData) => async (dispatch) => {
  try {
    console.log("in action");
    await api.addResume(resumeData);
    dispatch(getResumeFromId(resumeData.uid));
    dispatch(getResume(resumeData.email));
  } catch (error) {
    console.log(error);
  }
};

export const getResume = (email) => async (dispatch) => {
  try {
    const { data } = await api.getResume(email);
    dispatch({ type: "GET_RESUME_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getResumeFromId = (uid) => async (dispatch) => {
  try {
    const { data } = await api.getResumeFromId(uid);
    console.log(data);

    dispatch({ type: "GET_RESUME_SUCCESS_ID", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateResume = (updatedData) => async (dispatch) => {
  try {
    await api.updateResume(updatedData);
    // console.log(data);
    toast("Details Updated")
  } catch (error) {
    console.log(error);
  }
};


export const deleteResume = (id )=> async (dispatch)=>{
  try{
    console.log(id)
    await api.deleteResume(id)
    
  }catch(error){
    console.log(error)
  }
}