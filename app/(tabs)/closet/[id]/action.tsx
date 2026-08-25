"use server";

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
