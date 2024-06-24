import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useDispatch } from "react-redux";
import { updateResume } from "@/actions/resumeAction";
import { useParams } from "react-router-dom";
const ThemeColor = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const dispatch = useDispatch();
  const {resumeId}= useParams();
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];
  const [selectedColor , setSelectedColor]= useState();

  const onColorSelect = (color) => {
    setSelectedColor(color)
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    const colorData = {resumeId, themeColor : color}
    dispatch(updateResume(colorData))
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="text-sm font-bold mb-2">Select Theme color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              onClick={() => {
                onColorSelect(item);
              }}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${selectedColor===item&&'border border-black'}`}
              style={{ background: item }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;
