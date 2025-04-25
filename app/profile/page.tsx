import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  // 사용자 이름의 첫 글자를 가져와서 아바타에 표시
  const getInitial = (name: string) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white">

      <div className="w-full max-w-md rounded-lg overflow-hidden mb-8">
        <div className="flex flex-col items-center py-8 px-6 border-b border-zinc-800">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-500 text-white text-3xl font-bold mb-4">
            {getInitial(user?.username)}
          </div>
          <h2 className="text-2xl font-bold">안녕하세요 {user?.username}님</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="p-4 bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">사용자명</div>
              <div className="font-medium">{user?.username}</div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">이메일</div>
              <div className="font-medium">{user?.email}</div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">가입일</div>
              <div className="font-medium">
                {user?.create_at ? new Date(user.create_at).toLocaleDateString('ko-KR') : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link href="/" className="block w-full max-w-md px-4 mb-4">
        <button className="primary-btn h-10 w-full">
          내 제품 페이지
        </button>
      </Link>
      <form action={logOut} className="w-full max-w-md px-4">
        <button className="primary-btn h-10">
          로그아웃
        </button>
      </form>
    </div>
  );
}