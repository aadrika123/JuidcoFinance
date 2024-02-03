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
    "tin_no" TEXT NOT NULL,
    "pan_no" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "ifsc_code" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "contact_address" TEXT NOT NULL,
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
    "page_count" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "payment_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminis_wards" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adminis_wards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dir_payment_entries" (
    "id" SERIAL NOT NULL,
    "payment_no" TEXT NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "payment_type_id" INTEGER NOT NULL,
    "payee_name_id" INTEGER NOT NULL,
    "narration" TEXT NOT NULL,
    "grant_id" INTEGER NOT NULL,
    "user_common_budget" BOOLEAN NOT NULL,
    "adminis_ward_id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "payment_mode" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dir_payment_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_payment_entries" (
    "id" SERIAL NOT NULL,
    "bill_no" TEXT NOT NULL,
    "bill_type_id" INTEGER NOT NULL,
    "bill_entry_date" TIMESTAMP(3) NOT NULL,
    "department_id" INTEGER NOT NULL,
    "vendor_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "payee_name_id" INTEGER NOT NULL,
    "adminis_ward_id" INTEGER NOT NULL,
    "bill_amount" DOUBLE PRECISION NOT NULL,
    "advance" DOUBLE PRECISION NOT NULL,
    "deposit" DOUBLE PRECISION NOT NULL,
    "deductions_amount" DOUBLE PRECISION NOT NULL,
    "earlier_payment" DOUBLE PRECISION NOT NULL,
    "payable_amount" DOUBLE PRECISION NOT NULL,
    "net_amount" DOUBLE PRECISION NOT NULL,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_payment_entries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vendor_masters" ADD CONSTRAINT "vendor_masters_vendor_type_id_fkey" FOREIGN KEY ("vendor_type_id") REFERENCES "vendor_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_masters" ADD CONSTRAINT "vendor_masters_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_book_entries" ADD CONSTRAINT "cheque_book_entries_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dir_payment_entries" ADD CONSTRAINT "dir_payment_entries_payment_type_id_fkey" FOREIGN KEY ("payment_type_id") REFERENCES "payment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dir_payment_entries" ADD CONSTRAINT "dir_payment_entries_payee_name_id_fkey" FOREIGN KEY ("payee_name_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dir_payment_entries" ADD CONSTRAINT "dir_payment_entries_grant_id_fkey" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dir_payment_entries" ADD CONSTRAINT "dir_payment_entries_adminis_ward_id_fkey" FOREIGN KEY ("adminis_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dir_payment_entries" ADD CONSTRAINT "dir_payment_entries_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_bill_type_id_fkey" FOREIGN KEY ("bill_type_id") REFERENCES "bill_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_payee_name_id_fkey" FOREIGN KEY ("payee_name_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_adminis_ward_id_fkey" FOREIGN KEY ("adminis_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
