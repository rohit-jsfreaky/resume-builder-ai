import { PlusSquare } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addResume } from "@/actions/resumeAction";
import { getResume } from "@/api";

const AddResume = () => {
  const { user } = useUser();

  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  // const { data } = useSelector((state) => state.resumeIdReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setEmail(user.primaryEmailAddress?.emailAddress);
      setUserName(user?.fullName);
    }
  }, [user]);

  const handleClick = async () => {
    const uid = uuidv4();
    if (!email) {
      // Handle the case where email is not available yet
      console.log("Email is not available yet");
      return;
    }
    const resumeData = { email, userName, resumeTitle, uid };

    dispatch(addResume(resumeData))
      
    navigate(`/dashboard/resume/${uid}/edit`)
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add Title for your new resume</p>
              <Input
                className="mt-2"
                placeholder="Eg :Full Stack resume"
                onChange={(e) => {
                  setResumeTitle(e.target.value);
                }}
              />
            </DialogDescription>

            <div className="flex justify-end gap-5">
              <Button
                onClick={() => {
                  setOpenDialog(false);
                }}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button disabled={!resumeTitle} onClick={handleClick}>
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
