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
  | "BILL_INVOICE_ENTRY_URL"
  | "RECEIPT_BUDGET_URL"
  | "BUDGET_TYPE_URL"
  | "FINANCIAL_YEAR_URL"
  | "ACCOUNTING_CODE_URL"
  | "BUDGET_APPRO_URL"
  | "BUDGET_RE_APPRO_URL"
  | "OPENING_BALANCE_ENTRY_URL"
  | "INVESTMENT_URL"
  | "GRANT_MANAGEMENT_URL"
  | "MUNICIPILATY_CODE_URL"
  | "BUDGET_NAME_URL"
  | "INVESTMENT_TYPE_URL"
  | "REVISED_BUDGET_URL"
  | "DR_CR_URL"
  | "EXPENDITURE_NATURE_URL"
  | "BANK_URL"
  | "MODULE_URL"
  | "BALANCE_TRACKING_URL"
  | "LOAN_MANAGEMENT_URL"
  | "ADVANCE_MANAGEMENT_URL"
  | "AUTH_URL"
  | "RECEIPT_REGISTER"
  | "REVENUE_MODULE"
  | "RECEIPT_MODE"
  | "OPENING_BALANCE"
  | "REVENUE_ACCOUNTED_TYPE"
  | "COLLECTION_REGISTER"
  | "DAILY_COLL_SUMMARY"
  | "CASH_BANK_R_VOUCHER"
  | "CASH_BOOK"
  | "BILLS";

type Urls = {
  [key in FinanceUrlKeys]: {
    get?: string;
    create?: string;
    update?: string;
    getById?: string;
    delete?: string;
    getCodes?: string;
    getAll?: string;
    getMainCodes?: string;
    getChildCodes?: string;
    getNatures?: string;
    getNames?: string;
    getParentCodes?: string;
    login?: string;
    getUDHD?: string;
    getDesig?: string;
    approve?: string;
    getLedgerCodes?: string;
    getByAccCodeAndUlbId?: string;
    getCheckedData?: string;
    getByReveAndAccId?: string;
    getLedgerCodesOld?: string;
    getByUlbId?: string;
  };
};

