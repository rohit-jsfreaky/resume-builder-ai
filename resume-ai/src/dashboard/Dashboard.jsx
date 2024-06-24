import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useDispatch, useSelector } from "react-redux";
import { SignedIn, useUser } from "@clerk/clerk-react";
import { getResume } from "@/actions/resumeAction";
import ResumeItem from "./components/ResumeItem";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user,isSignedIn } = useUser();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { data } = useSelector((state) => state.resumeReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userEmail = user.primaryEmailAddress?.emailAddress;
      if (userEmail) {
        setEmail(userEmail);
      }
    }
  }, [user]);

  useEffect(() => {
    if (email) {
      dispatch(getResume(email));
    }
  }, [email, dispatch]);

  // Use this useEffect to log data for debugging purposes
  useEffect(() => {
    if (data) {
      console.log("Fetched Resume Data:", data);
    }
  }, [data]);

  useEffect(()=>{
    if(!isSignedIn){
      navigate("/auth/sign-in")
    }
  },[])

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h1 className="font-bold text-3xl ">My Resume</h1>
      <p>Start Creating AI Resume to your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {data && Array.isArray(data) && data.map((resume, index) => (
          <ResumeItem resume={resume} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
