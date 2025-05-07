"use client";

import { editAccount } from "@/app/(tabs)/user/[username]/edit/action";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useActionState } from "react";
import Input from "./input";
import Button from "./button";
import Link from "next/link";

export default function EditUserForm({ user }: { user: any }) {
  const [state, action] = useActionState(editAccount, null);
  const inputStyle =
    "w-full bg-transparent text-white placeholder-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 text-sm";

  return (
    <div className="flex flex-col items-center min-h-screen text-white">
      <div className="w-full max-w-md rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <form
            action={action}
            className="space-y-4 flex flex-col items-center justify-center pb-40"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-orange-500 text-white text-3xl font-bold mb-4 relative overflow-hidden">
              {user?.avatar !== null ? (
                <Image
                  src={user?.avatar || ""}
                  alt={user?.username}
                  fill
                  className="object-cover"
                />
              ) : (
                <UserIcon className="w-12 h-12" />
              )}
            </div>
            <div className="p-4 w-full bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">
                사용자명
              </div>
              <Input
                name="username"
                defaultValue={user?.username || ""}
                required
                className={inputStyle}
                errors={state?.fieldErrors.username}
              />
            </div>
            <div className="p-4 w-full bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">
                이메일
              </div>
              <Input
                name="email"
                type="email"
                defaultValue={user?.email || ""}
                required
                className={inputStyle}
                errors={state?.fieldErrors.email}
              />
            </div>
            <div className="p-4 w-full bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">
                패스워드
              </div>
              <Input
                name="password"
                type="password"
                placeholder="새 비밀번호 입력"
                className={inputStyle}
                errors={state?.fieldErrors.password}
              />
            </div>
            <div className="p-4 w-full bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">
                패스워드 확인
              </div>
              <Input
                name="confirm_password"
                type="password"
                placeholder="비밀번호 확인"
                className={inputStyle}
                errors={state?.fieldErrors.confirm_password}
              />
            </div>
            <div className="p-4 w-full bg-zinc-800 rounded-md">
              <div className="text-sm font-medium text-gray-400 mb-1">Bio</div>
              <textarea
                name="bio"
                rows={3}
                defaultValue={user?.bio || ""}
                className={inputStyle}
              />
            </div>

            <Button text="변경" />
            <Link
              href={"/user"}
              className="w-full bg-neutral-400 text-center font-medium rounded-md h-10 flex items-center justify-center text-white"
            >
              뒤로가기
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
