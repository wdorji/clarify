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
    const { docId } = req.body;
    const docRef = doc(db, "documents", docId);

    const documentSnapshot = await getDoc(docRef);

    let responseText = {};

    if (documentSnapshot.exists()) {
      // Document data is in documentSnapshot.data()
      const data = documentSnapshot.data();
      responseText = data;
    } else {
      console.log("No such document!");
    }

    res.status(200).json({ status: 200, response_text: responseText });
  } catch (error) {
    console.error("Error getting document:", error);
  }
}
