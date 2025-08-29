-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "rank_id" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "public"."ranks" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "ranks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ranks_code_key" ON "public"."ranks"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ranks_name_key" ON "public"."ranks"("name");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_rank_id_fkey" FOREIGN KEY ("rank_id") REFERENCES "public"."ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
