import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

// ✅ Replace these with your values
const VERIFY_TOKEN = "adarsh-bot";
const ACCESS_TOKEN = "YOUR_META_ACCESS_TOKEN";
const PHONE_NUMBER_ID = "YOUR_PHONE_NUMBER_ID";

// 🧩 Verify webhook (Meta calls this once)
app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === VERIFY_TOKEN) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.status(403).send("Verification failed");
  }
});

// 💬 Handle messages
app.post("/webhook", async (req, res) => {
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (message && message.text?.body?.toLowerCase() === "hi") {
    const from = message.from;

    await axios.post(
      `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        text: { body: "Hey Adharsh 👋! This is your WhatsApp bot replying!" },
      },
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    );
  }

  res.sendStatus(200);
});

// 🟢 Start server
app.listen(10000, () => console.log("Bot is running on port 10000"));
