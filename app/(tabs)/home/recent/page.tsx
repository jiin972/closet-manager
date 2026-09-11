import RecentItemsClient from "@/components/recent_item";
import { getRecentItems } from "../action";

export default async function RecentItemsPage() {
  const initialItems = await getRecentItems(0); //skip의 초기값은 0, 첫번째 데이터를 불러옴
  return (
    <div>
      <h1 className="p-2 font-semibold">최근 추가한 아이템</h1>
      <RecentItemsClient initialItems={initialItems} />
    </div>
  );
}
