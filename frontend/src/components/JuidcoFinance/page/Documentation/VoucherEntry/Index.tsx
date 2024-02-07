"use client";

import React from "react";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import AddHeaderWidget from "@/components/Helpers/Widgets/AddHeaderWidget";
import { FINANCE_URL } from "@/utils/api/urls";

export const HeroVoucherEntry = () => {
  const onViewButtonClick1 = (id: string) => {
    window.location.replace("https://www.google.com?id" + id);
  };
  const onViewButtonClick2 = (id: string) => {
    window.location.replace("https://www.google.com?id" + id);
  };

  const tButton = (id: string) => {
    return (
      <>
        <ViewIconButton onClick={() => onViewButtonClick1(id)} />
        <ViewIconButton onClick={() => onViewButtonClick2(id)} />
      </>
    );
  };

  const pButton = (id: string) => {
    return (
      <>
        <ViewIconButton onClick={() => onViewButtonClick1(id)} />
      </>
    );
  };
  const column = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    { name: "voucher_no", caption: "Voucher No", width: "w-[15%]" },
    { name: "voucher_date", caption: "Voucher Date", width: "w-[10%]" },
    { name: "voucher_type", caption: "Voucher Type", width: "w-[15%]" },
    { name: "narration", caption: "Narration", width: "w-[40%]" },
    { name: "print", caption: "Print", value: pButton, width: "w-[5%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton, width: "w-[10%]"
    },
  ];

  return (
    <>
      <AddHeaderWidget title={"Voucher Entry"} />
      <TableWithFeatures
        title="Title 1"
        center
        columns={column}
        api={FINANCE_URL.VOUCHER_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
