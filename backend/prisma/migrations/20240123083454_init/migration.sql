/*
  Warnings:

  - You are about to drop the `account_code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bank_master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cheque_book_entry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `function_code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipality_code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cheque_book_entry" DROP CONSTRAINT "cheque_book_entry_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_master" DROP CONSTRAINT "vendor_master_department_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_master" DROP CONSTRAINT "vendor_master_vendor_type_id_fkey";

-- DropTable
DROP TABLE "account_code";

-- DropTable
DROP TABLE "bank_master";

-- DropTable
DROP TABLE "cheque_book_entry";

-- DropTable
DROP TABLE "department";

-- DropTable
DROP TABLE "employee";

-- DropTable
DROP TABLE "function_code";

-- DropTable
DROP TABLE "municipality_code";

-- DropTable
DROP TABLE "vendor_master";

-- DropTable
DROP TABLE "vendor_type";

-- CreateTable
CREATE TABLE "account_codes" (
    "id" SERIAL NOT NULL,
    "major_head" TEXT NOT NULL,
    "minor_head" TEXT NOT NULL,
    "detail_code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "function_codes" (
    "id" SERIAL NOT NULL,
    "group" TEXT NOT NULL,
    "description_code" TEXT NOT NULL,
    "cost_center" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "function_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipality_codes" (
    "id" SERIAL NOT NULL,
    "ulbs" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state_code" TEXT NOT NULL,
    "district_code" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "municipality_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_masters" (
    "id" SERIAL NOT NULL,
    "bank_name" TEXT NOT NULL,
    "ifsc_code" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "micr_code" TEXT NOT NULL,
    "branch_address" TEXT NOT NULL,
    "branch_city" TEXT NOT NULL,
    "branch_state" TEXT NOT NULL,
    "branch_district" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_no" TEXT NOT NULL,
    "contact_person_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bank_masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_masters" (
    "id" SERIAL NOT NULL,
    "vendor_type_id" INTEGER NOT NULL,
    "vendor_no" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile_no" TEXT NOT NULL,
    "comm_address" TEXT NOT NULL,
    "tin_no" TEXT NOT NULL,
    "pan_no" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "ifsc_code" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "office_address" TEXT NOT NULL,
    "gst_no" TEXT NOT NULL,
    "aadhar_no" TEXT NOT NULL,
    "bank_account_no" TEXT NOT NULL,
    "bank_branch_name" TEXT NOT NULL,
    "authorized_date" TIMESTAMP(3),
    "is_authorized" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cheque_book_entries" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_no" TEXT NOT NULL,
    "cheque_no_from" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "bank_branch" TEXT NOT NULL,
    "page_count" TEXT NOT NULL,
    "cheque_no_to" TEXT NOT NULL,
    "issuer_name" TEXT NOT NULL,
    "cheque_book_return" BOOLEAN NOT NULL,
    "cheque_book_return_date" TIMESTAMP(3) NOT NULL,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cheque_book_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vendor_masters" ADD CONSTRAINT "vendor_masters_vendor_type_id_fkey" FOREIGN KEY ("vendor_type_id") REFERENCES "vendor_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_masters" ADD CONSTRAINT "vendor_masters_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_book_entries" ADD CONSTRAINT "cheque_book_entries_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
