const ollamaUrl = process.env.OLLAMA_API_URL;

/**
 * ollama와 브라우저 사이에서 데이터를 주고받는 API 엔드포인트(중계소) 함수
 * - request: 클라이언트가 Next.js서버로 보낸 요청객체
 * - response: Next.js서버가 Ollama 서버에 보낸 후 받아온 응답객체
 * - Response.json(): 웹 표준 Response클라스,
 *
 *   - Next.js서버가 자신을 호출한 클라이언트에게 JSON형태로 최종 응답을 반환함
 */
export async function POST(request: Request) {
  try {
    const { prompt } = await request.json(); //클라이언트가 보낸 프롬프트를 받음
    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma4:e4b",
        prompt: prompt, // 받은 프롬프트를 올라마에 전달
        stream: false,
      }),
    });
    const data = await response.json(); //Ollama가 넘겨준 HTTP응답에서 실제 JSON결과 데이터 추출
    return Response.json({ result: data.response });
  } catch (error) {
    const e = error as Error;
    return Response.json({ err: e.message }, { status: 500 });
  }
}
