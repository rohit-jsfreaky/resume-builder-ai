import { MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { deleteResume } from "@/actions/resumeAction";

const ResumeItem = ({ resume }) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const id = resume?._id;
    console.log(id);
    await dispatch(deleteResume(id));
    setOpenAlert(false);
    navigate("/dashboard");
  };

  return (
    <Link>
      <div
        className="relative p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex flex-col items-center justify-center h-[280px] border-t-4 rounded-lg hover:scale-105 hover:shadow-md shadow-primary transition-all"
        style={{ borderColor: resume?.themeColor }}
      >
        <img src="/cv.png" alt="" width={80} height={80} />

        <div className="absolute bottom-0 h-10 bg-primary z-10 w-full rounded-br-lg rounded-bl-lg px-3 flex justify-between items-center">
          <h2 className="text-white my-1">
            {resume?.title.charAt(0).toUpperCase() +
              resume?.title.slice(1, resume?.title.length)}
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="h-4 w-4 cursor-pointer text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/dashboard/resume/${resume.uid}/edit`);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/my-resume/${resume.uid}/view`);
                }}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate(`/my-resume/${resume.uid}/view`);
                }}
              >
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Link>
  );
};

export default ResumeItem;
