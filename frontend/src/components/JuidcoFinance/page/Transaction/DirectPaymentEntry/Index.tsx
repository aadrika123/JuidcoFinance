"use client";

import React from "react";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const HeroPaymentEntry = () => {
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
    { name: "payment_no", caption: "Payment No", width: "w-[18%]" },
    { name: "payment_type", caption: "Payment Type", width: "w-[12%]" },
    { name: "payee_name", caption: "Payee Name", width: "w-[20%]" },
    { name: "ledger_code", caption: "Ledger Code", width: "w-[20%]" },
    { name: "amount", caption: "Amount", width: "w-[15%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    },
  ];

  return (
    <>
      <HeaderWidget variant="add" title={"Direct Payment Entry"} />
      <TableWithFeatures
        title="Direct Payment Entry List"
        center
        columns={column}
        api={FINANCE_URL.DIRECT_PAYMENT_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
