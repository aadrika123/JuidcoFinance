/**
 * Author: Krish Kumar
 * date: 13-09-2024
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

export const HeroInvestments = () => {
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
      name: "investment_no",
      caption: "Investment No",
      width: "w-[25%]",
    },
    {
      name: "investment_type",
      caption: "Investment Type",
      width: "w-[25%]",
    },
    {
      name: "investment_date",
      caption: "Date of Investment",
      width: "w-[25%]",
    },
    {
      name: "purchase_amount",
      caption: "Purchase Amount (Rs)",
      width: "w-[25%]",
    },
    {
      name: "ulb",
      caption: "ULBs",
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
      <HeaderWidget variant="add" title={"Investments Entry"} />
      <TableWithFeatures
        title="Investments List"
        center
        columns={column}
        api={FINANCE_URL.INVESTMENT_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
