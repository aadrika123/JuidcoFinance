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

export const HeroVoucherEntry = () => {
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
    { name: "vendor", caption: "Vendor Name", width: "w-[10%]" },
    { name: "type", caption: "Bill Type", width: "w-[10%]" },
    { name: "bill_no", caption: "Bill Number", width: "w-[10%]" },
    { name: "department", caption: "Department", width: "w-[15%]" },
    { name: "bill_date", caption: "Bill Date ", width: "w-[10%]" },
    { name: "narration", caption: "Narration ", width: "w-[25%]" },
    { name: "is_authorized", caption: "Is Authorized ", width: "w-[5%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    },
  ];

  return (
    <>
      <HeaderWidget variant="add" title={"Voucher Entry"} />
      <TableWithFeatures
        title="Voucher List"
        center
        columns={column}
        api={FINANCE_URL.BILL_PAYMENT_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
