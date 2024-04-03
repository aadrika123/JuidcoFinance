"use client";

import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const ReceiptsHome = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [pdf, setPdf] = useState("");
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();

  const onViewButtonClick1 = (id: string) => {
    activateWorkingAnimation();
    router.push(`${pathName}/view/${id}?mode=view`);
  };

  const onViewButtonClick2 = (id: string) => {
    activateWorkingAnimation();
    router.push(`${pathName}/view/${id}?mode=edit`);
  };

  const onViewButtonClick3 = (id: string) => {
    setPdf(
      `/api/v1/finance/receipt-entry/get-pdf/${id}?` + new Date().getTime()
    );
  };

  const onDownloadButtonClick = (id: string) => {
    const uri = `/api/v1/finance/receipt-entry/get-pdf/${id}`;
    const link = document.createElement("a");
    link.setAttribute("download", `Receipt${id}.pdf`);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const tButton = (id: string) => {
    return (
      <>
        <ViewIconButton variant="view" onClick={() => onViewButtonClick1(id)} />
        <ViewIconButton variant="edit" onClick={() => onViewButtonClick2(id)} />
        <ViewIconButton
          variant="print"
          onClick={() => onViewButtonClick3(id)}
        />
        <ViewIconButton
          variant="download"
          onClick={() => onDownloadButtonClick(id)}
        />
      </>
    );
  };

  const pdfLoaded = () => {
    if (pdf !== "") window.frames["pdf" as keyof typeof window.frames].print();
  };

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    { name: "receipt_no", caption: "Receipt No", width: "w-[10%]" },
    { name: "date", caption: "Receipt Date", width: "w-[10%]" },
    { name: "subledger", caption: "Subledger", width: "w-[15%]" },
    { name: "paid_by", caption: "Paid By", width: "w-[15%]" },
    { name: "amount", caption: "Amount", width: "w-[5%]" },
    { name: "narration", caption: "Narration", width: "w-[25%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    },
  ];

  return (
    <>
      {workingAnimation}
      <iframe onLoad={pdfLoaded} id="pdf" name="pdf" src={pdf} hidden></iframe>

      <HeaderWidget variant="add" title={"Receipt Entry"} />
      <TableWithFeatures
        title="Receipts List"
        center
        columns={columns}
        api={"/receipt-entry/get" || ""}
        numberOfRowsPerPage={10}
      />
    </>
  );
};
