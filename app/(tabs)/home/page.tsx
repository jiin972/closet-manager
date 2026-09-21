import WeatherWidget from "@/components/weather_widget";
import Image from "next/image";
import Link from "next/link";
import { getRecentItems } from "./action";

export default async function Home() {
  //최근 추가한 아이템을 생성일 기준으로 내림차순 10개 조회
  const recentItems = await getRecentItems();
  return (
    <div>
      <div className="flex flex-col justify-center gap-2">
        <div>
          <WeatherWidget />
        </div>
        <div className="flex justify-between p-2">
          <h3>최근 추가한 아이템</h3>
          <Link href={"/home/recent/"}>더보기</Link>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-2 px-2">
            {recentItems.map((item) => (
              <Link
                key={item.id}
                href={`/closet/${item.id}`}
                className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border"
              >
                <Image
                  src={item.imageUrl || "/placeholder.webp"}
                  alt={item.category}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
