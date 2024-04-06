"use client";

import Button from "@/components/global/atoms/Button";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const HeroCashBook = () => {
  const router = useRouter();
  const pathName = usePathname();
  const onViewButtonClick = (id: string) => {
    router.push(`${pathName}/view/${id}?mode=edit`);
  };

  const tButton = (id: string) => {
    return (
      <>
        <Button variant="primary" onClick={() => onViewButtonClick(id)}>
          View
        </Button>
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
    <div>
      <TableWithFeatures
        title="Cash Book"
        center
        columns={column}
        api={FINANCE_URL.BILL_PAYMENT_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
      />
    </div>
  );
};

export default HeroCashBook;
