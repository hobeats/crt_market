"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z.string().min(1, { message: "한 글자 이상 입력해주세요" }),
});

export async function getMoreTweets(page: number) {
  const products = await db.tweet.findMany({
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
    skip: (page - 1) * 4,
    take: 5,
    orderBy: {
      create_at: "desc",
    },
  });
  return products;
}

export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });
      redirect(`/`);
    }
  }
}
