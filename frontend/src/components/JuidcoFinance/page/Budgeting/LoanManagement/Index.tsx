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

export const HeroLoanManagement = () => {
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
    { name: "loan_no", caption: "Loan Number", width: "w-[10%]" },
    { name: "primary_acc_code", caption: "Primary Accounting Code", width: "w-[10%]" },
    { name: "receipt_date", caption: "Receipt Date", width: "w-[10%]" },
    { name: "loan_sanctioned_amount", caption: "Loan Amount", width: "w-[15%]" },
    { name: "balance_total_amount", caption: "Total Balance", width: "w-[10%]" },
    { name: "department", caption: "Department ", width: "w-[25%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    },
  ];

  return (
    <>
      <HeaderWidget variant="add" title={"Loans & Borrowings"} />
      <TableWithFeatures
        title="Loans & Borrowings List"
        center
        columns={column}
        api={FINANCE_URL.LOAN_MANAGEMENT_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};