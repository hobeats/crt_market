import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

interface ListTweetProps {
  tweet: string;
  create_at: Date;
  id: number;
}

export default function ListTweet({ tweet, create_at, id }: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">
          {tweet.length > 100 ? tweet.slice(0, 100) + "... 더보기" : tweet}
        </span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(create_at.toString())}
        </span>
      </div>
    </Link>
  );
}
