"use server";

import { z } from "zod";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password?: string;
  confirm_password?: string;
}) => {
  if (!password && !confirm_password) return true;
  return password === confirm_password;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .trim()
      .toLowerCase(),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .optional()
      .refine((val) => !val || PASSWORD_REGEX.test(val), {
        message: PASSWORD_REGEX_ERROR,
      }),
    confirm_password: z.string().optional(),
    bio: z.string().optional(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    if (user && user.id !== session.id) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 이름입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    if (user && user.id !== session.id) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용 중인 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "패스워드가 동일하지 않습니다!",
    path: ["confirm_password"],
  });

export async function editAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
    confirm_password: formData.get("confirm_password") || undefined,
    bio: formData.get("bio"),
  };
  const id = (await getSession()).id;
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const updateData: any = {
      username: result.data.username,
      email: result.data.email,
      bio: result.data.bio,
    };

    if (result.data.password) {
      updateData.password = await bcrypt.hash(result.data.password, 12);
    }

    const user = await db.user.update({
      where: { id },
      data: updateData,
    });

    redirect("/user");
  }
}
