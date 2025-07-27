-- CreateTable
CREATE TABLE "Pizzeria" (
    "id" SERIAL NOT NULL,
    "member_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "nation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" INTEGER NOT NULL,
    "lng" INTEGER NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "Pizzeria_pkey" PRIMARY KEY ("id")
);
