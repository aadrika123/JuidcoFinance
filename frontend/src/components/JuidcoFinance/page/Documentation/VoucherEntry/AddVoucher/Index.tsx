"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/reducers/PopupReducers";
import { VoucherDataProps } from "@/utils/types/voucher_entry_types";
import {
  voucherInitialValues,
  voucherSchema,
} from "@/utils/validation/documentation/voucher_entry.validation";
import { FINANCE_URL } from "@/utils/api/urls";

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddVoucherEntry = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openPopup());
  }, []);
  const [data, setData] = useState<VoucherDataProps[]>([]);
 
  const onSubmit = (values: VoucherDataProps) => {
    console.log("first", values);
    setData((prev) => [...prev, values]);
    // actions.setSubmitting(false);
  };

  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Voucher Date",
      ACCESSOR: "voucher_date",
      PLACEHOLDER: "DD/MM/YYYY",
    },
    {
      CONTROL: "select",
      HEADER: "Department Name",
      ACCESSOR: "department_id",
      PLACEHOLDER: "Select Department",
      API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Voucher Type",
      ACCESSOR: "voucher_type_id",
      PLACEHOLDER: "Select Voucher Type",
      API: `${FINANCE_URL.VOUCHER_TYPE_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Administration Ward",
      ACCESSOR: "adminis_ward_id",
      PLACEHOLDER: "Select Administration Ward",
      API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Voucher Sub Type",
      ACCESSOR: "voucher_sub_id",
      PLACEHOLDER: "Select Voucher Sub Type",
      API: `${FINANCE_URL.VOUCHER_SUB_TYPE_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Dr/Cr",
      ACCESSOR: "dr_cr",
      PLACEHOLDER: "Select Dr/Cr",
      API: "/bill-type/get",
    },

    {
      CONTROL: "select",
      HEADER: "Sub Ledger/Name",
      ACCESSOR: "sub_ledger_id",
      PLACEHOLDER: "Select Dr/Cr",
      API: `${FINANCE_URL.SUB_LEDGER_URL.get}`,
    },
    {
      CONTROL: "textarea",
      HEADER: "Narration",
      ACCESSOR: "narration",
    },
    {
      CONTROL: "input",
      HEADER: "Amount",
      ACCESSOR: "amount",
    },
  ];

  const footerData = [
    {
      key: "Total",
      value: 200,
    },
    {
      key: "Net Total",
      value: 300,
    },
  ];

  return (
    <>
      <Hoc
        initialValues={voucherInitialValues}
        validationSchema={voucherSchema}
        onSubmit={onSubmit}
        fields={fields}
      />
      <TableWithCount
        data={data}
        scrollable
        title="Title 1"
        columns={[
          { name: "id", caption: "Sr. No." },
          { name: "description", caption: "Sub-Ledger/Name" },
          { name: "select_choice", caption: "Amount(Rs) " },
          { name: "click_choice", caption: "Voucher Type" },
          { name: "branch", caption: "Dr/Cr" },
          { name: "branch", caption: "Add/Remove" },
        ]}
        footerData={footerData}
      />
    </>
  );
};
