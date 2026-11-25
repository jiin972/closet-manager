"use client";

import { deleteItem } from "@/app/(tabs)/closet/[id]/action";

/**
 ** "아이템" 삭제 버튼
 * - deleteItem(itemId) 서버 액션을 직접 호출하여
 * - confirm으로 한번 더 확인 후 삭제, 성공 시 서버에서 redirect하므로 결과는 실패할 때만 돌아옴
 * - redirect가 에러는 던지는 방식이라, try/catch로 감싸지 않음
 * @param itemId
 */
export default function DeleteItemBtn({ itemId }: { itemId: string }) {
  const handleDeleteBtnClick = async () => {
    // 얼리 리턴: confirm은 true/false 반환, 취소(false)면 여기서 종료
    if (!window.confirm("이 아이템을 삭제하시겠습니까?")) return;
    // 결과를 변수에 담아야 아래에서 실패 여부 확인 가능함
    const result = await deleteItem(itemId);
    if (!result.success) {
      alert(result.error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleDeleteBtnClick}
      className="w-full bg-gray-500 rounded-lg text-white py-3 font-semibold hover:bg-gray-400 transition-colors"
    >
      삭제
    </button>
  );
}
