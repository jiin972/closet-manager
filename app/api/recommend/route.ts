import { callOllama } from "@/app/actions/call_ollama";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { NextResponse } from "next/server";

/**
 * [API 엔드포인트: POST /api/recommend]
 * - 클라이언트(버튼)에서 전달받은 요청(prompt)과 DB의 옷장 데이터(items)를 결합하여
 *   callOllama 유틸 함수를 통해 Ollama LLM에 전달하고, 최종 코디 추천 결과를 반환하는 중계소 함수.
 *
 *   - 브라우저(클라이언트)는 서버 내부의 자바스크립트를 직접 실행 불가
 *   - 브라우저를 통해 서버에 작업을 지시하려면 HTTP 요청을 통해서 전달되어야 함.
 *
 * @param request 클라이언트가 보낸 HTTP 요청 객체 (JSON body: { prompt })
 * @returns NextResponse.json({ result }) Ollama가 생성한 코디 추천 결과를 클라이언트에 반환
 */
export async function POST(request: Request) {
  try {
    const { prompt } = await request.json(); //클라이언트가 보낸 요청 받기
    //db조회 시 select로 토큰 다이어트
    const session = await getSession();
    const items = await db.item.findMany({
      where: {
        userId: session.id,
      },
      select: {
        id: true,
        category: true,
        season: true,
        color: true,
        purpose: true,
      },
    });
    if (items.length === 0) {
      return NextResponse.json(
        { err: "등록된 옷이 없습니다." },
        { status: 400 },
      );
    }

    //버튼(button)에서 온 prompt + DB옷장 데이터를 하나의 최종 프롬프트로 완성
    const finalPrompt = `
      너는 패션 코디네이터야.
      아래 [내 옷장 목록]에서만 조합해서 [요청사항]에 맞는 코디를 추천해줘.

      [요청사항]: ${prompt}

      [내 옷장 목록]:
      ${JSON.stringify(items, null, 2)}

      [응답 규칙]:
      1. 인사말, 부연 설명, 이유 등 불필요한 텍스트는 전부 빼고 추천할 옷 목록만 출력할 것.
      2. 예시 출력 형식:
      - 상의: [category / color]
      - 하의: [category / color]
      - 아우터: [category / color]
      - 신발: [category / color]
      3. 해당되는 카테고리가 옷장에 없다면 생략할 것.
      `;

    const resultText = await callOllama(finalPrompt); //직접 fetch대신 callOllama를 통해 finalPrompt를 넘겨 LLM과 통신수행을 요청함

    return NextResponse.json({ result: resultText });
  } catch (error) {
    const e = error as Error;
    return NextResponse.json({ err: e.message }, { status: 500 }); // 클라이언트에 결과 전달
  }
}
