'use client'

import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { HeaderWidgetV } from "@/components/Helpers/Widgets/HeaderWidgetV";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const ReceiptsHome = () => {
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
  }

  const columns=[
    {name: 'id', caption: "Sr. No.", width: "w-[5%]"},
    {name: 'receipt_no', caption: "Receipt No", width: "w-[5%]"},
    {name: 'date', caption: "Receipt Date", width: "w-[5%]"},
    {name: 'subledger', caption: "Subledger", width: "w-[5%]"},
    {name: 'paid_by', caption: "Paid By", width: "w-[5%]"},
    {name: 'amount', caption: "Amount", width: "w-[5%]"},
    {name: 'narration', caption: "Narration", width: "w-[5%]"},
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    }
  ]


  return (
    <>
      <HeaderWidgetV variant="add" title={"Receipt"} />
      <TableWithFeatures
        title="Receipt List"
        center
        columns={columns}
        api={"/receipt-entry/get" || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );

};
