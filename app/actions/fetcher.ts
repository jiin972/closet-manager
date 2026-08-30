/** 재사용가능한 Ollama fetcher함수
 * - 인자로 prompt를 받음
 */

import { MY_OLLAMA } from "@/lib/constants";

const ollamaUrl = process.env.OLLAMA_API_URL;

export async function callOllama(prompt: string) {
  const response = await fetch(`${ollamaUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MY_OLLAMA,
      prompt,
      stream: false,
    }),
  });
  if (!response.ok) {
    throw new Error("AI 요청에 실패했습니다.");
  }
  const data = await response.json();
  return data.response; //data중 response(필요한 텍스트)만 추출
}
