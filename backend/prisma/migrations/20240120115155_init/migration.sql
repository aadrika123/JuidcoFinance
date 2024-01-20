-- DropForeignKey
ALTER TABLE "cheque_book_entry" DROP CONSTRAINT "cheque_book_entry_employee_id_fkey";

-- AlterTable
ALTER TABLE "cheque_book_entry" ALTER COLUMN "employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cheque_book_entry" ADD CONSTRAINT "cheque_book_entry_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
