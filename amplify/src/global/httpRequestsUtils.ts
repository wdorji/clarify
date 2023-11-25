import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { TeacherDocument } from "@/types/TeacherDocument";

export async function http<T>(request: AxiosRequestConfig): Promise<T> {
  const response: AxiosResponse<T> = await axios(request);
  return response.data;
}

/** The HTTP GET method requests a representation of the specified resource. */
export async function get<T>(url: string): Promise<T> {
  return await http<T>({
    method: "GET",
    url: url,
  });
}

export async function getDocRequest(docId: string) {
  try {
    const response = await fetch(`/api/getDocument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docId: docId,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    console.error("Error during POST request => ", error);
    // Handle the error
    throw error;
  }
}

export async function getDocsRequest(userEmail: string) {
  try {
    const response = await fetch(`/api/getDocuments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    console.error("Error during POST request => ", error);
    // Handle the error
    throw error;
  }
}

/** Send data in the body of the HTTP Request */
export async function post<T>(url: string, body: any): Promise<T> {
  return await http<T>({
    data: body,
    headers: { "Content-Type": "application/json" },
    method: "POST",
    url: url,
  });
}

export async function postOCR<T>(url: string, body: any): Promise<T> {
  return await http<T>({
    data: body,
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_OCP_KEY,
    },
    method: "POST",
    url: url,
  });
}

// Your client-side code (e.g., in a React component)
export async function makeGrammarRequest(data: string, prompt: string) {
  try {
    const response = await fetch("/api/grammarCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        data: data,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
      // Handle the AI response as needed
    } else {
      const error = await response.json();
      return error;
      // Handle the error
    }
  } catch (error) {
    console.error("Error during AI request => ", error);
    // Handle the error
  }
}

export async function makeCheckRequest(
  studentAnswer: string,
  referenceAnswer: string,
  question: string
) {
  try {
    const response = await fetch("/api/answerCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentAnswer: studentAnswer,
        referenceAnswer: referenceAnswer,
        question: question,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
      // Handle the AI response as needed
    } else {
      const error = await response.json();
      return error;
      // Handle the error
    }
  } catch (error) {
    console.error("Error during AI request => ", error);
    // Handle the error
  }
}

export async function addDocRequest(inputDocument: TeacherDocument) {
  try {
    const response = await fetch("/api/addStorage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputDocument),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    console.error("Error during post request => ", error);
    // Handle the error
  }
}

export async function updateDocRequest(inputDocument: TeacherDocument) {
  try {
    const response = await fetch("/api/updateStorage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputDocument),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    console.error("Error during post request => ", error);
    // Handle the error
  }
}

export async function performRecognition(imageUrl: string) {
  try {
    const response = await fetch("/api/performOCR", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: imageUrl,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    console.error("Error during post request => ", error);
    // Handle the error
  }
}

/**
 * The HTTP PUT request method creates a new resource or replaces
 * a representation of the target resource with the request payload.
 */
export async function put<T>(url: string, body: any): Promise<T> {
  return await http<T>({
    data: body,
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    url: url,
  });
}

/** The HTTP DELETE request method deletes the specified resource. */
export async function remove<T>(url: string): Promise<T> {
  return await http<T>({
    method: "DELETE",
    url: url,
  });
}
