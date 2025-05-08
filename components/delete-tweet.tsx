"use client";

import { deleteTweetAction } from "@/app/tweets/[id]/action";

export default function DeleteButton({ tweetId }: { tweetId: number }) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const ok = confirm("정말 삭제하시겠습니까?");
    if (!ok) {
      e.preventDefault(); // 제출 막기
    }
  };

  return (
    <form action={deleteTweetAction} onSubmit={onSubmit}>
      <input type="hidden" name="tweetId" value={tweetId} />
      <button
        type="submit"
        className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold"
      >
        삭제하기
      </button>
    </form>
  );
}
