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
    const { prompt, data } = req.body;

    let bot = new PaLM(process.env.NEXT_PUBLIC_PALM_KEY!);

    let responseText = null;

    if (prompt == "") {
      responseText = await bot.ask(data, {
        context:
          "Check for grammar, overall structure and provide a score out of 100 along with feedback",
      });
    } else {
      responseText = await bot.ask(data, {
        context:
          "Given the topic or question of " +
          prompt +
          " check how well the topic/question is addressed, grammar, overall structure and provide a score out of 100 along with feedback",
      });
    }

    if (responseText == null) {
      responseText = "Sorry, we could not process the document!";
    }

    res.status(200).json({ status: 200, response_text: responseText });
  } catch (err) {
    res.status(400).json({ error: "PaLM processing has failed!" });
  }
}
