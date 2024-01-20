-- CreateTable
CREATE TABLE "account_code" (
    "id" SERIAL NOT NULL,
    "major_head" TEXT NOT NULL,
    "minor_head" TEXT NOT NULL,
    "detail_code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "function_code" (
    "id" SERIAL NOT NULL,
    "group" TEXT NOT NULL,
    "description_code" TEXT NOT NULL,
    "cost_center" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "function_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "municipality_code" (
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

    CONSTRAINT "municipality_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_master" (
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

    CONSTRAINT "bank_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_master" (
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

    CONSTRAINT "vendor_master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cheque_book_entry" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_no" TEXT NOT NULL,
    "cheque_no_from" TEXT NOT NULL,
    "employee_name" TEXT NOT NULL,
    "bank_branch" TEXT NOT NULL,
    "page_count" TEXT NOT NULL,
    "cheque_no_to" TEXT NOT NULL,
    "issuer_name" TEXT NOT NULL,
    "cheque_book_return" BOOLEAN NOT NULL,
    "cheque_book_return_date" TIMESTAMP(3) NOT NULL,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cheque_book_entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vendor_master" ADD CONSTRAINT "vendor_master_vendor_type_id_fkey" FOREIGN KEY ("vendor_type_id") REFERENCES "vendor_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_master" ADD CONSTRAINT "vendor_master_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
