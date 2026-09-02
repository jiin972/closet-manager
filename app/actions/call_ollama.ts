"use server";

import { MY_OLLAMA } from "@/lib/constants";

const ollamaUrl = process.env.OLLAMA_API_URL;

/**
 * 재사용 가능한 Ollama API 통신 유틸 함수 (Fetcher)
 * - route.ts(호출자)가 DB 데이터와 결합하여 전달해 준(매개변수) 최종 prompt를 받음
 * - 받은 prompt를 Ollama API 서버(/api/generate)로 전송하고 결과 텍스트만 반환함
 *
 * @param prompt - route.ts에서 완벽히 조립되어 넘어온 최종 프롬프트 문자열
 * @returns Ollama가 생성한 응답 텍스트 (data.response)
 */
export async function callOllama(prompt: string) {
  const response = await fetch(`${ollamaUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MY_OLLAMA,
      prompt: prompt,
      stream: false,
    }),
  });
  if (!response.ok) {
    throw new Error("AI 요청에 실패했습니다.");
  }
  const data = await response.json();
  return data.response; //data중 response(필요한 텍스트)만 추출
}
