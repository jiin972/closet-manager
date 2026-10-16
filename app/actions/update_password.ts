"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function UpdatePassWord(prevState: any, formData: FormData) {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });
  // 기존 비밀번호 확인로직
  //bcrypt.compare의 두번째 인자는 반드시 문자열이 이어야 타입에러가 없음
  // user가 null일 경우, undefined가 되기 때문에 미리 방어코드 적용
  if (!user) {
    return { error: "사용자를 찾을 수 없습니다." };
  }
  const currentPw = formData.get("currentPassword") as string;
  const isValid = await bcrypt.compare(currentPw, user.password);
  if (!isValid) {
    return { error: "현재 비밀번호가 올바르지 않습니다." };
  }
  //새로운 비밀번호 업데이트 로직
  const newPw = formData.get("newPassword") as string;
  const confirmNewPw = formData.get("confirmPassword") as string;
  if (newPw === confirmNewPw) {
    const hashedPassword = await bcrypt.hash(newPw, 12);
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  } else {
    return { error: "새 비밀번호가 일치하지 않습니다." };
  }
  revalidatePath("/profile");
  return { success: true };
}
