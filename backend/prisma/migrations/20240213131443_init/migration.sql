-- CreateTable
CREATE TABLE "account_codes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
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
    "designation" TEXT NOT NULL,
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
    "subledger_id" INTEGER NOT NULL,
    "payment_mode" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dir_payment_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
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
    "vendor_id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "payee_id" INTEGER NOT NULL,
    "adminis_ward_id" INTEGER NOT NULL,
    "bill_amount" DOUBLE PRECISION NOT NULL,
    "advance" DOUBLE PRECISION NOT NULL,
    "deposit" DOUBLE PRECISION NOT NULL,
    "deductions_amount" DOUBLE PRECISION NOT NULL,
    "earlier_payment" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "payable_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "net_amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_payment_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voucher_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher_sub_types" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voucher_sub_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher_entries" (
    "id" SERIAL NOT NULL,
    "voucher_no" TEXT NOT NULL,
    "voucher_date" TIMESTAMP(3) NOT NULL,
    "voucher_type_id" INTEGER NOT NULL,
    "narration" TEXT NOT NULL,
    "department_id" INTEGER NOT NULL,
    "adminis_ward_id" INTEGER NOT NULL,
    "voucher_sub_id" INTEGER NOT NULL,
    "sub_ledger_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dr_cr" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voucher_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receipt_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subledgers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subledgers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt_entries" (
    "id" SERIAL NOT NULL,
    "receipt_no" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paid_by" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "module_id" INTEGER NOT NULL,
    "receipt_type_id" INTEGER NOT NULL,
    "mobile_no" TEXT NOT NULL,
    "admin_ward_id" INTEGER NOT NULL,
    "narration" TEXT NOT NULL,
    "subledger_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receipt_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_stages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_invoices" (
    "id" SERIAL NOT NULL,
    "bill_no" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "bill_date" TIMESTAMP(3) NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "stage_id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "narration" TEXT NOT NULL,
    "admin_ward_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "is_authorized" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cheque_issuances" (
    "id" SERIAL NOT NULL,
    "voucher_no" INTEGER NOT NULL,
    "voucher_date" TIMESTAMP(3) NOT NULL,
    "bill_type_id" INTEGER NOT NULL,
    "narration" TEXT NOT NULL,
    "admin_ward_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "payee_id" INTEGER NOT NULL,
    "grant_id" INTEGER NOT NULL,
    "bank_id" INTEGER NOT NULL,
    "module_id" INTEGER NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "cheque_no" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cheque_issuances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_names" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_names_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_years" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "financial_years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt_budgets" (
    "id" SERIAL NOT NULL,
    "fin_year_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "primary_acc_code_id" INTEGER NOT NULL,
    "admin_ward_id" INTEGER NOT NULL,
    "budget_type_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receipt_budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_appropriations" (
    "id" SERIAL NOT NULL,
    "fin_year_id" INTEGER NOT NULL,
    "primary_acc_code_id" INTEGER NOT NULL,
    "remark" TEXT NOT NULL,
    "from_primary_acc_code_id" INTEGER NOT NULL,
    "approved_amount" INTEGER NOT NULL,
    "transfer_amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_appropriations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_reappropriations" (
    "id" SERIAL NOT NULL,
    "fin_year_id" INTEGER NOT NULL,
    "primary_acc_code_id" INTEGER NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "budget_name_id" INTEGER NOT NULL,
    "actual_amount" DOUBLE PRECISION NOT NULL,
    "from_primary_acc_code_id" INTEGER NOT NULL,
    "approved_amount" INTEGER NOT NULL,
    "balance_amount" INTEGER NOT NULL,
    "transfer_amount" DOUBLE PRECISION NOT NULL,
    "remark" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_reappropriations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opening_balances" (
    "id" SERIAL NOT NULL,
    "fin_year_id" INTEGER NOT NULL,
    "dr_cr" TEXT NOT NULL,
    "primary_acc_code_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opening_balances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revised_budgets" (
    "id" SERIAL NOT NULL,
    "primary_acc_code_id" INTEGER NOT NULL,
    "approved_amount" INTEGER NOT NULL,
    "revised_amount" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revised_budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investment_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investments" (
    "id" SERIAL NOT NULL,
    "ulb_id" INTEGER NOT NULL,
    "primary_acc_code_id" INTEGER NOT NULL,
    "investment_no" TEXT NOT NULL,
    "authorization_date" TIMESTAMP(3) NOT NULL,
    "investment_date" TIMESTAMP(3) NOT NULL,
    "particulars" TEXT NOT NULL,
    "investment_type_id" INTEGER NOT NULL,
    "purchase_amount" DOUBLE PRECISION NOT NULL,
    "face_value_amount" DOUBLE PRECISION NOT NULL,
    "interest_due_date" TIMESTAMP(3) NOT NULL,
    "interest_due_amount" DOUBLE PRECISION NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "interest_recovered_amount" DOUBLE PRECISION NOT NULL,
    "interest_recovery_date" TIMESTAMP(3) NOT NULL,
    "acc_adj_recovery_date" TIMESTAMP(3) NOT NULL,
    "realization_final_amount" DOUBLE PRECISION NOT NULL,
    "realization_date" TIMESTAMP(3) NOT NULL,
    "acc_adj_realization_date" TIMESTAMP(3) NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grant_entries" (
    "id" SERIAL NOT NULL,
    "ulb_id" INTEGER NOT NULL,
    "primary_acc_code_id" INTEGER NOT NULL,
    "grant_id" INTEGER NOT NULL,
    "sanction_number" TEXT NOT NULL,
    "grant_nature_id" INTEGER NOT NULL,
    "grant_from_date" TIMESTAMP(3) NOT NULL,
    "grant_to_date" TIMESTAMP(3) NOT NULL,
    "sanctioned_amount" DOUBLE PRECISION NOT NULL,
    "advance_rcving_date" TIMESTAMP(3) NOT NULL,
    "advance_amount" DOUBLE PRECISION NOT NULL,
    "expenditure_date" TIMESTAMP(3) NOT NULL,
    "voucher_id" INTEGER NOT NULL,
    "expndtre_nature_id" INTEGER NOT NULL,
    "blnce_trckng_id" INTEGER NOT NULL,
    "refund_date" TIMESTAMP(3) NOT NULL,
    "refund_amount" DOUBLE PRECISION NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "signature" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grant_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grant_natures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grant_natures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenditure_natures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenditure_natures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balance_trackings" (
    "id" SERIAL NOT NULL,
    "primary_acc_code_id" INTEGER NOT NULL,
    "balance_amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "balance_trackings_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "dir_payment_entries" ADD CONSTRAINT "dir_payment_entries_subledger_id_fkey" FOREIGN KEY ("subledger_id") REFERENCES "subledgers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_bill_type_id_fkey" FOREIGN KEY ("bill_type_id") REFERENCES "bill_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_masters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_payee_id_fkey" FOREIGN KEY ("payee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_payment_entries" ADD CONSTRAINT "bill_payment_entries_adminis_ward_id_fkey" FOREIGN KEY ("adminis_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_entries" ADD CONSTRAINT "voucher_entries_voucher_type_id_fkey" FOREIGN KEY ("voucher_type_id") REFERENCES "voucher_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_entries" ADD CONSTRAINT "voucher_entries_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_entries" ADD CONSTRAINT "voucher_entries_adminis_ward_id_fkey" FOREIGN KEY ("adminis_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_entries" ADD CONSTRAINT "voucher_entries_voucher_sub_id_fkey" FOREIGN KEY ("voucher_sub_id") REFERENCES "voucher_sub_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher_entries" ADD CONSTRAINT "voucher_entries_sub_ledger_id_fkey" FOREIGN KEY ("sub_ledger_id") REFERENCES "subledgers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_entries" ADD CONSTRAINT "receipt_entries_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_entries" ADD CONSTRAINT "receipt_entries_receipt_type_id_fkey" FOREIGN KEY ("receipt_type_id") REFERENCES "receipt_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_entries" ADD CONSTRAINT "receipt_entries_admin_ward_id_fkey" FOREIGN KEY ("admin_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_entries" ADD CONSTRAINT "receipt_entries_subledger_id_fkey" FOREIGN KEY ("subledger_id") REFERENCES "subledgers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_invoices" ADD CONSTRAINT "bill_invoices_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "bill_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_invoices" ADD CONSTRAINT "bill_invoices_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_masters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_invoices" ADD CONSTRAINT "bill_invoices_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_invoices" ADD CONSTRAINT "bill_invoices_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "bill_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_invoices" ADD CONSTRAINT "bill_invoices_admin_ward_id_fkey" FOREIGN KEY ("admin_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_issuances" ADD CONSTRAINT "cheque_issuances_bill_type_id_fkey" FOREIGN KEY ("bill_type_id") REFERENCES "bill_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_issuances" ADD CONSTRAINT "cheque_issuances_admin_ward_id_fkey" FOREIGN KEY ("admin_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_issuances" ADD CONSTRAINT "cheque_issuances_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_issuances" ADD CONSTRAINT "cheque_issuances_payee_id_fkey" FOREIGN KEY ("payee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_issuances" ADD CONSTRAINT "cheque_issuances_grant_id_fkey" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_issuances" ADD CONSTRAINT "cheque_issuances_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cheque_issuances" ADD CONSTRAINT "cheque_issuances_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_budgets" ADD CONSTRAINT "receipt_budgets_fin_year_id_fkey" FOREIGN KEY ("fin_year_id") REFERENCES "financial_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_budgets" ADD CONSTRAINT "receipt_budgets_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_budgets" ADD CONSTRAINT "receipt_budgets_primary_acc_code_id_fkey" FOREIGN KEY ("primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_budgets" ADD CONSTRAINT "receipt_budgets_admin_ward_id_fkey" FOREIGN KEY ("admin_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_budgets" ADD CONSTRAINT "receipt_budgets_budget_type_id_fkey" FOREIGN KEY ("budget_type_id") REFERENCES "budget_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_appropriations" ADD CONSTRAINT "budget_appropriations_fin_year_id_fkey" FOREIGN KEY ("fin_year_id") REFERENCES "financial_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_appropriations" ADD CONSTRAINT "budget_appropriations_primary_acc_code_id_fkey" FOREIGN KEY ("primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_appropriations" ADD CONSTRAINT "budget_appropriations_from_primary_acc_code_id_fkey" FOREIGN KEY ("from_primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_reappropriations" ADD CONSTRAINT "budget_reappropriations_fin_year_id_fkey" FOREIGN KEY ("fin_year_id") REFERENCES "financial_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_reappropriations" ADD CONSTRAINT "budget_reappropriations_primary_acc_code_id_fkey" FOREIGN KEY ("primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_reappropriations" ADD CONSTRAINT "budget_reappropriations_budget_name_id_fkey" FOREIGN KEY ("budget_name_id") REFERENCES "budget_names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_reappropriations" ADD CONSTRAINT "budget_reappropriations_from_primary_acc_code_id_fkey" FOREIGN KEY ("from_primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opening_balances" ADD CONSTRAINT "opening_balances_fin_year_id_fkey" FOREIGN KEY ("fin_year_id") REFERENCES "financial_years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opening_balances" ADD CONSTRAINT "opening_balances_primary_acc_code_id_fkey" FOREIGN KEY ("primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revised_budgets" ADD CONSTRAINT "revised_budgets_primary_acc_code_id_fkey" FOREIGN KEY ("primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_ulb_id_fkey" FOREIGN KEY ("ulb_id") REFERENCES "municipality_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_primary_acc_code_id_fkey" FOREIGN KEY ("primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_investment_type_id_fkey" FOREIGN KEY ("investment_type_id") REFERENCES "investment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_entries" ADD CONSTRAINT "grant_entries_ulb_id_fkey" FOREIGN KEY ("ulb_id") REFERENCES "municipality_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_entries" ADD CONSTRAINT "grant_entries_primary_acc_code_id_fkey" FOREIGN KEY ("primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_entries" ADD CONSTRAINT "grant_entries_grant_id_fkey" FOREIGN KEY ("grant_id") REFERENCES "grants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_entries" ADD CONSTRAINT "grant_entries_grant_nature_id_fkey" FOREIGN KEY ("grant_nature_id") REFERENCES "grant_natures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_entries" ADD CONSTRAINT "grant_entries_voucher_id_fkey" FOREIGN KEY ("voucher_id") REFERENCES "voucher_entries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_entries" ADD CONSTRAINT "grant_entries_expndtre_nature_id_fkey" FOREIGN KEY ("expndtre_nature_id") REFERENCES "expenditure_natures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_entries" ADD CONSTRAINT "grant_entries_blnce_trckng_id_fkey" FOREIGN KEY ("blnce_trckng_id") REFERENCES "balance_trackings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grant_entries" ADD CONSTRAINT "grant_entries_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "balance_trackings" ADD CONSTRAINT "balance_trackings_primary_acc_code_id_fkey" FOREIGN KEY ("primary_acc_code_id") REFERENCES "account_codes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
