import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "패스워드는 대소문자와 숫자, 특수문자(#?!@$%^&*-)를 포함해야 합니다.";
