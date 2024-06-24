import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateResume } from "@/actions/resumeAction";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const ExperienceForm = () => {
  const [experienceList, setExperienceList] = useState([{
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummery: "",
  }]);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const dispatch = useDispatch();

  const handleChange = (index, e) => {
    const newEntries = [...experienceList]
    const { name, value } = e.target;

    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };


  useEffect(() => {
    if (resumeInfo) {
      setExperienceList(resumeInfo?.Experience || []);
    }
  }, []);

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, Experience: experienceList });
  }, [experienceList]);


  const addNewExperience = () => {
    setExperienceList([...experienceList, { title: "",
      companyName: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      workSummery: "",}]);
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.slice(0, -1));
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    const experienceData = { Experience: experienceList, resumeId };
    dispatch(updateResume(experienceData));
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous job experience</p>

        <form onSubmit={onSave}>
          {experienceList.map((field, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label htmlFor="" className="text-xs">
                    Position Title
                  </label>
                  <Input
                    name="title"
                    onChange={(e) => handleChange(index, e)}
                    defaultValue={field.title}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    Company Name
                  </label>
                  <Input
                    name="companyName"
                    onChange={(e) => handleChange(index, e)}
                    defaultValue={field.companyName}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    City
                  </label>
                  <Input
                    name="city"
                    onChange={(e) => handleChange(index, e)}
                    defaultValue={field.city}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    State
                  </label>
                  <Input
                    name="state"
                    onChange={(e) => handleChange(index, e)}
                    defaultValue={field.state}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    Start Date
                  </label>
                  <Input
                    name="startDate"
                    onChange={(e) => handleChange(index, e)}
                    type="date"
                    defaultValue={field.startDate}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    End Date
                  </label>
                  <Input
                    name="endDate"
                    onChange={(e) => handleChange(index, e)}
                    type="date"
                    defaultValue={field.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    onRichTextEdiorChange={(e) =>
                      handleRichTextEditor(e, "workSummery", index)
                    }
                    defaultValue={field.workSummery}
                  />
                </div>
              </div>
            </div>
          ))}
        </form>
        <div className="flex justify-between">
          <div>
            <Button
              variant="outline"
              className="text-primary"
              onClick={addNewExperience}
              type="button"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={removeExperience}
              type="button"
            >
              - Remove
            </Button>
          </div>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
