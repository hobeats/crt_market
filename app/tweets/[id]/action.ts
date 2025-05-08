"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function likePost(tweetId: number, userId: number) {
  try {
    await db.like.create({
      data: {
        tweetId,
        userId,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function dislikePost(tweetId: number, userId: number) {
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}

export async function addComment(
  tweetId: number,
  userId: number,
  comment: string
) {
  if (!comment || comment.length < 1) return;
  await db.comment.create({
    data: {
      tweetId,
      userId,
      payload: comment,
    },
  });
}

export async function deleteTweetAction(formData: FormData) {
  const id = Number(formData.get("tweetId"));
  if (!id || isNaN(id)) return;

  await db.tweet.delete({
    where: { id },
  });

  redirect("/");
}

export async function deleteCommentAction(formData: FormData) {
  const id = Number(formData.get("commentId"));
  if (!id || isNaN(id)) return;

  await db.comment.delete({
    where: { id },
  });
}
