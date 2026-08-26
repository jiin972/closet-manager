"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import z from "zod";
import fs from "fs/promises";

const itemSchema = z.object({
  category: z.string().min(1, "카테고리를 선택해 주세요."),
  season: z.string().min(1, "계절을 선택해 주세요."),
  color: z.string().optional(),
  purpose: z.string().optional(),
  brand: z.string().optional(),
  photo: z.string().min(1, "사진은 필수입니다."),
});

export async function createItem(prevState: any, formData: FormData) {
  //formData값 추출
  const data = {
    category: formData.get("category"),
    season: formData.get("season"),
    color: formData.get("color") || undefined,
    purpose: formData.get("purpose") || undefined, //빈 문자열이면 undefined처리
    brand: formData.get("brand") || undefined,
    photo: formData.get("photo"),
  };
  /**
   * 서버안에서 파일저장 처리
   * - arrayBuffer()로 이미지를 순수 이진 데이터로 변환
   * - Buffer.from()로 Node.js전용 Buffer로 포맷으로 포장
   * - fs.writeFile()로 지정경로에 파일로 저장
   */
  if (data.photo instanceof File && data.photo.size > 0) {
    const photoData = await data.photo.arrayBuffer(); // 컴퓨터가 읽을 수 있는 순수 이진 데이터 변환
    const uniqueFilename = `${Date.now()}_${data.photo.name}`; //파일명 중복 방지(타임스탬프 추가)
    await fs.writeFile(
      `./public/upload/${uniqueFilename}`,
      Buffer.from(photoData), //Node.js 파일시스템(fs)이 파일로 쓸수 있게 Node전용 버퍼 포맷으로 포장
    );
    data.photo = `/upload/${uniqueFilename}`; //db에 들어갈 경로 문자열 저장
  } else {
    data.photo = "";
  }

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
        color: result?.data.color,
        purpose: result?.data?.purpose,
        brand: result?.data?.brand,
        userId: session!.id,
        imageUrl: result.data.photo,
      },
    });
    redirect("/closet");
  }
}
