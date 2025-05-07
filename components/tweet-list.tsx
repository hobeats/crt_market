"use client";

import { useState } from "react";
import { InitialTweets } from "@/app/(tabs)/page";
import ListTweet from "./list-tweet";
import { getMoreTweets } from "@/app/(tabs)/action";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const onNextPageClick = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const newTweets = await getMoreTweets(nextPage);
    if (newTweets.length <= 4) {
      setHasNextPage(false);
    } else {
      setHasNextPage(true);
    }
    setTweets(newTweets.slice(0, 4));
    setPage(nextPage);
    setIsLoading(false);
  };

  const onPrevPageClick = async () => {
    if (page <= 1) return;
    setIsLoading(true);
    const prevPage = page - 1;
    const newTweets = await getMoreTweets(prevPage);
    setTweets(newTweets.slice(0, 4));
    setPage(prevPage);
    setHasNextPage(true);
    setIsLoading(false);
  };

  return (
    <div className="p-5 flex flex-col gap-8">
      <div className="text-center text-sm text-gray-500 mt-2">
        현재 페이지: {page}
      </div>
      {tweets.slice(0, 4).map((tweet) => (
        <ListTweet
          key={tweet.id}
          tweet={tweet.tweet ?? ""}
          create_at={tweet.create_at}
          id={tweet.id}
        />
      ))}

      <div className="fixed bottom-[75px] left-0 w-full py-4  flex gap-2 justify-center">
        {page === 1 ? (
          <button
            onClick={onPrevPageClick}
            disabled
            className="bg-gray-500  px-5 py-2.5 rounded-md text-white font-semibold"
          >
            이전
          </button>
        ) : (
          <button
            onClick={onPrevPageClick}
            disabled={isLoading}
            className="bg-orange-500  px-5 py-2.5 rounded-md text-white font-semibold"
          >
            이전
          </button>
        )}
        {hasNextPage && (
          <button
            onClick={onNextPageClick}
            disabled={isLoading}
            className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          >
            {isLoading ? "로딩 중" : "다음"}
          </button>
        )}
      </div>
    </div>
  );
}
