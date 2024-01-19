import React from "react";
import Image from "next/image";
import { SidebarLinksProps } from "@/types/types";

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
          path: "/",
          subModules: [
            { moduleName: "  Charts of Account", path: "/" },
            { moduleName: "Bank Masters", path: "/bank-master" },
            {
              moduleName: "Vendor Masters",
              path: "/vendor-master",
            },
            {
              moduleName: "Work Order Entry",
              path: "/workorder",
            },
            {
              moduleName: "Cheque Book Entry",
              path: "/chequebook",
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
          path: "/document-and-record",
          subModules: [
            { moduleName: "Voucher Entry", path: "/" },
            {
              moduleName: "Cheque Issue Entry",
              path: "/vendor",
            },
            {
              moduleName: "Stop Payment Order ",
              path: "/workorder",
            },
            {
              moduleName: "Cancellation / Re-issue of Cheque",
              path: "/chequebook",
            },
          ],
        },

        {
          moduleName: "Transaction",
          icon: (
            <Image
              src="/icons/sidebar/transaction.svg"
              alt="document"
              width={100}
              height={100}
            />
          ),
          path: "/document-and-record",
          subModules: [
            { moduleName: "Receipt Entry ", path: "/" },
            {
              moduleName: "Direct Payment Entry",
              path: "/vendor",
            },
            {
              moduleName: "Bills Payment Entry",
              path: "/workorder",
            },
            {
              moduleName: "Bills Invoice Entry",
              path: "/chequebook",
            },
          ],
        },
      ],
    },
  ],
};
