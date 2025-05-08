import AddTweet from "@/components/addtweet";
import Input from "@/components/input";
import ProductList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      create_at: true,
      views: true,
      id: true,
      _count: {
        select: {
          Comment: true,
          Like: true,
        },
      },
    },
    take: 4,
    orderBy: {
      create_at: "desc",
    },
  });
  return tweets;
}

export const metadata = {
  title: "Tweets",
};

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets();
  return (
    <div>
      <AddTweet />
      <ProductList initialTweets={initialTweets} />
    </div>
  );
}
