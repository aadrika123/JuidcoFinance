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

export const HeroRevisedBudget = () => {
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
      name: "primary_acc_code",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "approved_amount",
      caption: "Approved Budget Amount",
      width: "w-[25%]",
    },
    {
      name: "revised_amount",
      caption: "Revised Budget Amount",
      width: "w-[25%]",
    },
    {
      name: "remark",
      caption: "Remarks",
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
      <HeaderWidget variant="add" title={"Revised Budget Entry"} />
      <TableWithFeatures
        title="Revised Budget List"
        center
        columns={column}
        api={FINANCE_URL.BILL_INVOICE_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
