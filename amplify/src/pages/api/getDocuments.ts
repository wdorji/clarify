import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase";

import { TeacherDocument } from "../../types/TeacherDocument";

export const TEACHER_DOCUMENT_COLLECTION = "documents";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // Respond with a 405 Method Not Allowed if the request method is not POST
    res.status(405).end();
    return;
  }

  try {
    const { userEmail } = req.body;

    const teacherDocuments = query(
      collection(db, TEACHER_DOCUMENT_COLLECTION),
      where("userEmail", "==", userEmail)
      // orderBy("date", "desc")
    );

    const snapshot = await getDocs(teacherDocuments);

    let allteacherDocuments: TeacherDocument[] = [];

    for (const documentSnapshot of snapshot.docs) {
      const teacherDocument = documentSnapshot.data();
      allteacherDocuments.push({
        date: teacherDocument["date"],
        userEmail: teacherDocument["userEmail"],
        textContent: teacherDocument["textContent"],
        imageUrl: teacherDocument["imageUrl"],
        imageBucket: teacherDocument["imageBucket"],
        textName: teacherDocument["textName"],
        textId: teacherDocument["textId"],
        question: teacherDocument["question"],
        refAnswer: teacherDocument["refAnswer"],
        grammarPrompt: teacherDocument["grammarPrompt"],
        palmRes: teacherDocument["palmRes"],
      });
    }

    let responseText: TeacherDocument[] = [];
    if (allteacherDocuments) {
      responseText = allteacherDocuments;
    }

    res.status(200).json({ status: 200, response_text: responseText });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error fetching the teacher documents from firebase!" });
  }
}
