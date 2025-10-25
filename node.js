import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

// Verify webhook (Meta will call this once)
app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === "adarsh-bot") {
    res.send(req.query["hub.challenge"]);
  } else {
    res.send("Verification failed");
  }
});

// Listen for messages
app.post("/webhook", async (req, res) => {
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  
  if (message && message.text?.body.toLowerCase() === "hi") {
    const from = message.from; // sender’s number
    const token = "YOUR_ACCESS_TOKEN"; // from Meta API Setup
    const phoneNumberId = "YOUR_PHONE_NUMBER_ID"; // from API Setup

    await axios.post(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        text: { body: "Hey Adharsh 👋! This is your bot speaking!" },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Webhook running on port 3000"));
