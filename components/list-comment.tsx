import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import DeleteCommentButton from "./delete-comment";
import getSession from "@/lib/session";

export default async function CommentList({ tweetId }: { tweetId: number }) {
  const comments = await db.comment.findMany({
    where: { tweetId },
    include: {
      user: { select: { username: true } },
    },
    orderBy: { create_at: "desc" },
  });
  const session = await getSession();

  return (
    <ul className="space-y-3 mt-5 max-h-[480px] overflow-y-auto">
      {comments.map((c) => (
        <li key={c.id} className="bg-neutral-800 p-3 rounded-md">
          <div className="text-sm flex justify-between text-gray-400">
            {c.user.username}{" "}
            {c.userId === session.id ? (
              <DeleteCommentButton commentId={c.id} />
            ) : null}
          </div>
          <div className="text-white">{c.payload}</div>
          <div className="text-xs text-gray-500">
            {formatToTimeAgo(c.create_at.toString())}
          </div>
        </li>
      ))}
    </ul>
  );
}
