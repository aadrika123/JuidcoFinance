/**
 * Author: Krish
 * date: 02-09-2024
 * status: open
 */

"use client";

import React from "react";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const HeroBillsInvoiceEntry = () => {
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
    { name: "issue_date", caption: "Vendor Name", width: "w-[15%]" },
    { name: "module", caption: "Bill Type", width: "w-[10%]" },
    { name: "cheque_no", caption: "Bill Number", width: "w-[15%]" },
    { name: "amount", caption: "Department", width: "w-[40%]" },
    { name: "narration", caption: "Concerned Work", width: "w-[40%]" },
    { name: "narration", caption: "Bill Date ", width: "w-[40%]" },
    { name: "narration", caption: "Narration ", width: "w-[40%]" },
    { name: "narration", caption: "Is Authorized ", width: "w-[40%]" },
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
      <HeaderWidget variant="add" title={"Bills Invoice Entry"} />
      <TableWithFeatures
        title="Bills Invoice List"
        center
        columns={column}
        api={FINANCE_URL.CHEQUE_ISSUE_ENTRY.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
