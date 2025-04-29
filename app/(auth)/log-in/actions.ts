"use server";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this emial does not exist."),
  password: z.string({
    required_error: "비밀번호를 입력하세요",
  }),
  //.min(PASSWORD_MIN_LENGTH, { message: "비밀번호는 4글자 이상입니다"})
  //.regex(/\d/, "비밀번호는 숫자를 하나 이상 포함해야합니다.")
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error?.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong Password."],
          email: [],
        },
      };
    }
  }
}
