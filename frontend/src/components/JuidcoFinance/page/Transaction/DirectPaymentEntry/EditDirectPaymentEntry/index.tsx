"use client";

import React, { useEffect, useState } from "react";
import { Choice, FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DateFormatter } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { DirPaymentDataProps, ResponseData } from "@/utils/types/direct_payment_entry_types";
import { PaymentDetailsSchema } from "@/utils/validation/transactions/direct_payment.validation";
import { HeaderWidgetV } from "@/components/Helpers/Widgets/HeaderWidgetV";

export const EditDirectPaymentEntry = ({
  PaymentID,
}: {
  PaymentID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<DirPaymentDataProps>({
    payment_date: "",
    payment_type_id: "",
    narration: "",
    department_id: "",
    adminis_ward_id: "",
    payee_name_id: "",
    subledger_id: "",
    grant_id: "",
    address: "",
    payment_mode: "",
    user_common_budget: "",
    amount: undefined,
  });

  const queryClient = new QueryClient();

  // Get Payment entry by ID
  useEffect(() => {
    (async function () {
      const res: ResponseData = await axios({
        method: "GET",
        url: `${FINANCE_URL.DIRECT_PAYMENT_ENTRY_URL.getById}/${PaymentID}`,
      });

      setInitialData((prev: DirPaymentDataProps) => {
        return {
          ...prev,
          payment_date: DateFormatter(res.data.data.payment_date),
          payment_type_id: res.data.data.payment_type.id,
          narration: res.data.data.narration,
          department_id: res.data.data.department.id,
          adminis_ward_id: res.data.data.adminis_ward.id,
          payee_name_id: res.data.data.payee_name.id,
          subledger_id: res.data.data.subledger.id || 1,
          amount: res.data.data.amount,
          payment_mode: res.data.data.payment_mode,
          user_common_budget: res.data.data.user_common_budget || true,
          address: res.data.data.address,
          grant_id: res.data.data.grant.id,
        };
      });
    })();
  }, []);

  // UPDATE DIRECT PAYMENT ENTRY
  const UpdateDirPaymentEntry = async (
    values: DirPaymentDataProps
  ): Promise<DirPaymentDataProps> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.DIRECT_PAYMENT_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(PaymentID),
          ...values,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<
    DirPaymentDataProps,
    Error,
    DirPaymentDataProps
  >(UpdateDirPaymentEntry, {
    onSuccess: () => {
      toast.success("Updated Direct Payment Entry");
    },
    onError: () => {
      alert("Error updating Direct Payment Entry");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      setTimeout(() => {
        goBack();
      }, 1000);
    },
  });

  const onSubmit = (values: any) => {
    values.payment_date = `${new Date(values.payment_date).toISOString()}`;
    mutate(values);
  };

  /////  Radio buttons list
  const choices: Choice[] = [
    { key: "Cash", value: "cash" },
    { key: "Cheque", value: "cheque" },
    { key: "NFT/RTGS", value: "NFT/RTGS" },
  ];

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Payment Date",
      ACCESSOR: "payment_date",
      PLACEHOLDER: "DD/MM/YYYY",
      TYPE: "date",
    },
    {
      CONTROL: "select",
      HEADER: "Grant",
      ACCESSOR: "grant_id",
      PLACEHOLDER: "Select Grant",
      API: `${FINANCE_URL.GRANT_URL.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Payment Type",
      ACCESSOR: "payment_type_id",
      PLACEHOLDER: "Select Payment Type",
      API: `${FINANCE_URL.PAYMENT_TYPE_URL.get}`,
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
      HEADER: "Payee Name",
      ACCESSOR: "payee_name_id",
      PLACEHOLDER: "Select Payee Name",
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
      CONTROL: "textarea",
      HEADER: "Narration",
      ACCESSOR: "narration",
      PLACEHOLDER: "Enter Narration",
    },
    {
      CONTROL: "textarea",
      HEADER: "Address",
      ACCESSOR: "address",
      PLACEHOLDER: "Enter Address",
    },
    {
      CONTROL: "select",
      HEADER: "Sub Ledger",
      ACCESSOR: "subledger_id",
      PLACEHOLDER: "Select Sub Ledger",
      API: `${FINANCE_URL.SUB_LEDGER_URL.getCodes}`,
    },
    {
      CONTROL: "input",
      HEADER: "Amount",
      ACCESSOR: "amount",
      PLACEHOLDER: "Amount",
      TYPE: "number",
    },
    {
      CONTROL: "checkbox",
      HEADER: "User Common Budget",
      ACCESSOR: "user_common_budget",
      TYPE: "checkbox",
    },
    {
      CONTROL: "radio",
      HEADER: "Payment Mode",
      ACCESSOR: "payment_mode",
      OPTIONS: choices,
      TYPE: "radio",
    },
  ];

  return (
    <>
      <Toaster />
      <HeaderWidgetV title="Direct Payment" variant={searchParams == "view"? "view" : "edit"} />
      <FormikWrapper
        title=""
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={PaymentDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
