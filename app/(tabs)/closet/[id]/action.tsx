"use server";

import { callOllama } from "@/app/actions/call_ollama";
import { PROMPT_FOR_DETAIL_PAGE } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";

/**
 * DB의 아이템 상세정보를 업데이트해주는 함수
 * - 세션 기반 사용자 권한 확인
 * - 데이터 업데이트 후 성공여부 반영
 *
 * @param itemId
 * @param rating
 */
export async function updateItem(
  itemId: string,
  data: Partial<{
    rating: number;
    purpose: string;
    category: string;
    color: string;
  }>,
) {
  const session = await getSession();
  const item = await db.item.findUnique({
    where: {
      id: itemId,
    },
    select: {
      userId: true,
    },
  });
  if (!item || item.userId !== session.id) {
    return {
      success: false,
      error: "권한이 없습니다.",
    };
  }
  const updatedItem = await db.item.update({
    where: {
      id: itemId,
    },
    data,
  });
  return {
    success: true,
    data: updatedItem,
  };
}

/**
 * db조회 및 프롬프트(ai전달)조립 함수 생성
 * - db조회 전 보안을 위해 session 체크
 * - item이 null일 가능성을 고려해 체크
 * - 상세 페이지의 내 의상과 내 옷장의 의상을 매칭
 *
 * -- 프롬프트는 상수 변수에 담아서 전달 받음
 * @param itemId - URL 동적 부분에서 추출한 id
 */
export async function recommendOutfit(itemId: string) {
  const session = await getSession(); //로그인 확인
  const item = await db.item.findUnique({
    where: {
      id: itemId, //상세page URL의 id
    },
  });
  if (!item) {
    return { success: false, error: "아이템을 찾을 수 없습니다." }; //item이 null일 가능성 고려
  }
  //내 옷장 전체 조회(매칭후보)
  const closet = await db.item.findMany({
    where: {
      userId: session.id, //로그인한 유저가 소유한 모든 옷 조회
      id: { not: itemId }, //지금 보고 있는 아이템은 제외
    },
    select: {
      id: true,
      category: true,
      season: true,
      purpose: true,
      color: true,
    },
  });
  const prompt = PROMPT_FOR_DETAIL_PAGE(item, closet); //프롬프트 조립(상수함수 재사용)
  const resultText = await callOllama(prompt); //ollama호출, data return

  //반환된 텍스트 가공(코드블럭 등 제거)
  const cleanText = resultText
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  let recommendation; //try 블록 밖에서 결과 사용을 위해 let으로 먼저 빈 변수를 선언함
  try {
    recommendation = JSON.parse(cleanText); //비동기 작업이 아니므로 await 불필요, object로 반환
  } catch {
    return { success: false, error: "AI 응답을 처리하지 못했습니다." }; //메시지만 반환할 경우 에러객체(e)생략 가능
  }

  //추천 받은 id들로 실제 아이템(이미지 포함) 재조회

  // 객체의 value에서 유효한 값(falsy제외)만 추려 문자열 배열로 생성함언( ids는 top,bottom등의 id를 가짐)
  // 이때, as string[]은 타입단언
  const ids = Object.values(recommendation).filter(Boolean) as string[];

  // 추천 의상 이미지 표현을 위해 db재조회
  const recommendedItems = await db.item.findMany({
    where: { id: { in: ids } }, //배열안에 ids가 있는 아이템을 전부 찾음
  });
  return { success: true, items: recommendedItems };
}
