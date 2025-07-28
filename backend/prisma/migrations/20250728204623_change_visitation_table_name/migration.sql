/*
  Warnings:

  - You are about to drop the `Visitation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visitation" DROP CONSTRAINT "Visitation_pizzeriaId_fkey";

-- DropForeignKey
ALTER TABLE "Visitation" DROP CONSTRAINT "Visitation_userId_fkey";

-- DropTable
DROP TABLE "Visitation";

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pizzeriaId" INTEGER NOT NULL,
    "rating" INTEGER,
    "description" TEXT,
    "visitedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visit_userId_pizzeriaId_key" ON "Visit"("userId", "pizzeriaId");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_pizzeriaId_fkey" FOREIGN KEY ("pizzeriaId") REFERENCES "Pizzeria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
