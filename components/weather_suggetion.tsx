"use client";

import {
  RecommendBWeather,
  recommendByWeather,
} from "@/app/(tabs)/home/action";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IPosition {
  latitude: number;
  longitude: number;
}

const CATEGORIES = ["top", "bottom", "outer", "shoes"];

/**
 * client에서 얻은 좌표정보를 기반으로 날씨 맞춤 의상추천을 해주는 컴포넌트
 * - 3가지 상태 관리: isLoading(로딩 여부), coords(위치 좌표), result(추천 결과)
 * - 마운트 시 useEffect(의존성 배열 빈 배열)로 좌표를 1회만 획득
 * - 획득한 좌표로 버튼 클릭 시 recommendByWeather() 호출 → 내부에서 callOllama()로 LLM 추천 요청
 * - 결과는 top/bottom/outer/shoes 4칸 고정 레이아웃으로 표시 (없는 카테고리는 빈 칸)
 */

export default function WeatherSuggetion() {
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState<IPosition | null>(null); //1. null발생 가능 지점점
  const [result, setResult] = useState<RecommendBWeather | null>(null); //recommendByWeather가 리턴한 data를 화면에 그리기 위함
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setCoords({ latitude, longitude });
    });
  }, []); //빈 배열, 마운트 시 1번만 실행,
  const handleClick = async () => {
    // null 방어코드
    if (!coords) {
      return;
    } //2. 진입 시점에서 null발생 시 즉시 종료 - number타입에 null 배정 불가
    setIsLoading(true);
    const response = await recommendByWeather(
      coords.latitude,
      coords.longitude,
    );
    setResult(response);
    setIsLoading(false); //초기화
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="w-full bg-orange-900 rounded-lg text-white py-3 font-semibold disabled:bg-gray-400 transition-colors"
      >
        {isLoading ? "의상 추천 중.." : "AI 코디 추천"}
      </button>
      {result?.items && (
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((category) => {
            const item = result.items.find((i) => i.category === category);
            return (
              <div key={category} className="relative w-24 h-24">
                {item ? (
                  <Image
                    src={item.imageUrl || "/placeholder.webp"}
                    alt={item.category}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-neutral-400">
                    {category}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {result?.success === false && (
        <p className="text-sm text-red-500">{result?.error}</p>
      )}
    </div>
  );
}
