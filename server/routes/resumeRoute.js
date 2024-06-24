import express from "express"
import { addResume, deleteResume, getResume, getResumeFromId, updateResume } from "../controllers/resumeConroller.js";

export const route = express.Router();

route.post("/add",addResume);
route.get("/get/:email",getResume);
route.get("/get-id/:uid",getResumeFromId);
route.patch("/update",updateResume);
route.delete("/delete/:id",deleteResume)