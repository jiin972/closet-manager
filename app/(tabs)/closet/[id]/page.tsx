import ItemDetail from "@/components/item-detail";
import db from "@/lib/db";
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
    <div>
      <h1 className="mb-5">상품상세정보</h1>
      <ItemDetail
        itemId={id}
        initItem={{
          rating: item.rating ?? 0,
          purpose: item.purpose ?? undefined,
          category: item.category,
          color: item.color,
        }}
      />
    </div>
  );
}
