"use server";

import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "../../lib/constants";

// Update the form schema
const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine((email) => email.endsWith("@zod.com"), {
      message: "Email은 zod.com만 허용됩니다.",
    }),
  
  username: z
    .string()
    .min(5, { message: "Usesrname은 5글자 이상입니다." }),

  password: z
    .string({
      required_error: "비밀번호를 입력하세요",
    })
    .min(10, { message: "비밀번호는 10글자 이상입니다"})
    .regex(/\d/, "비밀번호는 숫자를 하나 이상 포함해야합니다.")
});

export async function logIn(prevState: any, formData: FormData): Promise<{ success: boolean; fieldErrors: Record<string, string[]> }> {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return { ...result.error.flatten(), success: false };
  } else {
    console.log(result.data);
    return { success: true, fieldErrors: {} };
  }
}
