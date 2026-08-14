"use server";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

//FormSchema생성
const formSchema = z
  .object({
    email: z.email("이메일 형식이 아닙니다.").toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH, "5자 이상으로 입력합니다."),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "5자 이상으로 입력합니다."),
  })
  .superRefine(async ({ email, password, confirm_password }, ctx) => {
    const emailExists = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
    if (emailExists) {
      //ctx.addIssue는 에러를 등록하는 동작
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이메일입니다.",
        path: ["email"],
      });
      return z.NEVER; //이메일이 존재할 경우 다음 검증 막음
    }
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirm_password"],
      });
    }
  });

/**
 * 계정생성함수
 * 1. formData 파싱,
 * 2. zod유효성 검증(형식+이메일 중복)
 * 3. 비밀번호 해싱(bcrypt)
 * 4. user 생성(db.user.create)
 * 5. 세션 생성 + 쿠키 저장
 */
export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return {
      flattenError: flatten.fieldErrors,
      payload: {
        //보안을 위해 비밀번호는 반환값에서 제외
        email: data.email,
      },
    };
  } else {
    //zod검증 성공 했을 경우, 비밀번호 해싱(promise타입)
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    //User DB등록
    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true, //세션(쿠키)구울 때, id만 반환 받음(속도향상)
      },
    });
    const session = await getSession();
    //add to data in Session from Prisma(data=id)
    session.id = user.id; // session객체에 user의 데이터 기록(쿠키, 미전달)
    await session.save(); // 암호화+ 쿠키로 브라우저에 전달

    redirect("/");
  }
}
