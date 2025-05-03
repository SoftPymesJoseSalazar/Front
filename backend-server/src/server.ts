import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load .env
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("[ERROR] OPENAI_API_KEY is required in environment variables");
  process.exit(1);
}

const PORT = parseInt(process.env.PORT || "8081", 10);

const app = express();
app.use(cors());
app.use(express.json());

// 1. Mint an ephemeral Realtime session on behalf of the client
app.post("/session", async (req, res) => {
  try {
    const { model = "gpt-4o-realtime-preview-2024-12-17", voice = "alloy" } =
      req.body || {};

    const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "realtime=v1",
      },
      body: JSON.stringify({ model, voice }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[OpenAI API Error]", text);
      return res.status(500).send(text);
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    console.error("[Server Error]", err);
    return res.status(500).json({ error: "failed_to_create_session" });
  }
});

// Root health endpoint
app.get("/", (_req, res) => res.send("OpenAI Realtime backend running"));

app.listen(PORT, () => {
  console.log(`OpenAI Realtime backend listening on http://localhost:${PORT}`);
});
