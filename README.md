# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

The chatbot sends messages to a Cloudflare Worker. Never put an OpenAI API key in
`script.js`, `secrets.js`, or any other project file. The key belongs only in
Cloudflare:

1. Create a Worker in the Cloudflare dashboard and paste in
   `RESOURCE_cloudflare-worker.js`.
2. In the Worker settings, add an encrypted secret named `OPENAI_API_KEY`.
3. Deploy the Worker and copy its `workers.dev` URL.
4. Replace the example URL in `script.js` (`workerUrl`) with your deployed URL.
5. Open the page, ask a beauty-related question, and confirm the assistant replies.

The browser sends a `messages` array and reads the reply from
`data.choices[0].message.content`. Conversation history is kept in the current
page session.

Enjoy building your L’Oréal beauty assistant! 💄

## Typography reference

The [Monotype L’Oréal font case study](https://hello.monotype.com/rs/800-DWE-978/images/BrandReview_LOREAL.pdf)
describes L’Oréal’s 2020 web pairing of Helvetica Now Display and Halesworth
eText. These are licensed typefaces, so this project uses their names in the
font stacks with common system fallbacks rather than distributing font files.
