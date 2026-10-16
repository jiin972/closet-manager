"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateNickName(formData: FormData) {
  const session = await getSession();
  const name = formData.get("name") as string;
  //null 등을 방지하기 위한 값체크
  if (typeof name !== "string" || name.trim().length === 0) {
    return;
  }
  await db.user.update({
    where: {
      id: session.id,
    },
    data: {
      name,
    },
  });
  revalidatePath("/profile");
}

export async function getUserProfile() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });
  return user;
}

export async function logOut() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
