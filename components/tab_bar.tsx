"use client";

import {
  UserIcon,
  CalendarDaysIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import {
  UserIcon as OutLineUserIcon,
  CalendarDaysIcon as OutlineCalrendar,
  HomeIcon as OutlineHome,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full max-w-3xl mx-auto grid grid-cols-3 justify-items-center py-3 bg-tab-bar *:text-white ">
      <Link href="/home" className="flex flex-col items-center gap-px">
        {pathname === "/home" ? (
          <HomeIcon className="w-6 h-6" />
        ) : (
          <OutlineHome className="w-6 h-6" />
        )}
        <span className="text-xs">홈</span>
      </Link>
      <Link href="/diary" className="flex flex-col items-center gap-px">
        {pathname === "/diary" ? (
          <CalendarDaysIcon className="w-6 h-6" />
        ) : (
          <OutlineCalrendar className="w-6 h-6" />
        )}
        <span className="text-xs">다이어리</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <UserIcon className="w-6 h-6" />
        ) : (
          <OutLineUserIcon className="w-6 h-6" />
        )}
        <span className="text-xs">프로필</span>
      </Link>
    </div>
  );
}
