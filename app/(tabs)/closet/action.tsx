import db from "@/lib/db";
import getSession from "@/lib/session";

export async function getItems() {
  const session = await getSession();

  const items = await db.item.findMany({
    where: {
      userId: session.id,
    },
  });
  return items;
}

export async function getUser() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      email: true,
    },
  });
  return user;
}
