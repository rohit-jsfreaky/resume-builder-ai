import { getResumeFromId } from "@/actions/resumeAction";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/component/ResumePreview";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState(null); // Initialize state as null
  const { resumeId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => ({
    data: state.resumeIdReducer?.data || null,
    loading: state.resumeIdReducer?.loading || false,
    error: state.resumeIdReducer?.error || null,
  }));

  useEffect(() => {
    if (resumeId) {
      dispatch(getResumeFromId(resumeId));
    }
  }, [dispatch, resumeId]);

  useEffect(() => {
    if (data) {
      setResumeInfo(data); // Set resumeInfo when data is available
    }
  }, [data]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your ultimate AI generated resume is ready
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and you can share a unique
            resume URL with your friends and family
          </p>
          <div className="flex justify-between mx-44 my-8">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello everyone , this is my resume please open url to see",
                url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {resumeInfo && <ResumePreview />}
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
