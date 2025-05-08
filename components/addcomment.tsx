"use client";

import { useOptimistic, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { addComment } from "@/app/tweets/[id]/action";
import Button from "@/components/button";

interface AddCommentProps {
  tweetId: number;
  sessionUserId: number;
}

export default function AddComment({
  tweetId,
  sessionUserId,
}: AddCommentProps) {
  const [commentText, setCommentText] = useState("");

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    { id: number; payload: string }[],
    string
  >([], (prevComments, newComment) => [
    ...prevComments,
    { id: Date.now(), payload: newComment },
  ]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const comment = formData.get("comment")?.toString();
    if (!comment) return;

    addOptimisticComment(comment);
    setCommentText("");

    await addComment(tweetId, sessionUserId, comment);
    router.refresh();
  };

  return (
    <>
      <div className="border-t border-neutral-600 p-4 space-y-2">
        <form action={handleSubmit}>
          <textarea
            name="comment"
            rows={2}
            ref={inputRef}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="...가 떠올랐어요."
            className="w-full resize-none bg-transparent rounded-md border border-neutral-500 px-3 py-2 focus:outline-none text-sm"
          />
          <div className="flex justify-end mt-2">
            <Button text="댓글 등록" />
          </div>
        </form>
      </div>
      <ul className="space-y-3 mt-5">
        {optimisticComments.map((c) => (
          <li key={c.id} className="bg-neutral-800 p-3 rounded-md">
            <div className="text-sm text-gray-400">나</div>{" "}
            <div className="text-white">{c.payload}</div>
            <div className="text-xs text-gray-500">방금 전</div>
          </li>
        ))}
      </ul>
    </>
  );
}
