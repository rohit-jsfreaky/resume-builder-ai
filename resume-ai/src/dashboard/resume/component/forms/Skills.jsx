import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateResume } from "@/actions/resumeAction";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const dispatch = useDispatch();

  const handleChange = (index, name, value) => {
    const newEntries = [...skillsList];
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  useEffect(() => {
    if (resumeInfo) {
      setSkillsList(resumeInfo?.skills || []);
    }
  }, []);

  const AddNewSkills = () => {
    setSkillsList([...skillsList, {
      name: "",
      rating: 0,
    }]);
  };

  const RemoveSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    const skillsData = { skills: skillsList, resumeId };
    dispatch(updateResume(skillsData));
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, skills: skillsList });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional Skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div className="flex justify-between border mb-2 rounded-lg p-3 items-center" key={index}>
            <div>
              <label htmlFor="" className="text-xs">Name</label>
              <Input onChange={(e) => handleChange(index, 'name', e.target.value)} value={item.name} />
            </div>
            <Rating 
              style={{ maxWidth: 150 }} 
              value={item.rating} 
              onChange={(value) => handleChange(index, 'rating', value)} 
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div>
          <Button
            variant="outline"
            className="text-primary"
            onClick={AddNewSkills}
            type="button"
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={RemoveSkill}
            type="button"
          >
            - Remove
          </Button>
        </div>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
};

export default Skills;
