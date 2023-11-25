import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { TeacherDocument } from "@/types/TeacherDocument";
import vision from "@google-cloud/vision";
import { GoogleAuth } from "google-auth-library";

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
    const { imageUrl } = req.body;

    const credentials = JSON.parse(
      process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS!
    );

    const auth = new GoogleAuth({ credentials });

    const client = new vision.ImageAnnotatorClient({ auth });

    const request = {
      image: {
        source: {
          imageUri: imageUrl,
        },
      },

      features: [
        {
          type: "DOCUMENT_TEXT_DETECTION",
          model: "builtin/weekly",
        },
      ],
      imageContext: {
        languageHints: ["bo-t-i0-handwrit"],
      },
    };

    const [textDetections] = await client.annotateImage(request);

    const [annotation] = textDetections.textAnnotations!;
    const text = annotation ? annotation.description : "";

    let responseText = text;

    res.status(200).json({ status: 200, response_text: responseText });
  } catch (err) {
    res.status(400).json({ error: "OCR processing has failed!" });
  }
}
