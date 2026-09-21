"use server";

import { callOllama } from "@/app/actions/call_ollama";
import { getWeather } from "@/app/actions/get_weather";
import { PROMPT_FOR_WEATHER } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";

/**날씨 정보를 기반으로 LLM을 활용한 의상추천 함수
 * - getSession()으로 권한 조회 및 db조회
 * - getWeather()으로 현재 lat/lon의 날씨정보를 fetch
 * - 날씨 정보를 기반으로 db조회를 통한 최종 prompt를 /action/call_ollama.ts 전달
 * @param latitude
 * @param longitude
 */

export async function recommendByWeather(latitude: number, longitude: number) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "로그인이 필요합니다." }; // 비정상적인 접근 차단, 또는 notFound()
  }
  const weather = await getWeather(latitude, longitude);
  if (!weather) {
    return { success: false, error: "날씨 정보를 가져오지 못했습니다." }; //weather data가 null일경우 방어 코드
  }
  const items = await db.item.findMany({
    where: {
      userId: session.id,
    },
    select: {
      id: true,
      category: true,
      season: true,
      purpose: true,
      color: true,
    },
  });
  const prompt = PROMPT_FOR_WEATHER(items, weather); // 프롬프트 조립
  const resultText = await callOllama(prompt); //ollama 호출

  //반환된 텍스트 가공
  const cleanText = resultText
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  let recommendation; // try블록 밖에서 결과 사용을 위해 let으로 빈 변수 선언

  try {
    recommendation = JSON.parse(cleanText);
  } catch {
    return { success: false, error: "AI 응답을 처리하지 못했습니다." };
  }

  // 추천 받은 id들로 실제 아이템(이미지 포함)재조회 과정

  // 1. 객체의 value에서 유효한 값(falsy제외)만 추려 문자열 배열로 생성함언( ids는 top,bottom등의 id를 가짐)
  // 이때, as string[]은 타입단언
  const ids = Object.values(recommendation).filter(Boolean) as string[];
  // 2. 추천 의상 이미지 표현을 위해 db 재조회
  const recommendedItems = await db.item.findMany({
    where: { id: { in: ids } },
  });
  return { success: true, items: recommendedItems };
}

export type Weather = Awaited<ReturnType<typeof getWeather>>; //실제 함수의 리턴타입을 그대로 export
export type WeatherPromptItem = Awaited<
  ReturnType<
    typeof db.item.findMany<{
      select: {
        id: true;
        category: true;
        season: true;
        purpose: true;
        color: true;
      };
    }>
  >
>[number];

/**홈 화면에 표시할 최근 추가된 아이템 단순조회 목적의 함수
 * - 서버 session을 검증해 로그인된 사용자 정보를 가져옴
 * - 해당 사용자의 옷장 아이템만 필터링
 * - 생성일(createdAt)기준 내림차순(desc)정렬
 *
 */
export async function getRecentItems(skip: number = 0) {
  const session = await getSession();
  return db.item.findMany({
    where: {
      userId: session.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip, // pagination에서 사용
    take: 10, // 딱 10개만 가져옴
  });
}
/**타입 export
 * - ReturnType<typeof getRecentItems> → Promise<Item[]>
 * - Awaited<...> → Item[] (Promise 벗겨냄)
 * - [number] → 배열 안의 "요소 하나"의 타입만 추출
 */
export type RecentItem = Awaited<ReturnType<typeof getRecentItems>>[number];
