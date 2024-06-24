import { updateResume } from "@/actions/resumeAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Education = () => {
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      startDate: "",
      endDate: "",
      degree: "",
      major: "",
      description: "",
    },
  ]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const dispatch = useDispatch();

  const hanldleChange = (e, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = e.target;

    newEntries[index][name] = value;

    setEducationalList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationalList });
    // console.log(experinceList);
  }, [educationalList]);

  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.education)
  },[])

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        startDate: "",
        endDate: "",
        degree: "",
        major: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    console.log(educationalList);
    const educationData = { education: educationalList, resumeId };

    dispatch(updateResume(educationData));
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your Educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label htmlFor="">University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => {
                    hanldleChange(e, index);
                  }}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label htmlFor="">Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => {
                    hanldleChange(e, index);
                  }}
                  defaultValue={item?.degree}
                />
              </div>
              <div>
                <label htmlFor="">Major</label>
                <Input
                  name="major"
                  onChange={(e) => {
                    hanldleChange(e, index);
                  }}
                  defaultValue={item?.major}
                />
              </div>
              <div>
                <label htmlFor="">Start Date</label>
                <Input
                  name="startDate"
                  onChange={(e) => {
                    hanldleChange(e, index);
                  }}
                  type="date"
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label htmlFor="">End Date</label>
                <Input
                  name="endDate"
                  onChange={(e) => {
                    hanldleChange(e, index);
                  }}
                  type="date"
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="">Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => {
                    hanldleChange(e, index);
                  }}
                  defaultValue={item?.description}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <Button
                  variant="outline"
                  className="text-primary"
                  onClick={AddNewEducation}
                  type="button"
                >
                  + Add More Education
                </Button>
                <Button
                  variant="outline"
                  className="text-primary"
                  onClick={RemoveEducation}
                  type="button"
                >
                  - Remove
                </Button>
              </div>

              <Button onClick={onSave}>Save</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
