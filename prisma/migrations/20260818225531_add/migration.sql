-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imageUrl" TEXT NOT NULL,
    "name" TEXT,
    "category" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "brand" TEXT,
    "price" INTEGER,
    "purpose" TEXT,
    "size" TEXT,
    "purchasedAt" DATETIME,
    "lastWornAt" DATETIME,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
