/*
  Warnings:

  - You are about to drop the column `type` on the `bill_types` table. All the data in the column will be lost.
  - Added the required column `name` to the `bill_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bill_types" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL;
