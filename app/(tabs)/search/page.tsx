"use client";
import Button from "@/components/button";
import SearchTweet from "./action";
import Link from "next/link";
import { useActionState } from "react";
import { formatToTimeAgo } from "@/lib/utils";

export default function Search() {
  const [state, action] = useActionState(SearchTweet, null);
  return (
    <div className="border-b  border-gray-300 p-4 flex gap-4">
      <form action={action} className="flex-1 space-y-3">
        <textarea
          name="tweet"
          rows={1}
          placeholder="검색"
          className="w-full resize-none bg-transparent rounded-md border-dashed focus:ring-0 text-lg placeholder-gray-500"
        />
        {state?.fieldErrors?.tweet ? (
          <p className="text-red-500 text-sm">{state.fieldErrors.tweet}</p>
        ) : null}
        <div className="flex justify-end">
          <Button text="검색" />
        </div>
        {state?.tweets?.map((t) => (
          <div className="flex gap-5 py-3">
            <Link className="text-white" href={`/tweets/${t.id}`} key={t.id}>
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
          </div>
        ))}
      </form>
    </div>
  );
}
