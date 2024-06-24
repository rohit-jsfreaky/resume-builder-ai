import { updateResume } from "@/actions/resumeAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const PersonalDetails = ({enableNext}) => {
  const {resumeId}= useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    enableNext(false)
    const {name , value }= e.target;

    setResumeInfo({
        ...resumeInfo,
        [name] :value
    })
  };
  
  const onSave =(e)=>{
    e.preventDefault();
    enableNext(true)
    const {firstName,lastName , jobTitle , address ,phone,email} = resumeInfo
    const personaData = {firstName, lastName , jobTitle, address , phone ,email,resumeId}


    dispatch(updateResume(personaData));
  }
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detatils</h2>
      <p>Get Started with the basic information</p>

      <form action="" onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label htmlFor="">First Name</label>
            <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Last Name</label>
            <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label htmlFor="">Job Title</label>
            <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label htmlFor="">Address</label>
            <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="">Phone</label>
            <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
          </div>
          <div >
            <label htmlFor="">email</label>
            <Input name="email" defaultValue={resumeInfo?.email } required onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-2 flex justify-end">
            <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
