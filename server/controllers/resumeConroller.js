import { Resume } from "../models/resumeModel.js";

export const addResume = async (req, res) => {
  const { resumeTitle: title, email: userEmail, userName, uid } = req.body;

  console.log(uid);
  try {
    const resume = await Resume.create({
      title,
      userEmail,
      userName,
      uid,
    });

    res.status(200).json({ message: "Resume Succesfully created" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating resume",
      error: error.message,
    });
  }
};

export const getResume = async (req, res) => {
  const { email: userEmail } = req.params;

  try {
    const resume = await Resume.find({ userEmail });
    if (resume) {
      res.status(200).json(resume);
    } else {
      res.status(404).json({ message: "Resume not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching resume",
      error: error.message,
    });
  }
};

export const getResumeFromId = async (req, res) => {
  const { uid } = req.params;

  try {
    const resume = await Resume.findOne({ uid });
    if (resume) {
      res.status(200).json(resume);
    } else {
      res.status(404).json({ message: "Resume not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching resume",
      error: error.message,
    });
  }
};

export const updateResume = async (req, res) => {
  const data = req.body;
  const { resumeId } = data;
  console.log(resumeId);
  // console.log(data)
  try {
    await Resume.findOneAndUpdate({ uid: resumeId }, data);

    res.status(200).json({ message: "updated succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Resume.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};