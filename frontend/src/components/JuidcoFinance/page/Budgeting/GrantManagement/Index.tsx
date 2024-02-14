/**
 * Author: Krish Kumar
 * date: 02-09-2024
 * status: open
 */

"use client";

import React from "react";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";

export const HeroGrantManagement = () => {
  const pathName = usePathname();
  const router = useRouter();

  const onViewButtonClick1 = (id: string) => {
    router.push(`${pathName}/view/${id}?mode=view`);
  };
  const onViewButtonClick2 = (id: string) => {
    router.push(`${pathName}/view/${id}?mode=edit`);
  };

  const tButton = (id: string) => {
    return (
      <>
        <ViewIconButton variant="view" onClick={() => onViewButtonClick1(id)} />
        <ViewIconButton variant="edit" onClick={() => onViewButtonClick2(id)} />
      </>
    );
  };

  const column = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    {
      name: "ulb",
      caption: "ULBs",
      width: "w-[25%]",
    },
    {
      name: "primary_acc_code",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "sanction_number",
      caption: "Grant Sanction Number",
      width: "w-[25%]",
    },
    {
      name: "grant",
      caption: "Name of the Grant",
      width: "w-[25%]",
    },
    {
      name: "grant_nature",
      caption: "Nature of the Grant",
      width: "w-[25%]",
    },
    {
      name: "employee",
      caption: "Designation of the Authority",
      width: "w-[25%]",
    },
    {
      name: "sanctioned_amount",
      caption: "Sanctioned Amount (Rs)",
      width: "w-[25%]",
    },
    {
      name: "grant_from_date",
      caption: "Grant From Date",
      width: "w-[25%]",
    },
    {
      name: "grant_to_date",
      caption: "Grant To Date",
      width: "w-[25%]",
    },
    {
      name: "advance_amount",
      caption: "Grant Received in Advance Amount (Rs)",
      width: "w-[25%]",
    },
    {
      name: "advance_rcving_date",
      caption: "Grant Received in Advance Date",
      width: "w-[25%]",
    },
    {
      name: "expenditure_date",
      caption: "Date",
      width: "w-[25%]",
    },
    {
      name: "voucher",
      caption: "Voucher Number",
      width: "w-[25%]",
    },
    {
      name: "expenditure_nature",
      caption: "Nature of Expenditure",
      width: "w-[25%]",
    },
    {
      name: "refund_date",
      caption: "Date",
      width: "w-[25%]",
    },
    {
      name: "refund_amount",
      caption: "Amount (Rs)",
      width: "w-[25%]",
    },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    },
  ];

  return (
    <>
      <HeaderWidget variant="add" title={"Grant Management Entry"} />
      <TableWithFeatures
        title="Grant Management List"
        center
        columns={column}
        api={FINANCE_URL.GRANT_MANAGEMENT_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
