/**
 * Author: Sanjiv Kumar
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

export const HeroBudgetReAppro = () => {
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
      name: "fin_year",
      caption: "Financial Year",
      width: "w-[25%]",
    },
    {
      name: "primary_acc_code",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "transaction_date",
      caption: "Transaction Date",
      width: "w-[25%]",
    },
    {
      name: "budget_name",
      caption: "Budget Name",
      width: "w-[25%]",
    },
    {
      name: "actual_amount",
      caption: "Actual Budget Amount",
      width: "w-[25%]",
    },
    {
      name: "from_primary_acc_code",
      caption: "From Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "approved_amount",
      caption: "Approved Budget Amount",
      width: "w-[25%]",
    },
    {
      name: "balance_amount",
      caption: "Balance Approved Amount",
      width: "w-[25%]",
    },
    {
      name: "remark",
      caption: "Remarks",
      width: "w-[25%]",
    },
    {
      name: "transfer_amount",
      caption: "Transfer Amount",
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
      <HeaderWidget variant="add" title={"Budget Re-Appropriation Entry"} />
      <TableWithFeatures
        title="Budget Re-Appropriation List"
        center
        columns={column}
        api={FINANCE_URL.BUDGET_RE_APPRO_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
