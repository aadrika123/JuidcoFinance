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
            { moduleName: " Charts of Account", path: "/finance/masters" },
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
              moduleName: "Cheque Issue Entry",
              path: "/finance/documentation/cheque-issue-entry",
            },
            // {
            //   moduleName: "Stop Payment Order ",
            //   path: "/workorder",
            // },
            // {
            //   moduleName: "Cancellation / Re-issue of Cheque",
            //   path: "/chequebook",
            // },
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
            },
            {
              moduleName: "Investments",
              path: "/finance/budgeting/investments",
            },
            {
              moduleName: "Grant Managements",
              path: "/finance/budgeting/grant-management",
            },
            {
              moduleName: "Loans - Borrowings Managements",
              path: "/finance/budgeting/loan-management",
            },
            {
              moduleName: "Advance Managements",
              path: "/finance/budgeting/advance-management",
            },
          ],
        },
      ],
    },
  ],
};
