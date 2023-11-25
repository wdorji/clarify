# Clarify

## Inspiration

Motivated by the challenges faced by overworked teachers and shortage of tools designed for educators in less digitally advanced settings, Clarify aims to ease the burden of grading handwritten essays and responses.  Many countries are facing a massive shortage of teachers and in my home country of Bhutan, 416 teachers have left the profession from January to May, so on average more than 83 teachers resign in one month voluntarily. Clarify's main goal is to make grading process more manageable, combat teacher attrition, and ultimately contribute to a positive shift in the education landscape using AI.

## What it does

Clarify allows a user to upload images of say handwritten essays or response to a question which is then transcribed to digital text using optical character recognition. For the case of an essay, the user provides the essay topic and the using Google's PaLM 2 language model, we provide feedback on how well the topic/question is addressed, grammar, and overall structure. Otherwise for a response to a question, the user provides the question and a reference answer to check how close is the student answer to the reference answer and possible improvements.

## How we built it

The web app was developed using next js framework with next-auth for authentication, firebase for database storage, Google cloud vision for optical character recognition,  and  Google's PaLM 2 language model to generate feedback based on transcribed text.

## Challenges we ran into

This was my first time learning how to use firebase and google cloud was so it was difficult initially figuring out how to set up the consoles and api endpoints for calls.  Another issue was figuring out how to display to the user the sequence of steps for the digital grading process from upload of images to downloading the feedback in a seamless manner.

## Accomplishments that we're proud of

Getting able to setup the user account system, adding and updating documents in firebase storage after making calls google cloud API, and users being able to visualise all their submitted documents along with their feedback.

## What we learned

Learning how to create a serverless web application, using services like google cloud console, firebase and talking with users(teachers in our case) for how best such an app would benefit them and what they might want in such an application!

## What's next for Clarify

One of the main reasons I wanted to use Google Cloud Vision is due to the wide variety of languages beyond just English including Tibetan which is the same script as for Dzongkha. Currently it does a decent job of extracting Tibetan text for some fonts better than others. However a large language model for languages beyond just English are still in development, so I would love to integrate such that it can support other languages. Also it would be great if students and parents could also have access to the transcribed documents and feedback to make it a more cohesive grading process.
