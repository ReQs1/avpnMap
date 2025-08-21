-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "joined_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "public"."UserAchievement" ALTER COLUMN "unlocked_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "public"."Visit" ALTER COLUMN "visited_at" SET DATA TYPE DATE;
