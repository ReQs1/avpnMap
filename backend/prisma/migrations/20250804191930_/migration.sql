/*
  Warnings:

  - You are about to drop the column `pizzeriaId` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `visitedAt` on the `Visit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,pizzeria_id]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pizzeria_id` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visited_at` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Visit" DROP CONSTRAINT "Visit_pizzeriaId_fkey";

-- DropIndex
DROP INDEX "public"."Visit_userId_pizzeriaId_key";

-- AlterTable
ALTER TABLE "public"."Visit" DROP COLUMN "pizzeriaId",
DROP COLUMN "visitedAt",
ADD COLUMN     "pizzeria_id" INTEGER NOT NULL,
ADD COLUMN     "visited_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."Achievement" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserAchievement" (
    "user_id" INTEGER NOT NULL,
    "achievement_id" INTEGER NOT NULL,
    "unlocked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("user_id","achievement_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_code_key" ON "public"."Achievement"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Visit_userId_pizzeria_id_key" ON "public"."Visit"("userId", "pizzeria_id");

-- AddForeignKey
ALTER TABLE "public"."Visit" ADD CONSTRAINT "Visit_pizzeria_id_fkey" FOREIGN KEY ("pizzeria_id") REFERENCES "public"."Pizzeria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAchievement" ADD CONSTRAINT "UserAchievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAchievement" ADD CONSTRAINT "UserAchievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "public"."Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
