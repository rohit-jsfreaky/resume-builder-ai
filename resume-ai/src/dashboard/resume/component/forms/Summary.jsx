import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateResume } from "@/actions/resumeAction";
import { Brain, LoaderCircle } from "lucide-react";
import { AIchatSession } from "../../../../../service/AImodel";

const prompt =
  "Job Title : {jobTitle} , Depends on job title give me summery for my resume within 4-5 lines in JSON format where the json is an array of oject with field experience Level and summery with Experience level for Fresher , Mid-Level , Experienced";

const Summary = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState("");
  const dispatch = useDispatch(); 
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [aiGenratedSummeryList, setAiGenratedSummeryList] = useState([]);

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log("Prompt:", PROMPT);
    try {
      const result = await AIchatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();

      // Manually wrap the response in an array and parse
      const cleanedResponse = responseText.trim();
      console.log(cleanedResponse)
      const parsedResult = JSON.parse(cleanedResponse);
      console.log(parsedResult)
      if (Array.isArray(parsedResult)) {
        setAiGenratedSummeryList(parsedResult);
      } else {
        console.error("The response is not an array:", parsedResult);
        setAiGenratedSummeryList([]);
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      setAiGenratedSummeryList([]);
    }
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    const summeryData = { summery, resumeId };

    dispatch(updateResume(summeryData));
  };

  const handleSummaryClick = (summary) => {
    setSummery(summary);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary For your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="">Add Summary</label>
            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary flex gap-2"
              type="button"
              onClick={GenerateSummeryFromAI}
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            onChange={(e) => {
              setSummery(e.target.value);
            }}
            // value={summery}
            defaultValue={resumeInfo?.summery}
            required
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-10 mt-5">
        <h1 className="font-bold text-lg">Suggestions</h1>
        {
          aiGenratedSummeryList.map((item, index) => (
            <div
              key={index}
              className="shadow-lg p-4 rounded-lg cursor-pointer"
              onClick={() => handleSummaryClick(item["summary"])}
            >
              <h3 className="text-primary font-bold">Level: {item["experienceLevel"]}</h3>
              <p className="font-semibold">{item["summary"]}</p>
            </div>
          ))} 
      </div>
    </div>
  );
};

export default Summary;
                                                              