/*
  Warnings:

  - Added the required column `timeZone` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "joined_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "public"."UserAchievement" ALTER COLUMN "unlocked_at" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "public"."Visit" ADD COLUMN     "timeZone" TEXT NOT NULL,
ALTER COLUMN "visited_at" SET DATA TYPE TIMESTAMPTZ;
