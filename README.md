# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

The chatbot calls the OpenAI API through a Cloudflare Worker. Never put an API
key in `script.js` or any other project file; store it as an encrypted Worker
secret.

To deploy the Worker from this repository with Wrangler:

1. Log in to Wrangler using the Cloudflare account that owns the Worker.
2. From the repository folder, set the secret once (or again if it has changed):
   `wrangler secret put OPENAI_API_KEY`
3. Deploy the Worker from this repository: `wrangler deploy`.
   The [wrangler.toml](./wrangler.toml) config deploys
   `RESOURCE_cloudflare-worker.js` as the `08-prj-loreal-chatbot` Worker.
4. Keep `workerUrl` in `script.js` set to the deployed Worker URL. The frontend
   and Worker are separate deployments; deploying the website does not deploy
   the Worker.

The browser sends a `messages` array and reads the reply from
`data.choices[0].message.content`. Conversation history is kept in the current
page session.

If the chat reports an HTTP 500, read the detail shown after the status. If it
says `Worker secret OPENAI_API_KEY is not configured`, set the secret while
logged in to the Cloudflare account that owns this Worker, then deploy again:
`wrangler secret put OPENAI_API_KEY` followed by `wrangler deploy`.

Never commit the API key or place it in `wrangler.toml`.

Enjoy building your L’Oréal beauty assistant! 💄

## Typography reference

The [Monotype L’Oréal font case study](https://hello.monotype.com/rs/800-DWE-978/images/BrandReview_LOREAL.pdf)
describes L’Oréal’s 2020 web pairing of Helvetica Now Display and Halesworth
eText. These are licensed typefaces, so this project uses their names in the
font stacks with common system fallbacks rather than distributing font files.
