import React from "react";
import Image from "next/image";
import { SidebarLinksProps } from "@/utils/types/types";

export const sidebarLinks: SidebarLinksProps = {
  modules: [
    {
      moduleName: "Finance Management",
      path: "/",
      icon: (
        <Image
          src="/icons/sidebar/finance.svg"
          alt="finance"
          width={100}
          height={100}
        />
      ),
      subModules: [
        {
          moduleName: "Home",
          icon: (
            <Image
              src="/icons/sidebar/finance.svg"
              alt="home"
              width={100}
              height={100}
            />
          ),
          path: "/finance/home",
          // subModules: [
          //   { moduleName: "Charts of Account", path: "/finance/masters" },
          //   { moduleName: "Bank Masters", path: "/finance/masters/bank-master" },
          //   {
          //     moduleName: "Vendor Masters",
          //     path: "/finance/masters/vendor-master",
          //   },
          //   {
          //     moduleName: "Cheque Book Entry",
          //     path: "/finance/masters/chequebook-master",
          //   },
          // ],
        },
        {
          moduleName: "Revenue Collection",
          icon: (
            <Image
              src="/icons/sidebar/masters.svg"
              alt="revenue-collection"
              width={100}
              height={100}
            />
          ),
          path: "/finance/revenue-collection",
          subModules: [
            {
              moduleName: "Receipt Register",
              path: "/finance/revenue-collection/receipt-register",
            },
            {
              moduleName: "Collection Register",
              path: "/finance/revenue-collection/collection-register",
            },
            {
              moduleName: "Summary of Daily Collection",
              path: "/finance/revenue-collection/daily-collection",
            },
          ],
        },
        {
          moduleName: "Revenue Receivable",
          icon: (
            <Image
              src="/icons/sidebar/masters.svg"
              alt="revenue-receivable"
              width={100}
              height={100}
            />
          ),
          path: "/finance/revenue-receivable",
          subModules: [
            {
              moduleName: "Demand Register",
              path: "/finance/revenue-receivable/demand-register",
            },
            {
              moduleName: "Summary of Bills Raised",
              path: "/finance/revenue-receivable/bills-raised",
            },
          ],
        },
        {
          moduleName: "Documentation & Record Keeping",
          icon: (
            <Image
              src="/icons/sidebar/doc.svg"
              alt="document"
              width={100}
              height={100}
            />
          ),
          path: "/finance/documentation",
          subModules: [
            { moduleName: "Voucher Entry", path: "/finance/documentation/voucher-entry" },
            {
              moduleName: "Cash Book",
              path: "/finance/documentation/cash-book",
            },
            {
              moduleName: "Journal Book",
              path: "/finance/documentation/journal-book",
            },
            { moduleName: " Charts of Account", path: "/finance/documentation" }
          ],
        },
        {
          moduleName: "Transactions",
          icon: (
            <Image
              src="/icons/sidebar/transaction.svg"
              alt="document"
              width={100}
              height={100}
            />
          ),
          path: "/finance/transaction",
          subModules: [
            { moduleName: "Receipt Entry ", path: "/finance/transaction/receipt-entry" },
            {
              moduleName: "Direct Payment Entry",
              path: "/finance/transaction/direct-payment-entry",
            },
            {
              moduleName: "Bills Payment Entry",
              path: "/finance/transaction/bills-payment-entry",
            },
            {
              moduleName: "Bills Invoice Entry",
              path: "/finance/transaction/bills-invoice-entry",
            },
            {
              moduleName: "Investments",
              path: "/finance/transaction/investments",
            },
            {
              moduleName: "Grant Managements",
              path: "/finance/transaction/grant-management",
            },
            {
              moduleName: "Loans - Borrowings Managements",
              path: "/finance/transaction/loan-management",
            },
            {
              moduleName: "Advance Managements",
              path: "/finance/transaction/advance-management",
            },
          ],
        },
        {
          moduleName: "Masters",
          icon: (
            <Image
              src="/icons/sidebar/masters.svg"
              alt="masters"
              width={100}
              height={100}
            />
          ),
          path: "/finance/master",
          subModules: [
            { moduleName: "Bank Masters", path: "/finance/masters/bank-master" },
            {
              moduleName: "Vendor Masters",
              path: "/finance/masters/vendor-master",
            },
            {
              moduleName: "Cheque Book Entry",
              path: "/finance/masters/chequebook-master",
            },
          ],
        },
        {
          moduleName: "Budgeting",
          icon: (
            <Image
              src="/icons/sidebar/transaction.svg"
              alt="budgeting"
              width={100}
              height={100}
            />
          ),
          path: "/finance/budgeting",
          subModules: [
            { moduleName: "Receipt Budget", path: "/finance/budgeting/receipt-budget" },
            {
              moduleName: "Budget Appropriations",
              path: "/finance/budgeting/budget-appropriations",
            },
            {
              moduleName: "Budget Re-Appropriations",
              path: "/finance/budgeting/budget-re-appropriations",
            },
            {
              moduleName: "Opening Balance Entry",
              path: "/finance/budgeting/opening-balance",
            },
            {
              moduleName: "Revised Budget",
              path: "/finance/budgeting/revised-budget",
            }
          ],
        },
        {
          moduleName: "Financial Statements",
          icon: (
            <Image
              src="/icons/sidebar/masters.svg"
              alt="payment"
              width={100}
              height={100}
            />
          ),
          path: "/finance/financial-statements",
          subModules: [
            { moduleName: "Trail Balance", path: "/finance/financial-statements/trail-balance" },
            {
              moduleName: "Income Statement",
              path: "/finance/financial-statements/income-statement",
            },
            {
              moduleName: "Balance Sheet",
              path: "/finance/financial-statements/balance-sheet",
            },
          ],
        },
        {
          moduleName: "Dashboard",
          icon: (
            <Image
              src="/icons/sidebar/masters.svg"
              alt="dashboard"
              width={100}
              height={100}
            />
          ),
          path: "/finance/dashboard",
          // subModules: [
          //   { moduleName: "Charts of Account", path: "/finance/masters" },
          //   { moduleName: "Bank Masters", path: "/finance/masters/bank-master" },
          //   {
          //     moduleName: "Vendor Masters",
          //     path: "/finance/masters/vendor-master",
          //   },
          //   {
          //     moduleName: "Cheque Book Entry",
          //     path: "/finance/masters/chequebook-master",
          //   },
          // ],
        },
        {
          moduleName: "Corrections and Reversals",
          icon: (
            <Image
              src="/icons/sidebar/masters.svg"
              alt="payment"
              width={100}
              height={100}
            />
          ),
          path: "/finance/corrections-reversals",
          subModules: [
            { moduleName: "Stop Payment Order", path: "/finance/corrections-reversals/stop-payment-order" },
            {
              moduleName: "Cancel Cheque",
              path: "/finance/corrections-reversals/Cancel Cheque",
            },
            {
              moduleName: "Cancel Voucher",
              path: "/finance/corrections-reversals/cancel-voucher",
            },
            {
              moduleName: "Cancel Bill",
              path: "/finance/corrections-reversals/cancel-bill",
            },
            {
              moduleName: "Cancel Receipt",
              path: "/finance/corrections-reversals/cancel-receipt",
            },
            {
              moduleName: "Cancel Demand",
              path: "/finance/corrections-reversals/cancel-demand",
            },
            {
              moduleName: "Bank Recounciliation",
              path: "/finance/corrections-reversals/bank-recounciliation",
            },
          ],
        },
      ],
    },
  ],
};
