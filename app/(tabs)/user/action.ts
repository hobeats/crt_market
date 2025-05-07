"use server";

import db from "@/lib/db";

export default async function MyTweet(id: number) {
  const myTweet = await db.tweet.findMany({
    select: {
      tweet: true,
      create_at: true,
      id: true,
    },
    where: {
      user: {
        id,
      },
    },
    orderBy: {
      create_at: "desc",
    },
  });
  return myTweet;
}
