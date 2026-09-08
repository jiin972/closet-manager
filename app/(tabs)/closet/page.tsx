import Link from "next/link";
import { getItems, getUser } from "./action";
import Image from "next/image";
import { CATEGORY_LABELS } from "@/lib/constants";

export default async function Closet() {
  const items = await getItems();
  /*
   *카테고리 별 분류방법
   * - filter method: ex) const top = items.filter((item)=> item.category ==="top");
   * - reduce 사용(추천): 배열을 순회하며 카테고리별 그룹 객체로 한번에 재구성함
   * -- 목적: category별(기준 key)로 gropus를 생성, 각 카테고리 별 아이템을 분류 push
   */
  const groupedItems = items.reduce(
    (groups, item) => {
      const category = item.category;
      if (!groups[category]) {
        groups[category] = []; //카테고리가 없을 경우 빈 배열을 새로 만들어서 객체 보관(초기화)
      }
      groups[category].push(item); // 실제 배열로 아이템 추가
      return groups; // 누적값 반환(필)
    },
    {} as Record<string, typeof items>, // reduce함수 초기값(빈 객) 및 타입 명시
    // as Record<string, typeof..> 결과 객체의 타입을 명확히 지정하는 타입스크립트 문법
  );
  const user = await getUser();
  return (
    <div className=" flex flex-col gap-2">
      <h1>{`${user?.email}님의 아이템`}</h1>
      {/*reduce함수로 카테고리별 그룹화한 함수 렌더링 */}
      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <div key={category}>
          {/*카테고리 라벨링 */}
          <h2>{CATEGORY_LABELS[category] ?? category}</h2>{" "}
          <div className="grid grid-cols-2 gap-2 p-2">
            {categoryItems.map((item) => (
              <Link
                key={item.id}
                href={`/closet/${item.id}`}
                className="h-30 flex flex-col items-center border border-gray-300 rounded-lg overflow-hidden p-1"
              >
                {/*이미지 전용 영역 */}
                <div className="relative w-full h-20">
                  <Image
                    src={item.imageUrl || "/placeholder.webp"}
                    alt={item.category || "준비중"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
                {/*이미지 외 영역 */}
                <div className="flex flex-col text-xs w-full items-center">
                  <div className="truncate w-full text-center">
                    {item.brand}
                  </div>
                  <div className="truncate w-full text-center">
                    {item.createdAt.toLocaleDateString("ko-KR")}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
