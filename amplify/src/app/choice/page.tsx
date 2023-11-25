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
  VStack,
} from "@chakra-ui/react";

import { getDocRequest } from "@/global/httpRequestsUtils";
import { TeacherDocument } from "@/types/TeacherDocument";
import { useContext, useEffect, useState } from "react";
import { Routes, Route, useParams, useSearchParams } from "react-router-dom";
import UploadWidget from "@/components/uploadWidget";
import ProgressStepper from "@/components/progessStepper";
import NavigateButton from "@/components/navigateButton";

export default function ChoicePage() {
  return (
    <div className="flex-1 sm:ml-[19vw] h-fit min-h-[100vh] flex items-center justify-center">
      <VStack spacing={50}>
        <span className="text-4xl font-semibold text-[#000000]">
          What can we help with you with?
        </span>
        <NavigateButton
          route={"grammar"}
          buttonLabel={"Check essay or text for grammar"}
          size="300"
        />
        <NavigateButton
          route={"question"}
          buttonLabel={
            "Correct for accuracy for a question with a reference answer"
          }
          size="300"
        />
        <ProgressStepper currentStep={2} />
      </VStack>
    </div>
  );
}
