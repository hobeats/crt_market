"use client";

import { uploadTweet } from "@/app/(tabs)/action";
import Button from "./button";
import Input from "./input";
import { useFormState, useFormStatus } from "react-dom";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  return (
    <div className="border-b  border-gray-300 p-4 flex gap-4">
      <form action={action} className="flex-1 space-y-3">
        <textarea
          name="tweet"
          rows={3}
          placeholder="무슨 일이 일어나고 있나요?"
          className="w-full resize-none bg-transparent rounded-md border-dashed focus:ring-0 text-lg placeholder-gray-500"
        />
        {state?.fieldErrors.tweet ? (
          <p className="text-red-500 text-sm">{state.fieldErrors.tweet}</p>
        ) : null}
        <div className="flex justify-end">
          <Button text="등록" />
        </div>
      </form>
    </div>
  );
}
