import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeButton from "@/components/like-button";
import AddComment from "@/components/addcomment";
import CommentList from "@/components/list-comment";
import DeleteButton from "@/components/delete-tweet";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
}

async function getTweet(id: number) {
  try {
    const tweet = await db.tweet.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            Comment: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

const getCachedTweet = unstable_cache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

export default async function tweetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }
  const session = await getSession();
  const isOwner = await getIsOwner(tweet.userId);
  const { likeCount, isLiked } = await getLikeStatus(id, session.id!);
  return (
    <div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">
          {tweet.user.avatar !== null ? (
            <Image
              src={tweet.user.avatar}
              width={40}
              height={40}
              alt={tweet.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="flex gap-5 justify-between">
          <h3>{tweet.user.username}</h3>
          <div>
            <div className="text-sm">
              {formatToTimeAgo(tweet.create_at.toString())}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p>{tweet.tweet}</p>
      </div>
      <div className="flex p-5 -mt-8 text-sm items-center justify-between">
        <div className="flex gap-3 items-center">
          <EyeIcon className="size-5" /> {tweet.views}
        </div>
        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          tweetId={id}
          sessionUserId={session.id!}
        />
      </div>
      <AddComment tweetId={id} sessionUserId={session.id!} />
      <CommentList tweetId={id} />
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-center items-center">
        {isOwner ? <DeleteButton tweetId={id} /> : null}
      </div>
    </div>
  );
}
