import React from "react";
import Image from "next/image";
import mastersLogo from "@/assets/icons/sidebar/masters.svg";
import docLogo from "@/assets/icons/sidebar/doc.svg";
import transactionsLogo from "@/assets/icons/sidebar/transaction.svg";
import paymentLogo from "@/assets/icons/sidebar/payment.svg";
import rupeeIcons from "@/assets/svg/rupee_icons.svg";
import houseIcons from "@/assets/svg/house_icons.svg";
import { SidebarLinksProps } from "@/components/JuidcoFinance/page/Documentation/ChartsOfAccount/types";
import { ROLES } from "./roles";

export const sidebarLinks: SidebarLinksProps = {
  modules: [
    {
      moduleName: "Finance Management",
      path: "/",
      icon: <Image src={rupeeIcons} alt="finance" width={100} height={100} />,
      subModules: [
        {
          moduleName: "Home",
          icon: <Image src={houseIcons} alt="home" width={100} height={100} />,
          path: "/home",
        },
        {
          moduleName: "Bills - Verify",
          icon: <Image src={houseIcons} alt="home" width={100} height={100} />,
          path: "/bills-verify",
        },
        {
          moduleName: "Revenue Collection",
          icon: (
            <Image
              src={mastersLogo}
              alt="revenue-collection"
              width={100}
              height={100}
            />
          ),
          path: "/revenue-collection",
          roles: [ROLES.ACC_DEP_MANAGER, ROLES.ACC_DEP_ACCOUNTANT],
          subModules: [
            {
              moduleName: "Receipt Register",
              path: "/revenue-collection/receipt-register",
            },
            {
              moduleName: "Collection Register",
              path: "/revenue-collection/collection-register",
            },
            {
              moduleName: "Summary of Daily Collection",
              path: "/revenue-collection/daily-collection-summary",
            },
          ],
        },
        {
          moduleName: "Revenue Receivable",
          icon: (
            <Image
              src={mastersLogo}
              alt="revenue-receivable"
              width={100}
              height={100}
            />
          ),
          path: "/revenue-receivable",
          subModules: [
            {
              moduleName: "Demand Register",
              path: "/revenue-receivable/demand-register",
            },
            {
              moduleName: "Summary of Bills Raised",
              path: "/revenue-receivable/bills-raised",
            },
          ],
        },
        {
          moduleName: "Documentation & Record Keeping",
          icon: <Image src={docLogo} alt="document" width={100} height={100} />,
          path: "/documentation",
          subModules: [
            {
              moduleName: "Cash/Bank Receipt Voucher",
              path: "/documentation/cash-bank-receipt-voucher",
            },
            {
              moduleName: "Cash Book",
              path: "/documentation/cash-book",
            },
            {
              moduleName: "Journal Book",
              path: "/documentation/journal-book",
            },
            { moduleName: " Charts of Account", path: "/documentation" },
          ],
        },
        {
          moduleName: "Transactions",
          icon: (
            <Image src={paymentLogo} alt="document" width={100} height={100} />
          ),
          path: "/transaction",
          subModules: [
            {
              moduleName: "Receipt Entry ",
              path: "/transaction/receipt-entry",
            },
            {
              moduleName: "Direct Payment Entry",
              path: "/transaction/direct-payment-entry",
            },
            {
              moduleName: "Bills Payment Entry",
              path: "/transaction/bills-payment-entry",
            },
            {
              moduleName: "Bills Invoice Entry",
              path: "/transaction/bills-invoice-entry",
            },
            {
              moduleName: "Investments",
              path: "/transaction/investments",
            },
            {
              moduleName: "Grant Managements",
              path: "/transaction/grant-management",
            },
            {
              moduleName: "Loans - Borrowings Managements",
              path: "/transaction/loan-management",
            },
            {
              moduleName: "Advance Managements",
              path: "/transaction/advance-management",
            },
          ],
        },
        {
          moduleName: "Masters",
          icon: (
            <Image src={mastersLogo} alt="masters" width={100} height={100} />
          ),
          path: "/master",
          subModules: [
            { moduleName: "Bank Masters", path: "/masters/bank-master" },
            {
              moduleName: "Vendor Masters",
              path: "/masters/vendor-master",
            },
            {
              moduleName: "Cheque Book Entry",
              path: "/masters/chequebook-master",
            },
          ],
        },
        {
          moduleName: "Budgeting",
          icon: (
            <Image
              src={transactionsLogo}
              alt="budgeting"
              width={100}
              height={100}
            />
          ),
          path: "/budgeting",
          subModules: [
            { moduleName: "Receipt Budget", path: "/budgeting/receipt-budget" },
            {
              moduleName: "Budget Appropriations",
              path: "/budgeting/budget-appropriations",
            },
            {
              moduleName: "Budget Re-Appropriations",
              path: "/budgeting/budget-re-appropriations",
            },
            {
              moduleName: "Opening Balance Entry",
              path: "/budgeting/opening-balance",
            },
            {
              moduleName: "Revised Budget",
              path: "/budgeting/revised-budget",
            },
          ],
        },
        {
          moduleName: "Financial Statements",
          icon: (
            <Image src={mastersLogo} alt="payment" width={100} height={100} />
          ),
          path: "/financial-statements",
          subModules: [
            {
              moduleName: "Trail Balance",
              path: "/financial-statements/trail-balance",
            },
            {
              moduleName: "Income Statement",
              path: "/financial-statements/income-statement",
            },
            {
              moduleName: "Balance Sheet",
              path: "/financial-statements/balance-sheet",
            },
          ],
        },
        {
          moduleName: "Dashboard",
          icon: (
            <Image src={mastersLogo} alt="dashboard" width={100} height={100} />
          ),
          path: "/dashboard",
        },
        {
          moduleName: "Corrections and Reversals",
          icon: (
            <Image src={mastersLogo} alt="payment" width={100} height={100} />
          ),
          path: "/corrections-reversals",
          subModules: [
            {
              moduleName: "Stop Payment Order",
              path: "/corrections-reversals/stop-payment-order",
            },
            {
              moduleName: "Cancel Cheque",
              path: "/corrections-reversals/Cancel Cheque",
            },
            {
              moduleName: "Cancel Voucher",
              path: "/corrections-reversals/cancel-voucher",
            },
            {
              moduleName: "Cancel Bill",
              path: "/corrections-reversals/cancel-bill",
            },
            {
              moduleName: "Cancel Receipt",
              path: "/corrections-reversals/cancel-receipt",
            },
            {
              moduleName: "Cancel Demand",
              path: "/corrections-reversals/cancel-demand",
            },
            {
              moduleName: "Bank Recounciliation",
              path: "/corrections-reversals/bank-recounciliation",
            },
          ],
        },
      ],
    },
  ],
};
