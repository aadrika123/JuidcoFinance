/*
  Warnings:

  - You are about to drop the column `is_authorised` on the `bill_invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bill_invoices" DROP COLUMN "is_authorised",
ADD COLUMN     "is_authorized" BOOLEAN NOT NULL DEFAULT false;
