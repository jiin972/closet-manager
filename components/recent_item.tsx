"use client";

import { getRecentItems, RecentItem } from "@/app/(tabs)/home/action";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RecentItemsClient({
  initialItems,
}: {
  initialItems: RecentItem[];
}) {
  const [items, setItems] = useState<RecentItem[]>(initialItems); //지금까지 불러온 전체 목록관리
  const [skip, setSkip] = useState(initialItems.length); //건너뛸 아이템 개수(초기값: 초기 data개수)
  const [isLoading, setIsLoading] = useState(false); //로딩 상태 관리, 중복요청 방지
  const [hasMore, setHasMore] = useState(true); //더 가져올 데이트 유무 관리, 불필요한 무한로딩 방지
  const trigger = useRef<HTMLSpanElement>(null); //스크롤 하단 감지용 ref(span태그 연결)

  // 새 상품 추가 시 목록 갱신
  // 전체 아이템 목록 = 서버 Data + 추가 load Data
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        const element = entries[0];
        //콜백 시점의 상태 확인
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current); //감시 중단(중복요청 방지)
          setIsLoading(true);
          const newItems = await getRecentItems(skip);
          if (newItems.length !== 0) {
            setItems((prev) => [...prev, ...newItems]); // 요청결과를 화면에 반영
            setSkip((prev) => prev + newItems.length); // 다음번 요청을 위해 커서(위치)를 미리 이동, 실제 받은 갯수를 기준으로 함
          } else {
            setHasMore(false);
          }
          setIsLoading(false);
        }
      },
      { threshold: 1, rootMargin: "0px 0px -100px 0px" }, //observe 옵션
    );

    //실행코드
    if (trigger.current) {
      observer.observe(trigger.current); //entries[0], observe시작
    }
    return () => {
      observer.disconnect(); //cleanUp, observe중단
    };
  }, [skip]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 p-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/closet/${item.id}`}
            className="relative w-full h-32 overflow-hidden border rounded-lg"
          >
            <Image
              src={item.imageUrl || "/placeholder.webp"}
              alt={item.category}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 50vw, 200px"
            />
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className=" flex p-2 justify-center">
          <span
            ref={trigger} // current 요소
            className=" text-white text-sm font-semibold bg-orange-900 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
          >
            {isLoading ? "로딩 중" : "더보기"}
          </span>
        </div>
      )}
    </div>
  );
}
