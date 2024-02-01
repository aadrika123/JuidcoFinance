/*
  Warnings:

  - You are about to drop the `voucher_sub_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "voucher_entries" DROP CONSTRAINT "voucher_entries_voucher_sub_id_fkey";

-- DropTable
DROP TABLE "voucher_sub_type";

-- CreateTable
CREATE TABLE "voucher_sub_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voucher_sub_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "voucher_entries" ADD CONSTRAINT "voucher_entries_voucher_sub_id_fkey" FOREIGN KEY ("voucher_sub_id") REFERENCES "voucher_sub_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
