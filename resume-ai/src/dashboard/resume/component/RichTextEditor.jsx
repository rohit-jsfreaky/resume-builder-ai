import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIchatSession } from "../../../../service/AImodel";
import { toast } from "sonner";

const PROMPT =
  "position title : {positionTitle} , Depends on position title give me 4-5 bullet points for my experience in resume , give me result in JSON single object and the key value should be experience_bullets";

const RichTextEditor = ({ onRichTextEdiorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo.experience[index].title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    const result = await AIchatSession.sendMessage(prompt);
    const response = JSON.parse(result.response.text());

    setValue(response.experience_bullets.join("\n"));

    setLoading(false);
  };

  useEffect(() => {
    if (defaultValue && defaultValue !== "") {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div>
      <div className="flex justify-between my-2 items-center">
        <label htmlFor="" className="text-xs font-semibold">
          Summery
        </label>
        <Button
          onClick={GenerateSummeryFromAI}
          className="flex border-primary text-primary"
          variant="outline"
          size="sm"
          type="button"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEdiorChange(e);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
