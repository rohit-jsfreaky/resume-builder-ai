import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <div className="p-3 px-20 flex justify-between shadow-md">
      <Link to={"/"}><img src="/logo.svg" alt="" /></Link>
      

      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
         
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
