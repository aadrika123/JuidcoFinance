/*
  Warnings:

  - You are about to drop the column `employee_name` on the `cheque_book_entry` table. All the data in the column will be lost.
  - Added the required column `employee_id` to the `cheque_book_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cheque_book_entry" DROP COLUMN "employee_name",
ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cheque_book_entry" ADD CONSTRAINT "cheque_book_entry_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
