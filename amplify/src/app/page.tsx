"use client";

import { VStack, Text, HStack, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavigateButton from "@/components/navigateButton";
import { usePDF } from "react-to-pdf";

export default function LandingPage() {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <div className="flex-1 sm:ml-[19vw] h-fit min-h-[100vh] flex items-center justify-center">
      <VStack>
        <span className="text-4xl font-semibold text-[#000000]">
          Transforming Education, One Document at a Time
        </span>
        <HStack>
          <Image src="/flying.svg" alt="Vercel Logo" width={600} height={24} />
          <VStack spacing={50}>
            <span className="text-2xl  text-[#000000] ">
              Simply upload photos of your handwritten documents to assess
              grammar, accuracy, and gain valuable insights for improving your
              students&apos; work.
            </span>
            <NavigateButton
              buttonLabel="Get Started"
              route="upload"
              size="40"
            />
          </VStack>
        </HStack>
      </VStack>
    </div>
  );
}
