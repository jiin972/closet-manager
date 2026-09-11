"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

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
