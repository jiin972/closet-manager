"use client";

import {
  UserIcon as OutLineUserIcon,
  InboxStackIcon as OutlienInboxStack,
  HomeIcon as OutlineHome,
  SwatchIcon as OutlineSwatch,
} from "@heroicons/react/24/outline";
import {
  HomeIcon,
  InboxStackIcon,
  PlusIcon,
  SwatchIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className=" fixed bottom-0 w-full max-w-3xl mx-auto grid grid-cols-5 justify-items-center py-3 bg-tab-bar *:text-white ">
      <Link href="/home" className="flex flex-col items-center gap-px">
        {pathname === "/home" ? (
          <HomeIcon className="w-6 h-6" />
        ) : (
          <OutlineHome className="w-6 h-6" />
        )}
        <span className="text-xs">홈</span>
      </Link>
      <Link href="/closet" className="flex flex-col items-center gap-px">
        {pathname === "/closet" ? (
          <InboxStackIcon className="w-6 h-6" />
        ) : (
          <OutlienInboxStack className="w-6 h-6" />
        )}
        <span className="text-xs">옷장</span>
      </Link>
      <Link
        href="/add-item"
        className="relative flex flex-col items-center gap-px"
      >
        <div className="absolute -top-4 flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 text-black hover:bg-orange-900 hover:text-white">
          <PlusIcon className="w-6 h-6" />
        </div>
      </Link>
      <Link href="/coordination" className="flex flex-col items-center gap-px">
        {pathname === "/coordination" ? (
          <SwatchIcon className="w-6 h-6" />
        ) : (
          <OutlineSwatch className="w-6 h-6" />
        )}
        <span className="text-xs">코디</span>
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
