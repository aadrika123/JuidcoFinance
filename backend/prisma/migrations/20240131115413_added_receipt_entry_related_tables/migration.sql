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
CREATE TABLE "subledger" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt_entry" (
    "id" SERIAL NOT NULL,
    "receipt_no" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paid_by" TEXT NOT NULL,
    "email_id" TEXT NOT NULL,
    "module_id" INTEGER NOT NULL,
    "receipt_type_id" INTEGER NOT NULL,
    "reference_date" TIMESTAMP(3) NOT NULL,
    "mobile_no" TEXT NOT NULL,
    "admin_ward_id" INTEGER NOT NULL,
    "narration" TEXT NOT NULL,
    "subledger_id" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "receipt_entry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "receipt_entry" ADD CONSTRAINT "receipt_entry_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_entry" ADD CONSTRAINT "receipt_entry_receipt_type_id_fkey" FOREIGN KEY ("receipt_type_id") REFERENCES "receipt_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_entry" ADD CONSTRAINT "receipt_entry_admin_ward_id_fkey" FOREIGN KEY ("admin_ward_id") REFERENCES "adminis_wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_entry" ADD CONSTRAINT "receipt_entry_subledger_id_fkey" FOREIGN KEY ("subledger_id") REFERENCES "subledger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
