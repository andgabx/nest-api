-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('VACCINE', 'DEWORMING', 'CONSULTATION', 'EXAM', 'SURGERY', 'OTHER');

-- CreateTable
CREATE TABLE "health_records" (
    "id" SERIAL NOT NULL,
    "type" "RecordType" NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "nextDueDate" TIMESTAMP(3),
    "notes" TEXT,
    "doctor" TEXT,
    "clinic" TEXT,
    "petId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "health_records_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "health_records" ADD CONSTRAINT "health_records_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
