"use client";

import React from "react";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";

export const HeroBillPaymentEntry = () => {
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
    { name: "bill_no", caption: "Bill No", width: "w-[18%]" },
    { name: "bill_entry_date", caption: "Bill Date", width: "w-[12%]" },
    { name: "payee", caption: "Payee Name", width: "w-[20%]" },
    { name: "vendor", caption: "Vendor Name", width: "w-[20%]" },
    { name: "bill_amount", caption: "Bill Amount", width: "w-[12%]" },
    { name: "net_amount", caption: "Net Amount", width: "w-[20%]" },
    { name: "is_approved", caption: "Approved", width: "w-[15%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    },
  ];

  return (
    <>
      <HeaderWidget variant="add" title={"Bill Payment Entry"} />
      <TableWithFeatures
        title="Bill Payment Entry List"
        center
        columns={column}
        api={FINANCE_URL.BILL_PAYMENT_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};

