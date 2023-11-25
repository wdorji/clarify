"use client";

import {
  Box,
  Progress,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { getDocRequest, makeGrammarRequest } from "@/global/httpRequestsUtils";
import { TeacherDocument } from "@/types/TeacherDocument";
import { useContext, useEffect, useState, Fragment } from "react";
import { Routes, Route, useParams, useSearchParams } from "react-router-dom";
import { DocumentContext } from "@/components/documentContextProvider";
import UploadWidget from "@/components/uploadWidget";
import ProgressStepper from "@/components/progessStepper";
import NavigateButton from "@/components/navigateButton";
import toast from "react-hot-toast";

import { usePDF } from "react-to-pdf";

export default function ResultPage() {
  const { documentId, setDocumentId } = useContext(DocumentContext);
  const [fileName, setFileName] = useState("untitled");
  const [userInput, setUserInput] = useState("");

  let [value, setValue] = useState("Sorry we could not extract anything");

  const getRes = async () => {
    const curDoc: TeacherDocument = (await getDocRequest(documentId))
      .response_text;

    setValue(curDoc.palmRes!);
    if (curDoc.question === "") {
      if (curDoc.grammarPrompt == "") {
        setUserInput("Grammar/structure feedback");
      } else {
        setUserInput("Topic/Question: " + curDoc.grammarPrompt);
      }

      setFileName(curDoc.textName + "_grammar_analysis.pdf");
    } else {
      setUserInput("Question: " + curDoc.question);
      setFileName(curDoc.textName + "_accuracy_analysis.pdf");
    }
  };

  useEffect(() => {
    getRes();
  });

  const { toPDF, targetRef } = usePDF({
    filename: fileName,
  });

  const paragraphs = value.split("\n");

  return (
    <div className="flex-1 sm:ml-[19vw] h-fit min-h-[100vh] flex items-center justify-center">
      <VStack spacing={50}>
        <span className="text-4xl font-semibold text-[#000000] ">
          Here is the result:
        </span>

        <div>
          <div ref={targetRef}>
            <div className="card-container">
              <h2 className="card-title">{userInput}</h2>
              {paragraphs.map((paragraph, index) => (
                <Fragment key={index}>
                  <p key={index}>
                    {paragraph.trim().startsWith("**") ? (
                      <h2 className="bold">
                        {paragraph.trim().replaceAll("**", "")}
                      </h2>
                    ) : paragraph.trim().startsWith("*") ? (
                      <span className="bullet-point">
                        &#8226; {paragraph.trim().substring(1)}
                      </span>
                    ) : (
                      paragraph.trim()
                    )}
                  </p>
                  <br />
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div
          className="w-40 flex items-center justify-center space-x-2 border-[2px] border-black rounded-md p-1 cursor-pointer hover:bg-[#d3d3d3] transition-[0.5s]"
          onClick={() => toPDF()}
        >
          <span className="text-black text-base font-semibold">
            Download PDF
          </span>
        </div>
        <ProgressStepper currentStep={4} />
      </VStack>
    </div>
  );
}
