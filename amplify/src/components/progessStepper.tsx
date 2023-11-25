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
} from "@chakra-ui/react";

const steps = [
  { title: "First", description: "Upload images" },
  { title: "Second", description: "Assign pages" },
  { title: "Third", description: "Select analysis" },
  { title: "Fourth", description: "Set questions" },
];

interface ProgressStepperProp {
  currentStep: number; // Update prop name and type
}

const ProgressStepper: React.FC<ProgressStepperProp> = ({ currentStep }) => {
  const max = steps.length;
  const progressPercent = (currentStep / max) * 100;

  return (
    <div>
      <Stepper index={currentStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Progress value={progressPercent} />
    </div>
  );
};

export default ProgressStepper;
