//prisma client 인스턴스 생성
/**db랑 대화하는 통로 역할 */

import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!, //undefined를 허용하면 안됨
});

const db = new PrismaClient({ adapter });

export default db;
