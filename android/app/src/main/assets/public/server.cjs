var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "50mb" }));
var getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  return new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
};
app.post("/api/generate-exam", async (req, res) => {
  try {
    const { rawText } = req.body;
    if (!rawText || typeof rawText !== "string" || rawText.trim() === "") {
      return res.status(400).json({ error: "No raw text provided" });
    }
    const ai = getGeminiClient();
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
          type: import_genai.Type.ARRAY,
          description: "List of processed questions parsed from raw text.",
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              id: { type: import_genai.Type.STRING, description: "A unique short alphanumeric id, e.g. 'custom-1'" },
              topicId: {
                type: import_genai.Type.INTEGER,
                description: "The topic classification number (1 to 6) based on computer science / digital literacy topics."
              },
              difficulty: {
                type: import_genai.Type.STRING,
                description: "The estimated question difficulty level. Must be exactly 'nhan_biet' (Recall), 'thong_hieu' (Understand), 'van_dung' (Apply), or 'van_dung_cao' (Analyze/Create)."
              },
              questionText: { type: import_genai.Type.STRING, description: "The content of the question." },
              options: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING },
                description: "Contain exactly 4 multiple choice options. Strip option prefixes like 'A.', 'B.', 'C.', 'D.' if they exist."
              },
              correctOption: {
                type: import_genai.Type.INTEGER,
                description: "0-based index of the correct option (0 for A/1st, 1 for B/2nd, 2 for C/3rd, 3 for D/4th)."
              },
              explanation: { type: import_genai.Type.STRING, description: "A crystal clear, friendly, and details explanation of why the selected answer is correct in Vietnamese." }
            },
            required: ["id", "topicId", "difficulty", "questionText", "options", "correctOption", "explanation"]
          }
        }
      }
    });
    const parsedJson = JSON.parse(response.text || "[]");
    return res.status(200).json({ questions: parsedJson });
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({
      error: "Kh\xF4ng th\u1EC3 x\u1EED l\xFD \u0111\u1EC1 thi b\u1EB1ng AI. Vui l\xF2ng ki\u1EC3m tra l\u1EA1i \u0111\u1ECBnh d\u1EA1ng t\u1EC7p/v\u0103n b\u1EA3n ho\u1EB7c th\u1EED l\u1EA1i sau.",
      details: error.message
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
