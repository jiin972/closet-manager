"use client";

import { updateItem } from "@/app/(tabs)/closet/[id]/action";
import { startTransition, useOptimistic } from "react";
import ColorPicker from "./color_picker";
import FormSelect from "./form_select";
import OllamaBtn from "./ai_button";

export interface InitItemProps {
  category: string;
  purpose?: string;
  color?: string;
  rating?: number;
}

/**
 * 아이템 상세정보를 낙관적 업데이트 해주는 함수
 * - 리듀서: 기존상태 + 새 값(Update)를 병합 (Partial로 일부 필드만 넘김)
 * - transition훅 안에서 반드시 실행되어야 하기에 startTransition을 사용함
 */

export default function ItemDetail({
  itemId,
  initItem,
}: {
  itemId: string;
  initItem: InitItemProps;
}) {
  /**
   * 기본사용법
   * - const [현재보여줄값, 업데이트요청함수] = useOptimistic(진짜상태, 리듀서함수)
   */
  const [optimisticState, setOptimisticState] = useOptimistic(
    initItem,
    (state, update: Partial<InitItemProps>) => ({ ...state, ...update }),
  );
  const handleRatingClick = (star: number) => {
    startTransition(async () => {
      setOptimisticState({ rating: star });
      await updateItem(itemId, { rating: star });
    });
  };
  const handlePurposeClick = (purpose: string) => {
    startTransition(async () => {
      setOptimisticState({ purpose });
      await updateItem(itemId, { purpose });
    });
  };
  const handleCategoryClick = (category: string) => {
    startTransition(async () => {
      setOptimisticState({ category });
      await updateItem(itemId, { category });
    });
  };
  const handleColorClick = (color: string) => {
    startTransition(async () => {
      setOptimisticState({ color });
      await updateItem(itemId, { color });
    });
  };

  return (
    <div className="flex flex-col gap-4 border-none">
      <div className="flex items-center gap-4">
        <div className="w-20 shrink-0 text-sm text-gray-500">나의 평가</div>
        <div className="flex flex-1 gap-1 justify-end">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
            >
              {star <= (optimisticState.rating ?? 0) ? "★" : "☆"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-20 shrink-0 text-sm text-gray-500">TPO</div>
        <FormSelect
          name="purpose"
          options={[
            { value: "", label: "선택 안 함 (선택사항)" },
            { value: "daily", label: "데일리/일상" },
            { value: "office", label: "출근/오피스" },
            { value: "date", label: "데이트/모임" },
            { value: "formal", label: "경조사/격식" },
            { value: "sports", label: "운동/아웃도어" },
            { value: "travel", label: "여행/휴가" },
            { value: "home", label: "홈웨어/이지웨어" },
          ]}
          defaultValue={optimisticState.purpose}
          /*select는 onChange로 값 변경 */
          /*이때, e.target.value로 값변경 -> select에서 새 값을 이벤트객체에서 꺼내는 표준방법 */
          onChange={(e) => handlePurposeClick(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-20 shrink-0 text-sm text-gray-500">카테고리</div>
        <FormSelect
          name="category"
          options={[
            { value: "top", label: "상의" },
            { value: "bottom", label: "하의" },
            { value: "outer", label: "아우터" },
            { value: "shoes", label: "신발" },
            { value: "accessory", label: "액세서리" },
          ]}
          defaultValue={optimisticState.category}
          onChange={(e) => handleCategoryClick(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-20 shrink-0 text-sm text-gray-500">색상</div>
        <ColorPicker
          name="color"
          options={[
            { value: "black", label: "검정", hex: "#000000" },
            { value: "white", label: "흰색", hex: "#FFFFFF" },
            { value: "gray", label: "회색", hex: "#9CA3AF" },
            { value: "beige", label: "베이지", hex: "#D4C4A8" },
            { value: "brown", label: "브라운", hex: "#78350F" },
            { value: "navy", label: "네이비", hex: "#1E3A5F" },
            { value: "red", label: "빨강", hex: "#DC2626" },
          ]}
          defaultValue={optimisticState.color}
          onChange={(value) => handleColorClick(value)}
        />
      </div>
      <OllamaBtn itemId={itemId} />
    </div>
  );
}
