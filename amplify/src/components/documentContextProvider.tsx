"use client";
import React, { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { useState } from "react";

interface DocumentContextProps {
  documentId: string;
  setDocumentId: Dispatch<SetStateAction<string>>;
}

interface DocumentContextProviderProps {
  children: React.ReactNode;
}

export const DocumentContext = createContext<DocumentContextProps>({
  documentId: "false",
  setDocumentId: () => {},
});

export default function DocumentContextProvider({
  children,
}: DocumentContextProviderProps) {
  const [documentId, setDocumentId] = useState("false");

  return (
    <DocumentContext.Provider value={{ documentId, setDocumentId }}>
      {children}
    </DocumentContext.Provider>
  );
}
