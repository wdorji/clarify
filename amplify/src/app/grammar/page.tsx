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
  makeGrammarRequest,
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

export default function GrammarPage() {
  const router = useRouter();
  const { documentId, setDocumentId } = useContext(DocumentContext);

  let [value, setValue] = useState("");

  let handleInputChange = (e: { target: { value: any } }) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleClick = async () => {
    const notification = toast.loading("Processing");

    const curDoc: TeacherDocument = (await getDocRequest(documentId))
      .response_text;

    const palmResponse = (await makeGrammarRequest(curDoc.textContent, value))
      .response_text;

    const docId = await updateDocRequest({
      ...curDoc,
      grammarPrompt: value,
      palmRes: palmResponse as string,
    });

    setDocumentId(docId.response_text);

    toast.success("Document processed successfully!", {
      id: notification,
    });

    router.replace("/result");
  };

  return (
    <div className="flex-1 sm:ml-[19vw] h-fit min-h-[100vh] flex items-center justify-center">
      <VStack spacing={50}>
        <span className="text-4xl font-semibold text-[#000000]">
          Specify a topic or question the essay or text is about
        </span>
        <span className="text-1xl text-[#000000]">
          If left blank, general grammar and overall stucture will be assessed
        </span>

        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Enter topic or question"
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
