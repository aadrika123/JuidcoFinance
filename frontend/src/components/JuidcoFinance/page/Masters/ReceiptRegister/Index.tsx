/**
 * Author: Sanjiv Kumar
 * date: 02-09-2024
 * status: Done
 */

"use client";

import React from "react";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import TableWithScrollPagination from "@/components/global/organisms/TableWithScrollPagination";
import Input from "@/components/global/atoms/Input";
import Table from "./Table";
import TotalCountTable from "@/components/JuidcoFinance/Partials/molecules/TotalCountTable";

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

  // const columns = [
  //   { name: "id", caption: "Sr. No.", width: "w-[10%]" },
  //   {
  //     name: "receipt_no",
  //     caption: "Receipt Number",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "ulb_id_name",
  //     caption: "ULBs",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "primary_acc_code_id_name",
  //     caption: "Primary Accounting Code",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "revenue_module_id_name",
  //     caption: "Revenue Module Name",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "paid_by",
  //     caption: "Paid By",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "receipt_mode_id_name",
  //     caption: "Mode of Receipt",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "cheque_or_draft_no",
  //     caption: "Cheque / Draft No",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "bank_id_name",
  //     caption: "Bank",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "entered_by",
  //     caption: "Name",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "designation",
  //     caption: "Designation",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "print_name",
  //     caption: "Print Name",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "checked_by",
  //     caption: "Name",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "designation1",
  //     caption: "Designation1",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "print_name1",
  //     caption: "Print Name1",
  //     width: "w-[25%]",
  //   },
  //   {
  //     name: "edit/remove",
  //     caption: "Edit/Remove",
  //     width: "w-[10%]",
  //     value: addButton,
  //   },
  // ];

  const column = [
    {
      name: "All",
      caption: <span>All</span>,
      value: tButton,
      width: "w-[10%]",
    },
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
      <HeaderWidget variant="add" title={"Receipt Register Entry"} />
      <TableWithScrollPagination
        center
        columns={column}
        api={FINANCE_URL.BILL_PAYMENT_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
        footer={<Footer/>}
      />
      {/* <TableWithFeatures
        title="Receipt Register List"
        center
        columns={column}
        api={FINANCE_URL.BILL_PAYMENT_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
      /> */}
    </>
  );
};

const Footer = () => {
  const footerData = [
    {
      key: "Total",
      value: ()=>{},
    },
    {
      key: "Total",
      value: ()=>{},
    },
    {
      key: "Total",
      value: ()=>{},
    },
  ];
  return (
    <div>
     <TotalCountTable footerData={footerData} />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col">
          <h2 className="mt-6 text-secondary">Entered By</h2>
          <Input
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values.entered_by}
            // error={errors.entered_by}
            // touched={touched.entered_by}
            readonly={true}
            label=""
            name="entered_by"
            placeholder="Enter Name"
          />

          <Input
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values.designation}
            // error={errors.designation}
            // touched={touched.designation}
            readonly={true}
            label=""
            name="designation"
            placeholder="Enter Designation"
          />

          <Input
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values.entered_by_print_name}
            // error={errors.entered_by_print_name}
            // touched={touched.entered_by_print_name}
            readonly={true}
            label=""
            name="entered_by_print_name"
            placeholder="Enter Print Name"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="mt-6 text-secondary">Checked By</h2>
          <Input
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values.checked_by}
            // error={errors.checked_by}
            // touched={touched.checked_by}
            readonly={true}
            label=""
            name="checked_by"
            placeholder="Enter Name"
          />

          <Input
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values.designation1}
            // error={errors.designation1}
            // touched={touched.designation1}
            readonly={true}
            label=""
            name="designation1"
            placeholder="Enter Designation1"
          />

          <Input
            // onChange={handleChange}
            // onBlur={handleBlur}
            value={""}
            // error={errors.checked_by_print_name}
            // touched={touched.checked_by_print_name}
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
