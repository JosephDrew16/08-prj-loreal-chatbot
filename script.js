const workerUrl = "https://08-prj-loreal-chatbot.jwdrew.workers.dev/";

// Keep the conversation so the assistant can use earlier messages as context.
const conversation = [];
const systemMessage = {
  role: "system",
  content:
    "You are a friendly L’Oréal beauty advisor. Only answer questions about L’Oréal products, skincare, makeup, haircare, fragrance, beauty routines, and beauty-related recommendations. If a request is unrelated to these topics, politely say you can only help with L’Oréal and beauty-related questions, then invite the user to ask one. Do not invent product details; ask a brief clarifying question when needed. Give considerate recommendations and remind users to check product labels for ingredients or sensitivities.",
};

/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const sendBtn = document.getElementById("sendBtn");

function addMessage(role, text) {
  const row = document.createElement("div");
  row.className = `message-row ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "message";

  if (role === "ai") {
    const label = document.createElement("span");
    label.className = "message-label";
    label.textContent = "L’Oréal Beauty Advisor";
    bubble.appendChild(label);
  }

  const content = document.createElement("span");
  content.textContent = text;
  bubble.appendChild(content);
  row.appendChild(bubble);
  chatWindow.appendChild(row);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return content;
}

// Start the chat with a welcome message.
addMessage("ai", "Hello! How can I help with your beauty routine today?");

/* Send the conversation to the Cloudflare Worker. */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = userInput.value.trim();
  if (!question) {
    return;
  }

  // Show the latest question as a user bubble before the assistant responds.
  addMessage("user", question);
  userInput.value = "";
  sendBtn.disabled = true;

  const answer = addMessage("ai", "Thinking…");

  try {
    if (workerUrl.includes("your-worker-name")) {
      throw new Error("Add your deployed Cloudflare Worker URL in script.js.");
    }

    const response = await fetch(workerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          systemMessage,
          ...conversation,
          { role: "user", content: question },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`The Cloudflare Worker returned HTTP ${response.status}.`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      throw new Error("The Cloudflare Worker returned an unexpected response.");
    }

    conversation.push(
      { role: "user", content: question },
      { role: "assistant", content: reply },
    );
    answer.textContent = reply;
  } catch (error) {
    answer.textContent = `Sorry, I couldn’t get a response. ${error.message}`;
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
});
