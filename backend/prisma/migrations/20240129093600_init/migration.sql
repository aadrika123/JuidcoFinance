/*
  Warnings:

  - You are about to drop the column `comm_address` on the `vendor_masters` table. All the data in the column will be lost.
  - You are about to drop the column `office_address` on the `vendor_masters` table. All the data in the column will be lost.
  - Added the required column `contact_address` to the `vendor_masters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendor_masters" DROP COLUMN "comm_address",
DROP COLUMN "office_address",
ADD COLUMN     "contact_address" TEXT NOT NULL;
