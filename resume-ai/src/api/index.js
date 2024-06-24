import axios from "axios";

const API = axios.create({ baseURL: "https://resume-builder-ai-cdao.vercel.app" });

export const addResume = (resumeData) => API.post("/resume/add", resumeData);
export const getResume = (email) => API.get(`/resume/get/${email}`);

export const getResumeFromId = (uid) => API.get(`/resume/get-id/${uid}`);

export const updateResume = (updatedData) => API.patch("/resume/update",updatedData);


export const deleteResume = (id)=> API.delete(`/resume/delete/${id}`);
