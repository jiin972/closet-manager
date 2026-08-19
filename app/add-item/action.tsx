"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import z from "zod";

const itemSchema = z.object({
  category: z.string().min(1, "카테고리를 선택해 주세요."),
  season: z.string().min(1, "계절을 선택해 주세요."),
  color: z.string().min(1, "색상을 선택해 주세요."),
  purpose: z.string().optional(),
});

export async function createItem(prevState: any, formData: FormData) {
  //formData값 추출
  const data = {
    category: formData.get("category"),
    season: formData.get("season"),
    color: formData.get("color"),
    purpose: formData.get("purpose") || undefined, //빈 문자열이면 undefined처리
  };
  //data유효성 검사
  const result = itemSchema.safeParse(data);
  if (!result.success) {
    const flatten = z.flattenError(result.error);
    return {
      flattenError: flatten.fieldErrors,
    };
  } else {
    const session = await getSession();
    const item = await db.item.create({
      data: {
        category: result.data.category,
        season: result.data.season,
        color: result.data.color,
        purpose: result?.data?.purpose,
        userId: session.id,
        imageUrl: "temp",
      },
    });
    redirect("/closet");
  }
}
