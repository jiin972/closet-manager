import ItemDetail from "@/components/item-detail";
import db from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // url동적 부분에서([id])추출
  const { id } = await params;
  const item = await db.item.findUnique({
    where: {
      id,
    },
  });
  if (!item) return notFound();
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold">상품상세정보</h1>
      <div className="relative w-full h-80 rounded-2xl bg-slate-100 p-4 border border-slate-200 ">
        <Image
          src={item.imageUrl || "/placeholder.webp"}
          alt={item.category || "준비중"}
          fill
          className="object-contain p-2"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>
      <ItemDetail
        itemId={id}
        initItem={{
          rating: item.rating ?? 0,
          purpose: item.purpose ?? undefined,
          category: item.category,
          color: item.color ?? undefined,
        }}
      />
    </div>
  );
}
