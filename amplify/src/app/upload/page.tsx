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

export default function UploadPage() {
  return (
    <div className="flex-1 sm:ml-[19vw] h-fit min-h-[100vh] flex items-center justify-center">
      <VStack spacing={50}>
        <span className="text-4xl font-semibold text-[#000000]">
          Upload images of your document (limit to 5 images)
        </span>
        <UploadWidget />

        <ProgressStepper currentStep={0} />
      </VStack>
    </div>
  );
}
