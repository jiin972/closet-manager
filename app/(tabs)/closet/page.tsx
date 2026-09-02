import Link from "next/link";
import { getItems, getUser } from "./action";
import Image from "next/image";

export default async function Closet() {
  const items = await getItems();
  const user = await getUser();
  return (
    <div className=" flex flex-col gap-2">
      <h1>{`${user?.email}님의 아이템`}</h1>
      <div className="p-2 grid grid-cols-2 gap-2">
        {items.map((item) => (
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
              <div className="truncate w-full text-center">{item.brand}</div>
              <div className="truncate w-full text-center">
                {item.createdAt.toLocaleDateString("ko-KR")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
