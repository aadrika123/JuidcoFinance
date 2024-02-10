/**
 * Author: Krish
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

export const HeroChequeIssueEntry = () => {
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
    { name: "issue_date", caption: "Issue Date", width: "w-[15%]" },
    { name: "module", caption: "Module Name", width: "w-[10%]" },
    { name: "cheque_no", caption: "Cheque No", width: "w-[25%]" },
    { name: "amount", caption: "Amount", width: "w-[20%]" },
    { name: "narration", caption: "Department", width: "w-[30%]" },
    // { name: "print", caption: "Print", value: pButton, width: "w-[5%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    },
  ];

  return (
    <>
      <HeaderWidget variant="add" title={"Cheque Issue Entry"} />
      <TableWithFeatures
        title="Cheque Issue List"
        center
        columns={column}
        api={FINANCE_URL.CHEQUE_ISSUE_ENTRY.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
