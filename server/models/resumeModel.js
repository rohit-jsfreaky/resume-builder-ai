import mongoose from "mongoose";
import validator from "validator";

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  companyName: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  workSummery: {
    type: String,
  },
});

const educationSchema = new mongoose.Schema({
  universityName: {
    type :String
  },
  startDate: {
    type : String
  },
  endDate: {
    type : String
  },
  degree: {
    type : String
  },
  major: {
    type : String
  },
  description: {
    type : String
  },
});

const skillSchema = new mongoose.Schema({
  name: {
    type : String
  },
  rating: {
    type : Number
  }
})

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide your name"],
  },
  userEmail: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  userName: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  themeColor:{
    type: String
  },
  summery: {
    type: String,
  },
  Experience: [ExperienceSchema],
  education: [educationSchema],
  skills: [skillSchema]
});

export const Resume = mongoose.model("Resume", resumeSchema);
