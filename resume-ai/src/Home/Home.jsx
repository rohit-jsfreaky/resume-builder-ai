import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  ArrowRight,
  LogIn,
  PackageIcon,
  RedoDotIcon,
  Youtube,
} from "lucide-react";
import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleStarted = () => {
    if (isSignedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth/sign-in");
    }
  };

  const handleSign = () => {
    console.log(isSignedIn);
    if (!isSignedIn) {
      navigate("/auth/sign-in");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center gap-5 pt-16 md:pt-32 px-4">
        <div>
          <h1 className="text-3xl md:text-6xl font-bold text-center">
            Build Your Resume <span className="text-primary">With AI</span>
          </h1>
        </div>
        <div>
          <h3 className="text-gray-400 font-bold text-base md:text-lg mb-4 text-center">
            Effortlessly Craft a Standout Resume With our AI-Powered Builder
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Button onClick={handleStarted}>
            Get Started <ArrowRight />
          </Button>
          {!isSignedIn && (
            <Button onClick={handleSign} variant="outline">
              Login/Register <LogIn />
            </Button>
          )}
        </div>

        <div className="text-base md:text-lg text-gray-400 font-semibold mb-6 text-center">
          <h3>FEATURED IN</h3>
        </div>

        <div className="flex flex-wrap justify-center text-gray-500 font-bold text-lg md:text-2xl items-center gap-10 md:gap-20">
          <h1 className="flex items-center gap-1">
            <span>
              <Youtube size={"30px"} md:size={"40px"} />
            </span>
            YouTube
          </h1>
          <h1 className="flex items-center gap-1">
            <PackageIcon size={"30px"} md:size={"40px"} /> Product Hunt
          </h1>
          <h1 className="flex items-center gap-1">
            <RedoDotIcon size={"30px"} md:size={"40px"} /> reddit
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-4">
        <div className="mt-16 md:mt-20 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold">How it Works?</h1>
        </div>

        <div>
          <p className="text-gray-400 font-bold text-sm md:text-md text-center">
            Build Your Resume in just 3 simple easy steps
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6 mb-10">
          <Card
            title="Choose Your Resume name"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, dolor odio modi harum odit ad voluptatum quos possimus omnis ea, perferendis."
            iconName="react"
          />
          <Card
            title="Edit Your Details"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, dolor odio modi harum odit ad voluptatum quos possimus omnis ea, perferendis."
            iconName="pen"
          />
          <Card
            title="Download/Share Your Resume"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, dolor odio modi harum odit ad voluptatum quos possimus omnis ea, perferendis."
            iconName="share"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
