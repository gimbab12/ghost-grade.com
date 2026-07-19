import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Lazy initialize Gemini SDK as per guidelines to prevent startup crashes if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON parsing with a larger limit to safely handle base64 image uploads
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // API Endpoints
  app.post("/api/analyze", async (req: Request, res: Response) => {
    try {
      const { image, gender, answers, gradePreference, lang = "ko" } = req.body;

      if (!gender || !answers || !Array.isArray(answers)) {
        res.status(400).json({ error: "Invalid data provided." });
        return;
      }

      // Format answers for Gemini prompt context
      const formattedAnswers = answers.map((ans: any, idx: number) => {
        return `Question ${idx + 1}: ${ans.question} | Selected Answer: ${ans.selectedOptionText} (${ans.choiceId})`;
      }).join("\n");

      // Set up the parts for Gemini multimodal input
      const parts: any[] = [];

      if (image && typeof image === "string") {
        // Parse base64 image
        const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mimeType = matches[1];
          const base64Data = matches[2];
          parts.push({
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          });
        }
      }

      const langInstruct = lang === "ko" ? "Korean" : lang === "en" ? "English" : lang === "zh" ? "Chinese" : "Japanese";

      const promptText = `
당신은 공포 등급 측정기이자 운명 예언자입니다. 사용자가 제출한 성별, 5가지 심리 질문 답변, 그리고 그들의 얼굴 사진을 분석하여 그들 내면에 숨겨진 '또 다른 어두운 모습'의 정체를 밝히고 오싹한 분석 보고서를 작성해야 합니다.

등급 체계:
- 1등급: 그리스신, 대천사, 루시퍼 (신적이고 절대적인 지배자, 타락한 천사 등의 강력하고 매혹적인 아우라)
- 2등급: 악마, 마녀, 뱀파이어, 반인반신 (매혹적이고 치명적이며 날카로운 어둠의 존재)
- 3등급: 귀신 (형체 없이 떠도는 영혼, 투명하고 서늘하며 한기가 도는 고독한 존재)
- 4등급: 좀비 (고통을 느끼지 못하고 본능에 휩싸여 육체가 부패해가는 공포스러운 존재)

사용자 정보:
성별: ${gender === "male" ? "남성 (Male)" : "여성 (Female)"}
답변 내용:
${formattedAnswers}

${gradePreference ? `추천/가이드 등급: ${gradePreference}등급 (답변 결과에 따라 결정하되, 가능한 이 등급의 컨셉과 조화롭게 분석해주십시오.)` : ""}

당신이 분석하여 확정해야 할 결과 필드 설명:
1. grade: 최종 공포 등급 (1, 2, 3, 4 중 정수 하나로 최종 확정)
2. characterName: 성별과 등급에 완벽히 매칭되는 매혹적이고 오싹한 정체 명칭 (예: '피빛 계약의 뱀파이어 로드', '심연을 심판하는 타락 대천사', '버려진 거울 속 원혼', '차가운 빗속을 걷는 부패한 좀비' 등)
3. faceAnalysis: 얼굴 사진(업로드한 경우)에서 느껴지는 차가운 눈빛, 숨겨진 미소, 주위의 그림자, 혹은 사진이 없더라도 사용자의 답변이 투영하는 외형적 공포 아우라를 심리 분석과 엮어 극적이고 오싹하게 서술하십시오.
4. personalityAnalysis: 5가지 질문의 답변들이 은폐하려고 했던 그들의 어두운 심연의 본모습과 잔혹성, 혹은 소름 끼치는 외로움을 정밀 분석하십시오.
5. prophecy: 그들이 내면의 또 다른 자아로 깨어나는 순간 무슨 일이 벌어질지에 대한 절대적인 경고 또는 예언을 하십시오.

CRITICAL INSTRUCTION: You MUST translate and output ALL generated text fields (characterName, faceAnalysis, personalityAnalysis, prophecy) in ${langInstruct} language. Do not output Korean unless ${langInstruct} is Korean. Keep the tone dark, eerie, and poetic in the requested language.

반드시 다음 JSON 스키마 형식으로 응답하십시오.
`;

      parts.push({ text: promptText });

      const client = getAiClient();
      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: { parts },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              grade: { type: Type.INTEGER, description: "최종 산출된 공포 등급 (1, 2, 3, 4 중 하나)" },
              characterName: { type: Type.STRING, description: "등장에 적합한 기괴하고 매력적인 정체 명칭" },
              faceAnalysis: { type: Type.STRING, description: "사용자의 사진 분위기 혹은 아우라 분석 (오싹한 분위기)" },
              personalityAnalysis: { type: Type.STRING, description: "선택한 심리 분석 기반의 어두운 본성 해석" },
              prophecy: { type: Type.STRING, description: "절대적인 경고 및 운명적 예언" },
            },
            required: ["grade", "characterName", "faceAnalysis", "personalityAnalysis", "prophecy"],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Gemini API가 빈 응답을 반환했습니다.");
      }

      const resultData = JSON.parse(responseText.trim());
      res.json(resultData);
    } catch (error: any) {
      console.error("분석 에러:", error);
      res.status(500).json({ error: error.message || "분석 도중 오류가 발생했습니다." });
    }
  });

  // Serve static assets and Vite middleware
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
