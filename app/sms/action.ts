"use server";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
  phone?: string;
  error?: z.typeToFlattenedError<string, string>;
}

export async function smsLogin(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const phone = formData.get("phone")?.toString();
  const token = formData.get("token");
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        phone, // 입력값 유지
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
        phone, // 다음 단계에서도 유지
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        phone: prevState.phone, // 유지
        error: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
}
