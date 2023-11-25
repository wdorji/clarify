"use client";
import CheckWidget from "../../components/checkWidget";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getDocsRequest } from "@/global/httpRequestsUtils";
import { TeacherDocument } from "@/types/TeacherDocument";

export default function Documents() {
  const session = useSession();
  const [teacherDocuments, setTeacherDocuments] = useState<TeacherDocument[]>(
    []
  );

  const getDocuments = async () => {
    const docRequestResponse = await getDocsRequest(session.data?.user?.email!);
    setTeacherDocuments(docRequestResponse.response_text);
  };

  useEffect(() => {
    getDocuments();
  });

  return (
    <div className="flex-1 sm:ml-[19vw] h-fit min-h-[100vh] flex flex-col">
      {" "}
      {/* Updated: Added flex-col */}
      <div className="text-4xl p-2 font-semibold text-[#000000]">
        Recent Documents
      </div>
      {/* Transactions Table */}
      <div className="space-y-4 p-3">
        {/* Updated: Added space-y-4 for vertical spacing */}
        {teacherDocuments?.map((item) => (
          <CheckWidget teacherDocument={item} key={item.textId} />
        ))}
      </div>
    </div>
  );
}
