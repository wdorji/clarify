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

import { useRouter } from "next/navigation";

import {
  updateDocRequest,
  getDocRequest,
  makeCheckRequest,
} from "@/global/httpRequestsUtils";
import { TeacherDocument } from "@/types/TeacherDocument";
import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, useSearchParams } from "react-router-dom";
import { DocumentContext } from "@/components/documentContextProvider";
import UploadWidget from "@/components/uploadWidget";
import ProgressStepper from "@/components/progessStepper";
import NavigateButton from "@/components/navigateButton";
import toast from "react-hot-toast";
import { documentId } from "@firebase/firestore";

export default function QuestionPage() {
  const router = useRouter();
  const { documentId, setDocumentId } = useContext(DocumentContext);

  let [value, setValue] = useState("");
  let [response, setResponse] = useState("");

  const handleInputChange = (e: { target: { value: any } }) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleResponseChange = (e: { target: { value: any } }) => {
    let inputValue = e.target.value;
    setResponse(inputValue);
  };

  const handleClick = async () => {
    if (value.length == 0 || response.length == 0) {
      alert("Please specify a question and a reference answer");
    } else {
      const notification = toast.loading("Processing");

      const curDoc: TeacherDocument = (await getDocRequest(documentId))
        .response_text;

      const palmResponse = (
        await makeCheckRequest(curDoc.textContent, response, value)
      ).response_text;

      const docId = await updateDocRequest({
        ...curDoc,
        question: value,
        refAnswer: response,
        palmRes: palmResponse as string,
      });

      setDocumentId(docId.response_text);

      toast.success("Document processed successfully!", {
        id: notification,
      });

      router.replace("/result");
    }
  };

  return (
    <div className="flex-1 sm:ml-[19vw] h-fit min-h-[100vh] flex items-center justify-center">
      <VStack spacing={50}>
        <span className="text-4xl font-semibold text-[#000000]">
          Specify the question
        </span>

        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Enter question"
          size="lg"
          h="200"
        />
        <span className="text-4xl font-semibold text-[#000000]">
          Specify the reference answer
        </span>

        <Textarea
          value={response}
          onChange={handleResponseChange}
          placeholder="Enter reference answer"
          size="lg"
          h="200"
        />

        <div
          className="w-40 flex items-center justify-center space-x-2 border-[2px] border-black rounded-md p-1 cursor-pointer hover:bg-[#d3d3d3] transition-[0.5s]"
          onClick={handleClick}
        >
          <span className="text-black text-base font-semibold">
            Start Clarifying!
          </span>
        </div>
        <ProgressStepper currentStep={3} />
      </VStack>
    </div>
  );
}
