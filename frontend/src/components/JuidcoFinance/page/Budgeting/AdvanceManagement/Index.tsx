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

export const HeroAdvanceManagement = () => {
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
    { name: "primary_acc_code", caption: "Primary Accounting Code", width: "w-[10%]" },
    { name: "work_name", caption: "Name of Work", width: "w-[10%]" },
    { name: "work_nature", caption: "Nature of Work", width: "w-[10%]" },
    { name: "contract_amount", caption: "Contract Amount", width: "w-[15%]" },
    { name: "net_paid_amount", caption: "Net Paid Amount", width: "w-[10%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    },
  ];

  return (
    <>
      <HeaderWidget variant="add" title={"Advance Entry"} />
      <TableWithFeatures
        title="Advance List"
        center
        columns={column}
        api={FINANCE_URL.ADVANCE_MANAGEMENT_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
