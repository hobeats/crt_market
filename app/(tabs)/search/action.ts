"use server";

import db from "@/lib/db";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z.string().min(1, { message: "한 글자 이상 입력해주세요" }),
});

export default async function SearchTweet(prevState: any, formData: FormData) {
  const tweet = formData.get("tweet");

  const result = tweetSchema.safeParse({ tweet });

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const findTweet = await db.tweet.findMany({
    select: {
      tweet: true,
      create_at: true,
      id: true,
    },
    where: {
      tweet: { contains: result.data.tweet },
    },
    orderBy: {
      create_at: "desc",
    },
  });
  console.log(findTweet);
  return { tweets: findTweet };
}
