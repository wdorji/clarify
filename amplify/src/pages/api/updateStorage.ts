import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { TeacherDocument } from "@/types/TeacherDocument";

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
    const {
      textContent,
      imageBucket,
      userEmail,
      imageUrl,
      date,
      textName,
      textId,
      grammarPrompt,
      question,
      palmRes,
      refAnswer,
    } = req.body;

    const requestRef = doc(db, TEACHER_DOCUMENT_COLLECTION, textId);

    const userDocument: TeacherDocument = {
      imageUrl: imageUrl,
      textName: textName,
      imageBucket: imageBucket,
      textContent: textContent,
      userEmail: userEmail,
      date: date,
      textId: textId,
      palmRes: palmRes,
      refAnswer: refAnswer,
      grammarPrompt: grammarPrompt,
      question: question,
    };

    await updateDoc(requestRef, userDocument);
    let responseText = textId;

    // if (resp) {
    //   responseText = resp;
    // } else {
    //   responseText = "Sorry, we could not process the documen!";
    // }

    res.status(200).json({ status: 200, response_text: responseText });
  } catch (err) {
    res.status(400).json({ error: "PaLM processing has failed!" });
  }
}
