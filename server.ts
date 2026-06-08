import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: "50mb" }));

// Initialize Gemini client using the recommended official SDK pattern
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint to convert raw text of questions/answers into VNUQuestions
app.post("/api/generate-exam", async (req, res) => {
  try {
    const { rawText } = req.body;
    if (!rawText || typeof rawText !== "string" || rawText.trim() === "") {
      return res.status(400).json({ error: "No raw text provided" });
    }

    const ai = getGeminiClient();

    // Use gemini-3.5-flash for basic structured text parser/summarization
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are an expert educational exam processor. 
Your task is to parse the raw text, document portion, or questions & answers provided by the user and convert them into a structured JSON array of quiz questions.

The source text may be fragmented, copied from a Word document, have weird formatting, list answers immediately after questions, or list keys at the end. Try your absolute best to reconstruct the questions, their options, the correct answer, and an informative explanation.

Topic Classification Rules (Assign a number 1 to 6 based on computer science/digital literacy subject):
Topic 1: Digital world, hardware, devices, desktop/mobile operating systems.
Topic 2: Computer networks, Internet communication, IP addresses, DNS, network topologies.
Topic 3: Files & directories, relational databases, advanced Google search operators, academic searching.
Topic 4: Online cloud software, Google Drive, spreadsheet tools & formulas, online work collaboration.
Topic 5: Basic algorithms, flowcharts, computational thinking concepts, binary search, time/space complexity O(1).
Topic 6: Cybersecurity threats (phishing, ransomware, malware), information ethics, digital citation, copyright laws, intellectual property.

Ensure there are exactly 4 options per question. If the source material is missing options, invent plausible incorrect distractors.
Match indices accurately: correctOption MUST be an integer 0 to 3 (where 0 stands for A, 1 for B, 2 for C, 3 for D or equivalent values).

User pasted raw input:
"""
${rawText}
"""`,
      config: {
        systemInstruction: "You represent an educational parsing assistant. You parse user-submitted text and outputs complete, correct multiple-choice questions matching the requested schema. Never output any introductory text, markdown wraps, or explanation outside the returned JSON content.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "List of processed questions parsed from raw text.",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique short alphanumeric id, e.g. 'custom-1'" },
              topicId: { 
                type: Type.INTEGER, 
                description: "The topic classification number (1 to 6) based on computer science / digital literacy topics." 
              },
              difficulty: {
                type: Type.STRING,
                description: "The estimated question difficulty level. Must be exactly 'nhan_biet' (Recall), 'thong_hieu' (Understand), 'van_dung' (Apply), or 'van_dung_cao' (Analyze/Create)."
              },
              questionText: { type: Type.STRING, description: "The content of the question." },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Contain exactly 4 multiple choice options. Strip option prefixes like 'A.', 'B.', 'C.', 'D.' if they exist." 
              },
              correctOption: { 
                type: Type.INTEGER, 
                description: "0-based index of the correct option (0 for A/1st, 1 for B/2nd, 2 for C/3rd, 3 for D/4th)." 
              },
              explanation: { type: Type.STRING, description: "A crystal clear, friendly, and details explanation of why the selected answer is correct in Vietnamese." }
            },
            required: ["id", "topicId", "difficulty", "questionText", "options", "correctOption", "explanation"]
          }
        },
      },
    });

    const parsedJson = JSON.parse(response.text || "[]");
    return res.status(200).json({ questions: parsedJson });
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({ 
      error: "Không thể xử lý đề thi bằng AI. Vui lòng kiểm tra lại định dạng tệp/văn bản hoặc thử lại sau.", 
      details: error.message 
    });
  }
});

// Configure Vite middleware in development or static serving inside production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
