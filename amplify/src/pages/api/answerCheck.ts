// import { TextServiceClient } from "@google-ai/generativelanguage/build/src/v1beta2";
// import { GoogleAuth } from "google-auth-library";
// pages/api/aiEndpoint.ts
import { NextApiRequest, NextApiResponse } from "next";

// import Bard from "bard-ai";

import PaLM from "palm-api";

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
    const { studentAnswer, referenceAnswer, question } = req.body;

    let bot = new PaLM(process.env.NEXT_PUBLIC_PALM_KEY!);

    const resp = await bot.ask(
      'You are a teacher correcting an assesment. Given the question as "' +
        question +
        '", how close is the student answer "' +
        studentAnswer +
        '" to the reference answer "' +
        referenceAnswer +
        '"?',
      {
        context: "Provide improvements and a score out of 100",
      }
    );

    let responseText = null;
    if (resp) {
      responseText = resp;
    } else {
      responseText = "Sorry, we could not process the documen!";
    }

    res.status(200).json({ status: 200, response_text: responseText });
  } catch (err) {
    res.status(400).json({ error: "PaLM processing has failed!" });
  }
}
