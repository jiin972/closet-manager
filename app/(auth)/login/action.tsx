"use server";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import z, { email, flattenError } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const loginSchema = z
  .object({
    email: z.email("이메일 형식이 아닙니다.").toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH, "5자 이상 입력해야 합니다."),
  })
  // 형식검증 통과 후 실행되는 커스텀 검증 로직
  // - db조회 등 비동기 작업이 필요할 때 zod가 이 콜백함수 형토로 위임함
  // - email, password: 이미 검증을 통과한 값(구조분해로 바로 사용)
  // - ctx: 여기서 문제 발생 시, ctx.addIssue()로 에러를 등록하는 도구
  .superRefine(async ({ email, password }, ctx) => {
    // 입력받은 email로 db내 유저 존재여부 확인
    // 비밀번호 비교(bcrypt.compare())에 필요한 해시값도 함께 조회
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true, //validate후 세션에 저장할 값
        password: true, //입력받은 평문 비밀번호를 bcrypt.compare로 비교하기 위해 db에 저장된 해시값 추출
      },
    });
    if (!user) {
      ctx.addIssue({
        code: "custom",
        message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        path: ["password"], //보안을 위해 path통일
      });
      return z.NEVER;
    }
    //password 일치여부 확인
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      ctx.addIssue({
        code: "custom",
        message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        path: ["password"], //보안을 위해 path통일
      });
    }
  });

/**
 * Login결정 함수
 * - formSchema를 통해, db조회로 user Email 등록여부 확인
 * - 등록되어 있으면, bcrypt로 password비교(salt는 저장된 해시 안에 포함되어 있어 compare가 자동처리)
 */
export default async function LoginState(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  // formdata 파싱
  const result = await loginSchema.safeParseAsync(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return {
      flattenError: flatten.fieldErrors,
      payload: {
        email: data.email, // 보안을 위해 password는 제외
      },
    };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user!.id;
    await session.save();
    redirect("/home");
  }
}
