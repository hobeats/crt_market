import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import MyTweet from "./action";
import { formatToTimeAgo } from "@/lib/utils";

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
  const myTweet = await MyTweet(user.id);

  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white">
      <div className="w-full max-w-md rounded-lg overflow-hidden mb-8">
        <div className="flex flex-col items-center py-8 px-6 border-b border-zinc-800">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-500 text-white text-3xl font-bold mb-4 relative overflow-hidden">
            {user?.avatar !== null ? (
              <Image
                src={user.avatar}
                alt={user.username}
                fill
                className="object-cover"
              />
            ) : (
              <UserIcon className="w-12 h-12" />
            )}
          </div>
          <h2 className="text-2xl font-bold">안녕하세요 {user?.username}님</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="p-4 bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">
                사용자명
              </div>
              <div className="font-medium">{user?.username}</div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">
                이메일
              </div>
              <div className="font-medium">{user?.email}</div>
            </div>
            <div className="p-4 bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">Bio</div>
              <div className="font-medium">{user.bio}</div>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={`user/${user.username}/edit`}
        className="block w-full max-w-md px-4 mb-4"
      >
        <button className="primary-btn h-10 w-full">프로필 수정</button>
      </Link>
      <form action={logOut} className="w-full max-w-md px-4">
        <button className="primary-btn h-10">로그아웃</button>
      </form>
      <div className="py-5">내 트윗</div>
      {myTweet.map((t) => (
        <Link
          className="text-white my-3 last:mb-40"
          href={`/tweets/${t.id}`}
          key={t.id}
        >
          {typeof t.tweet === "string" && t.tweet.length > 100 ? (
            <div>
              {t.tweet?.slice(0, 100)}
              <span className="text-neutral-500"> ... 더보기</span>
            </div>
          ) : (
            <div>{t.tweet}</div>
          )}
          <span className="text-xs text-gray-500">
            {formatToTimeAgo(t.create_at.toString())}
          </span>
        </Link>
      ))}
    </div>
  );
}
