"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OLHeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/tweets/[id]/action";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
  sessionUserId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
  sessionUserId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );

  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(tweetId, sessionUserId);
    } else {
      await likePost(tweetId, sessionUserId);
    }
  };

  return (
    <button onClick={onClick} className="flex items-center gap-2">
      {state.isLiked ? (
        <HeartIcon className="size-5 text-orange-500" />
      ) : (
        <OLHeartIcon className="size-5" />
      )}
      <span>{state.likeCount}</span>
    </button>
  );
}
