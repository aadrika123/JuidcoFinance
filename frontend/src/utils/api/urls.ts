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
  | "PAYMENT_TYPE_URL"
  | "ADMINIS_WARD_URL"
  | "GRANT_URL"
  | "DEPARTMENT_URL"
  | "VOUCHER_ENTRY_URL"
  | "VOUCHER_TYPE_URL"
  | "VOUCHER_SUB_TYPE_URL"
  | "SUB_LEDGER_URL";

type Urls = {
  [key in FinanceUrlKeys]: {
    get?: string;
    create?: string;
    update?: string;
    getById?: string;
    delete?: string;
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
  },

  CHEQUEBOOK_MASTER_URL: {
    get: "/vendor-master/get?limit=10",
    create: "/api/finance/add-vendor-details",
    update: "/api/finance/update-vendor-details",
    getById: "/vendor-master/get",
  },

  DIRECT_PAYMENT_ENTRY_URL: {
    get: "/direct-payment-entry/get-all?limit=10",
    create: "/direct-payment-entry/create",
    update: "/direct-payment-entry/update",
    getById: "direct-payment-entry/get-by-id",
  },

  VOUCHER_ENTRY_URL: {
    get: "/voucher-entry/get",
    create: "/direct-payment-entry/create",
    update: "",
    getById: "",
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

  DEPARTMENT_URL: {
    get: "/department/get",
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
  },
};
