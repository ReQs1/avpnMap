-- CreateTable
CREATE TABLE "Visitation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pizzeriaId" INTEGER NOT NULL,
    "rating" INTEGER,
    "description" TEXT,
    "visitedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitation_userId_pizzeriaId_key" ON "Visitation"("userId", "pizzeriaId");

-- AddForeignKey
ALTER TABLE "Visitation" ADD CONSTRAINT "Visitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitation" ADD CONSTRAINT "Visitation_pizzeriaId_fkey" FOREIGN KEY ("pizzeriaId") REFERENCES "Pizzeria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
