/**
 * Author: Krish
 * use: For API URLs
 * status: Open
 */

type FinanceUrlKeys =
  | "BANK_MASTER_URL"
  | "VENDOR_MASTER_URL"
  | "VENDOT_TYPE_URL"
  | "CHEQUEBOOK_MASTER_URL"
  | "DIRECT_PAYMENT_ENTRY_URL"
  | "CHEQUE_ISSUE_ENTRY"
  | "PAYMENT_TYPE_URL"
  | "ADMINIS_WARD_URL"
  | "GRANT_URL"
  | "DEPARTMENT_URL"
  | "VOUCHER_ENTRY_URL"
  | "VOUCHER_TYPE_URL"
  | "VOUCHER_SUB_TYPE_URL"
  | "SUB_LEDGER_URL"
  | "EMPLOYEE_URL"
  | "BILL_TYPE"
  | "BILL_PAYMENT_ENTRY_URL"
  | "RECEIPT_ENTRY_URL"
  | "BILL_INVOICE_ENTRY_URL";

type Urls = {
  [key in FinanceUrlKeys]: {
    get?: string;
    create?: string;
    update?: string;
    getById?: string;
    delete?: string;
    getCodes?: string;
    getAll?: string;
  };
};

export const FINANCE_URL: Urls = {
  BANK_MASTER_URL: {
    get: "/bank-master/get-all?limit=10",
    create: "/bank-master/create",
    update: "/bank-master/update",
    getById: "/bank-master/get-by-id",
  },

  VENDOR_MASTER_URL: {
    get: "/vendor-master/get?limit=10",
    create: "/vendor-master/create",
    update: "/vendor-master/update",
    getById: "/vendor-master/get",
    getAll: "vendor-master/get",
  },

  CHEQUEBOOK_MASTER_URL: {
    get: "/vendor-master/get?limit=10",
    create: "/api/finance/add-vendor-details",
    update: "/api/finance/update-vendor-details",
    getById: "/vendor-master/get",
  },

  DIRECT_PAYMENT_ENTRY_URL: {
    get: "/direct-payment-entry/get-all",
    create: "/direct-payment-entry/create",
    update: "/direct-payment-entry/update",
    getById: "direct-payment-entry/get-by-id",
  },

  VOUCHER_ENTRY_URL: {
    get: "/voucher-entry/get-all",
    create: "/voucher-entry/create",
    update: "/voucher-entry/update",
    getById: "/voucher-entry/get-by-id",
  },

  CHEQUE_ISSUE_ENTRY: {
    get: "/cheque-issuances/get-all",
    create: "/cheque-issuances/create",
    update: "/cheque-issuances/update",
    getById: "/cheque-issuances/get-by-id",
  },

  PAYMENT_TYPE_URL: {
    get: "/payment-type/get",
  },

  ADMINIS_WARD_URL: {
    get: "/adminis-ward/get",
  },

  GRANT_URL: {
    get: "/grant/get",
  },

  BILL_TYPE: {
    get: "/bill-type/get",
  },

  DEPARTMENT_URL: {
    get: "/department/get",
  },
  EMPLOYEE_URL: {
    get: "/employee/get",
  },

  VOUCHER_TYPE_URL: {
    get: "/voucher-type/get",
  },

  VOUCHER_SUB_TYPE_URL: {
    get: "/voucher-sub-type/get",
  },
  VENDOT_TYPE_URL: {
    get: "/vendor-type/get",
  },
  SUB_LEDGER_URL: {
    get: "/sub-ledger/get",
    getCodes: "/sub-ledger/get-codes",
  },
  BILL_PAYMENT_ENTRY_URL: {
    create: "/bill-payment-entry/create",
    get: "/bill-payment-entry/get-all",
    update: "/bill-payment-entry/update",
    getById: "/bill-payment-entry/get-by-id",
  },
  RECEIPT_ENTRY_URL: {
    create: "/receipt-entry/create",
    get: "/receipt-entry/get-all",
    update: "/receipt-entry/update",
    getById: "/receipt-entry/get-by-id",
  },
  BILL_INVOICE_ENTRY_URL: {
    create: "/bill-invoices/create",
    get: "/bill-invoices/get-all",
    update: "/bill-invoices/update",
    getById: "bill-invoices/get-by-id",
  },
};
