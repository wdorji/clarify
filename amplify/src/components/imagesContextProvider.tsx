"use client";
import React, { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { useState } from "react";

interface ImagesContextProps {
  images: { fileName: string; imageUrls: string[]; imageBuckets: string[] };
  setImages: Dispatch<
    SetStateAction<{
      fileName: string;
      imageUrls: string[];
      imageBuckets: string[];
    }>
  >;
}

interface ImagesContextProviderProps {
  children: React.ReactNode;
}

export const ImagesContext = createContext<ImagesContextProps>({
  images: { fileName: "untitled", imageBuckets: [], imageUrls: [] },
  setImages: () => {},
});

export default function ImagesContextProvider({
  children,
}: ImagesContextProviderProps) {
  const [images, setImages] = useState<{
    fileName: string;
    imageUrls: string[];
    imageBuckets: string[];
  }>({ fileName: "untitled", imageBuckets: [], imageUrls: [] });

  return (
    <ImagesContext.Provider value={{ images, setImages }}>
      {children}
    </ImagesContext.Provider>
  );
}