export const FINANCE_URL: Urls = {
  AUTH_URL: {
    login: "/auth/login",
    getUDHD: "/udhd/get-all",
    getDesig: "/udhd/designations/get-all",
  },

  BANK_MASTER_URL: {
    get: "/bank-master/get-all",
    create: "/bank-master/create",
    update: "/bank-master/update",
    getById: "/bank-master/get-by-id",
    getByAccCodeAndUlbId: "/bank-master/get-by-acc-ulb",
    getByUlbId: "/bank-master/get-by-ulb",
  },

  VENDOR_MASTER_URL: {
    get: "/vendor-master/get?limit=10",
    create: "/vendor-master/create",
    update: "/vendor-master/update",
    getById: "/vendor-master/get",
    getAll: "/vendor-master/get",
    getNames: "/vendor-master/get-names",
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
    getNatures: "/grant-natures/get",
  },

  BILL_TYPE: {
    get: "/bill-type/get",
  },

  DEPARTMENT_URL: {
    get: "/department/get",
  },
  EMPLOYEE_URL: {
    get: "/employees/get",
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
  RECEIPT_BUDGET_URL: {
    create: "/receipt-budgets/create",
    get: "/receipt-budgets/get-all",
    update: "/receipt-budgets/update",
    getById: "receipt-budgets/get-by-id",
  },
  REVISED_BUDGET_URL: {
    create: "/revised-budgets/create",
    get: "/revised-budgets/get-all",
    update: "/revised-budgets/update",
    getById: "revised-budgets/get-by-id",
  },
  BUDGET_APPRO_URL: {
    create: "/budget-appropriations/create",
    get: "/budget-appropriations/get-all",
    update: "/budget-appropriations/update",
    getById: "budget-appropriations/get-by-id",
  },
  BUDGET_RE_APPRO_URL: {
    create: "/budget-reappropriations/create",
    get: "/budget-reappropriations/get-all",
    update: "/budget-reappropriations/update",
    getById: "budget-reappropriations/get-by-id",
  },
  OPENING_BALANCE_ENTRY_URL: {
    create: "/opening-balances/create",
    get: "/opening-balances/get-all",
    update: "/opening-balances/update",
    getById: "opening-balances/get-by-id",
  },
  INVESTMENT_URL: {
    create: "/investments/create",
    get: "/investments/get-all",
    update: "/investments/update",
    getById: "investments/get-by-id",
  },
  GRANT_MANAGEMENT_URL: {
    create: "/grant-entries/create",
    get: "/grant-entries/get-all",
    update: "/grant-entries/update",
    getById: "grant-entries/get-by-id",
  },
  BUDGET_TYPE_URL: {
    get: "/budget-types/get",
  },
  FINANCIAL_YEAR_URL: {
    get: "/financial-years/get",
  },
  ACCOUNTING_CODE_URL: {
    get: "/get-all-account-code",
    getMainCodes: "/get-main-account-codes",
    getChildCodes: "/get-child-account-codes",
    getParentCodes: "/get-codes-with-parent-detail",
    create: "/request-new-acc-code",
    getLedgerCodesOld: "get-ledger-codes",
    getLedgerCodes: "get-ledger-codes-for-bank-entry",
  },
  REVENUE_ACCOUNTED_TYPE: {
    get: "/revenue-accounted-types/get",
    getByReveAndAccId: "/revenue-accounted-types/get",
  },
  MUNICIPILATY_CODE_URL: {
    get: "/get-all-munci-code",
  },
  BUDGET_NAME_URL: {
    get: "/budget-names/get",
  },
  INVESTMENT_TYPE_URL: {
    get: "/investment-types/get",
  },
  DR_CR_URL: {
    get: "/drcr/get",
  },
  EXPENDITURE_NATURE_URL: {
    get: "/expenditure-natures/get",
  },
  BANK_URL: {
    get: "/banks/get",
  },
  MODULE_URL: {
    get: "/modules/get",
  },
  BALANCE_TRACKING_URL: {
    get: "/balance-trackings/get-balance",
  },
  LOAN_MANAGEMENT_URL: {
    create: "/loan-management/create",
    get: "/loan-management/get-all",
    update: "/loan-management/update",
    getById: "loan-management/get-by-id",
  },
  ADVANCE_MANAGEMENT_URL: {
    create: "/advance-management/create",
    get: "/advance-management/get-all",
    update: "/advance-management/update",
    getById: "advance-management/get-by-id",
  },
  RECEIPT_REGISTER: {
    create: "/receipt-register/create",
    get: "/receipt-register/get-all",
    update: "/receipt-register/update",
    getById: "/receipt-register/get-by-id",
    approve: "/receipt-register/approve",
    getCheckedData: "/receipt-register/get-checked-data",
  },
  COLLECTION_REGISTER: {
    get: "/collection-register/get-all",
    approve: "/collection-register/approve",
    getById: "/collection-register/get-by-id",
    getCheckedData: "/collection-register/get-checked-data",
  },
  DAILY_COLL_SUMMARY: {
    get: "/daily-coll-summary/get-all",
    approve: "/daily-coll-summary/approve",
    getById: "/daily-coll-summary/get-by-id",
    getCheckedData: "/daily-coll-summary/get-checked-data",
  },
  REVENUE_MODULE: {
    get: "/revenue-modules/get-all",
  },
  RECEIPT_MODE: {
    get: "/receipt-modes/get-all",
  },
  OPENING_BALANCE: {
    create: "/receipt-register/opening-balance/create",
    update: "/receipt-register/opening-balance/update",
  },
  CASH_BANK_R_VOUCHER: {
    get: "/cash-bank-receipt-voucher/get-all",
    approve: "/cash-bank-receipt-voucher/approve",
    getById: "/cash-bank-receipt-voucher/get-by-id",
    getCheckedData: "/cash-bank-receipt-voucher/get-checked-data",
  },
  CASH_BOOK: {
    get: "/cash-book/get-all",
    getById: "/cash-book/get-by-id",
  },
  BILLS: {
    get: "/bills/get-all",
  }
};
