/**
 * Author: Sanjiv Kumar
 * date: 02-09-2024
 * status: Done
 */

"use client";

import React, { useState } from "react";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import TableWithScrollPagination from "@/components/global/organisms/TableWithScrollPagination";
import Input from "@/components/global/atoms/Input";
import TotalCountTable from "@/components/JuidcoFinance/Partials/molecules/TotalCountTable";
import Checkboxes from "@/components/global/atoms/Checkbox";

export const HeroReceiptRegister = () => {
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

  const [checked, setChecked] = useState(true);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const sButton = (id: string) => {
    return (
      <>
        <Checkboxes
          value={String(checked)}
          onChange={handleCheckbox}
          className="checkbox checked:bg-primary_green"
          name="x"
        />
      </>
    );
  };

  const columns = [
    {
      name: "All",
      caption: "All",
      width: "w-[10%]",
      value: sButton,
    },
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "receipt_no",
      caption: "Receipt Number",
      width: "w-[25%]",
    },
    {
      name: "receipt_date",
      caption: "Receipt Date",
      width: "w-[25%]",
    },
    {
      name: "receipt_mode",
      caption: "Mode of Receipt",
      width: "w-[25%]",
    },
    {
      name: "paid_by",
      caption: "Paid By",
      width: "w-[25%]",
    },
    {
      name: "cheque_or_draft_no",
      caption: "Cheque / Draft No",
      width: "w-[25%]",
    },
    {
      name: "deposit_date",
      caption: "Date of Deposit",
      width: "w-[25%]",
    },
    {
      name: "realisation_date",
      caption: "Date of Realisation",
      width: "w-[25%]",
    },
    {
      name: "wheather_returned",
      caption: "Wheather Re-turned",
      width: "w-[25%]",
    },
    {
      name: "edit/remove",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: tButton,
    },
  ];

  return (
    <>
      <HeaderWidget variant="add" title={"Receipt Register Entry"} />
      <TableWithScrollPagination
        center
        columns={columns}
        api={FINANCE_URL.RECEIPT_REGISTER.get || ""}
        numberOfRowsPerPage={10}
        footer={<Footer />}
      />
    </>
  );
};

const Footer = () => {
  const footerData = [
    {
      key: "Opening Balance",
      value: () => {},
    },
    {
      key: "Days Total",
      value: () => {},
    },
    {
      key: "Closing Total",
      value: () => {},
    },
  ];
  return (
    <div>
      <TotalCountTable footerData={footerData} />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <h2 className="mt-6 text-secondary">Entered By</h2>
          <Input
            readonly={true}
            label=""
            name="entered_by"
            placeholder="Enter Name"
          />
          <Input
            readonly={true}
            label=""
            name="designation"
            placeholder="Enter Designation"
          />
          <Input
            readonly={true}
            label=""
            name="entered_by_print_name"
            placeholder="Enter Print Name"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="mt-6 text-secondary">Checked By</h2>
          <Input
            readonly={true}
            label=""
            name="checked_by"
            placeholder="Enter Name"
          />
          <Input
            readonly={true}
            label=""
            name="designation1"
            placeholder="Enter Designation1"
          />
          <Input
            value={""}
            readonly={true}
            label=""
            name="checked_by_print_name"
            placeholder="Enter Print Name"
          />
        </div>
      </div>
    </div>
  );
};
