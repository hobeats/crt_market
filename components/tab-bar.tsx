"use client";
import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewsIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChat,
  VideoCameraIcon as SolidVideo,
  UserIcon as SolidUser,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewsIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChat,
  VideoCameraIcon as OutlineVideo,
  UserIcon as OutlineUser,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white">
      <Link className="flex flex-col items-center gap-px" href="/">
        {pathname === "/" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        홈
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/life">
        {pathname === "/life" ? (
          <SolidNewsIcon className="w-7 h-7" />
        ) : (
          <OutlineNewsIcon className="w-7 h-7" />
        )}
        동네생활
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/chat">
        {pathname === "/chat" ? (
          <SolidChat className="w-7 h-7" />
        ) : (
          <OutlineChat className="w-7 h-7" />
        )}
        채팅
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/live">
        {pathname === "/live" ? (
          <SolidVideo className="w-7 h-7" />
        ) : (
          <OutlineVideo className="w-7 h-7" />
        )}
        쇼핑
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/profile">
        {pathname === "/profile" ? (
          <SolidUser className="w-7 h-7" />
        ) : (
          <OutlineUser className="w-7 h-7" />
        )}
        나의 당근
      </Link>
    </div>
  );
}
