"use client";

import Button from "@/components/global/atoms/Button";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const HeroCashBook = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();

  const onViewButtonClick = (id: string) => {
    activateWorkingAnimation();
    router.push(`${pathName}/view/${id}`);
  };

   ////////// View Button
   const tButton = (id: string) => {
    return (
      <>
        <Button
          variant="primary"
          className="py-2 px-4"
          onClick={() => onViewButtonClick(id)}
        >
          View
        </Button>
      </>
    );
  };

  const column = [
    { name: "id", caption: "Sr. No." },
    { name: "date", caption: "Date" },
    { name: "receipt_voucher_no", caption: "Receipt Voucher No" },
    { name: "primary_acc_code", caption: "Code of Account" },
    { name: "lf_no", caption: "L/F" },
    { name: "amount", caption: "Amount" },
    {
      name: "View",
      caption: <span>View</span>,
      value: tButton
    },
  ];
  return (
    <div>
      {workingAnimation}
      <TableWithFeatures
        title="Cash Book"
        center
        columns={column}
        api={FINANCE_URL.CASH_BOOK.get || ""}
        numberOfRowsPerPage={10}
      />
    </div>
  );
};

export default HeroCashBook;
