"use server";
import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const products = await db.tweet.findMany({
    select: {
      tweet: true,
      create_at: true,
      id: true,
    },
    skip: (page - 1) * 5,
    take: 6,
    orderBy: {
      create_at: "desc",
    },
  });
  return products;
}
