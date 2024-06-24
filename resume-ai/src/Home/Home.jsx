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
import React, { useReducer } from "react";
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
    console.log(isSignedIn)
    if (!isSignedIn) {
      navigate("/auth/sign-in");
    }
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center gap-5 pt-32">
        <div>
          <h1 className="text-6xl font-bold">
            Build Your Resume <span className="text-primary">With AI</span>
          </h1>
        </div>
        <div>
          <h3 className="text-gray-400 font-bold text-lg mb-4">
            Effortlessly Craft a Standout Resume With our AI-Powered Builder
          </h3>
        </div>

        <div className="flex gap-4 mb-10">
          <Button onClick={handleStarted}>
            Get Started <ArrowRight />
          </Button>
          {!isSignedIn && (
            <Button onClick={handleSign} variant="outline">
              Login/Register <LogIn />
            </Button>
          )}
        </div>

        <div className="text-lg text-gray-400 font-semibold mb-6">
          <h3>FEATURED IN</h3>
        </div>

        <div className="flex text-gray-500 font-bold text-2xl items-center gap-20">
          <h1 className="flex items-center gap-1">
            <span>
              <Youtube size={"40px"} />
            </span>
            YouTube
          </h1>
          <h1 className="flex items-center gap-1">
            <PackageIcon size={"40px"} /> Product Hunt
          </h1>
          <h1 className="flex items-center gap-1">
            <RedoDotIcon size={"40px"} /> reddit{" "}
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="mt-20 mb-2">
          <h1 className="text-3xl font-bold">How it Works?</h1>
        </div>

        <div>
          <p className="text-gray-400 font-bold text-md">
            Build Your Resume in just 3 simplar easy step
          </p>
        </div>

        <div className="flex gap-4 mt-6 mb-10">
          <Card
            title="Choose Your Resume name"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          dolor odio modi harum odit ad voluptatum quos possimus omnis ea,
          perferendis,"
            iconName="react"
          />
          <Card
            title="Edit Your Details"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          dolor odio modi harum odit ad voluptatum quos possimus omnis ea,
          perferendis,"
            iconName="pen"
          />
          <Card
            title="Download/Share Your Resume"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          dolor odio modi harum odit ad voluptatum quos possimus omnis ea,
          perferendis,"
            iconName="share"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
