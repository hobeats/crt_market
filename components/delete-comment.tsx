"use client";

import { startTransition, useTransition } from "react";
import { deleteCommentAction } from "@/app/tweets/[id]/action";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface PageProps {
  commentId: number;
}

export default function DeleteCommentButton({ commentId }: PageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (formData: FormData) => {
    await deleteCommentAction(formData); // 이게 끝나야 다음 줄 실행됨
    startTransition(() => {
      router.refresh(); // 서버 액션 끝나고 refresh
    });
  };

  return (
    <form action={handleDelete}>
      <input type="hidden" name="commentId" value={commentId} />
      <button type="submit" disabled={isPending}>
        <XMarkIcon className="size-4" />
      </button>
    </form>
  );
}
