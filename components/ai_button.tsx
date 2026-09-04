"use client";

import { recommendOutfit } from "@/app/(tabs)/closet/[id]/action";
import Image from "next/image";
import { useState } from "react";

interface RecommendedItem {
  id: string;
  category: string;
  imageUrl?: string | null;
  color?: string | null;
}
/**
 ** "AI 코디 추천" 버튼
 * - recommendOutfit(itemId) 서버 액션을 직접 호출하여
 *   현재 아이템과 어울리는 옷을 추천받고, 결과 이미지를 카드로 렌더링함
 * @param itemId
 */
export default function OllamaBtn({ itemId }: { itemId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedItems, setRecommendedItems] = useState<RecommendedItem[]>(
    [],
  );
  const handleOllamaBtnClick = async () => {
    try {
      setIsLoading(true);
      //route.ts 대신 recommentOutfit()함수 import
      const result = await recommendOutfit(itemId);
      if (!result.success || !result.items) {
        alert(result.error || "추천 아이템을 불러오지 못했습니다.");
        return;
      }
      console.log("추천결과:", result.items);
      setRecommendedItems(result.items);
    } catch (e) {
      console.log("요청중 에러발생:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleOllamaBtnClick}
        disabled={isLoading}
        className="w-full bg-orange-900 rounded-lg text-white py-3 font-semibold disabled:bg-gray-400 transition-colors"
      >
        {isLoading ? "의상 추천 중.." : "AI 코디 추천"}
      </button>
      {recommendedItems.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {recommendedItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-32 bg-gray-50">
                <Image
                  src={item.imageUrl || "/placeholder.webp"}
                  alt={item.category}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width:768px)50vw, 200px"
                />
              </div>
              <div className="p-2 text-center text-xs text-gray-500">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
