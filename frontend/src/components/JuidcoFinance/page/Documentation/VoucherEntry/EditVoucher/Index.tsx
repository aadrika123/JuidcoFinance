"use client";

import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { VoucherDataProps } from "@/utils/types/voucher_entry_types";
import { voucherSchema } from "@/utils/validation/documentation/voucher_entry.validation";
import { FINANCE_URL } from "@/utils/api/urls";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import axios from "@/lib/axiosConfig";

export const EditVoucherEntry = ({ VoucherID }: { VoucherID: string }) => {
  const [initialData, setInitialData] = useState<VoucherDataProps>({
    voucher_date: "",
    voucher_type_id: 0,
    narration: "",
    department_id: 0,
    adminis_ward_id: 0,
    voucher_sub_id: 0,
    sub_ledger_id: 0,
    amount: undefined,
    dr_cr: 0,
  });

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: ``
      });
    setInitialData
    })();
  });

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Voucher Date",
      ACCESSOR: "voucher_date",
      PLACEHOLDER: "DD/MM/YYYY",
      TYPE: "date",
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
      TYPE: "number",
    },
  ];

  return (
    <>
      <HeaderWidget title="Edit Voucher Entry" variant="view" />
      <FormikWrapper
        initialValues={initialData}
        validationSchema={voucherSchema}
        onSubmit={onSubmit}
        fields={fields}
      />
    </>
  );
};
