import React, { useEffect, useState } from "react";
import FormSection from "../../component/FormSectio";
import ResumePreview from "../../component/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import Dummy from "@/data/dummy";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResumeFromId } from "@/actions/resumeAction";
import dummy from "@/data/dummy";

const EditResume = () => {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.resumeIdReducer);

  useEffect(() => {
    dispatch(getResumeFromId(resumeId));
  }, [dispatch, resumeId]);

  useEffect(() => {
    if (data) {
      setResumeInfo(data.data);
      // console.log(resumeInfo)
    }
  }, [data]);
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* From section */}
        <FormSection />

        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
