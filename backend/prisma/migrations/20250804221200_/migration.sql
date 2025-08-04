/*
  Warnings:

  - You are about to drop the column `userId` on the `Visit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,pizzeria_id]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Visit" DROP CONSTRAINT "Visit_userId_fkey";

-- DropIndex
DROP INDEX "public"."Visit_userId_pizzeria_id_key";

-- AlterTable
ALTER TABLE "public"."Visit" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Visit_user_id_pizzeria_id_key" ON "public"."Visit"("user_id", "pizzeria_id");

-- AddForeignKey
ALTER TABLE "public"."Visit" ADD CONSTRAINT "Visit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
