import { formatToTimeAgo } from "@/lib/utils";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  create_at: Date;
  views: number;
  comment: number;
  like: number;
  id: number;
}

export default function ListTweet({
  tweet,
  create_at,
  comment,
  like,
  views,
  id,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-1 pb-3 mb-3  w-full *:text-white">
        <span className="text-lg">
          {tweet.length > 100 ? (
            <div>
              {tweet.slice(0, 100)}
              <span className="text-neutral-500"> ... 더보기</span>
            </div>
          ) : (
            tweet
          )}
        </span>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-4 items-center">
            <span className="text-neutral-500">
              {formatToTimeAgo(create_at.toString())}
            </span>
            <span>조회 {views}</span>
          </div>
          <div className="flex gap-4 items-center *:flex *:gap-4 *:items-center">
            <span>
              <HeartIcon className="size-4" />
              {like}
            </span>
            <span>
              <ChatBubbleBottomCenterIcon className="size-4" />
              {comment}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
