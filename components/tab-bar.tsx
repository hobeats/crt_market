"use client";
import {
  MagnifyingGlassIcon as SolidMagnify,
  HomeIcon as SolidHomeIcon,
  UserIcon as SolidUser,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon as OutlineMagnify,
  HomeIcon as OutlineHomeIcon,
  UserIcon as OutlineUser,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full mx-auto max-w-screen-md grid grid-cols-3 bg-neutral-900 border-neutral-600 border-t px-5 py-3 *:text-white">
      <Link className="flex flex-col items-center gap-px" href="/">
        {pathname === "/" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        홈
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/search">
        {pathname === "/search" ? (
          <SolidMagnify className="w-7 h-7" />
        ) : (
          <OutlineMagnify className="w-7 h-7" />
        )}
        검색
      </Link>
      <Link className="flex flex-col items-center gap-px" href="/user">
        {pathname === "/user" ? (
          <SolidUser className="w-7 h-7" />
        ) : (
          <OutlineUser className="w-7 h-7" />
        )}
        프로필
      </Link>
    </div>
  );
}
