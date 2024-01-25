type FinanceUrlKeys =
  | "BANK_MASTER_URL"
  | "VENDOR_MASTER_URL"
  | "CHEQUEBOOK_MASTER_URL";

type Urls = {
  [key in FinanceUrlKeys]: {
    get: string;
    create: string;
    update: string;
    getById: string;
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
    create: "/api/finance/add-vendor-details",
    update: "/api/finance/update-vendor-details",
    getById: "/vendor-master/get",
  },

  CHEQUEBOOK_MASTER_URL: {
    get: "/vendor-master/get?limit=10",
    create: "/api/finance/add-vendor-details",
    update: "/api/finance/update-vendor-details",
    getById: "/vendor-master/get",
  },
};
