"use client";

import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { PaymentDetailsSchema } from "@/utils/validation/transactions/direct_payment.validation";
import { BillPaymentDetailsData, ResponseData } from "@/utils/types/bill_payment_entry_types";

export const EditBillPaymentEntry = ({
  BillPaymentID,
}: {
  BillPaymentID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<BillPaymentDetailsData>({
    bill_number: "",
    bill_entry_date: "",
    bill_type_id: "",
    vendor_name_id: "",
    department_id: "",
    adminis_ward_id: "",
    payee_name_id: "",
    bill_amount: "",
    advance: "",
    address: "",
    deposit: "",
    other_deduction: "",
  });

  const queryClient = new QueryClient();

  // Get Payment entry by ID
  useEffect(() => {
    (async function () {
      const res: ResponseData = await axios({
        method: "GET",
        url: `${FINANCE_URL.DIRECT_PAYMENT_ENTRY_URL.getById}/${BillPaymentID}`,
      });

      setInitialData((prev: BillPaymentDetailsData) => {
        return {
          ...prev,
          bill_entry_date: DateFormatter(res.data.data.bill_entry_date),
          bill_type_id: res.data.data.bill_type.id,
          bill_number: res.data.data.bill_number,
          department_id: res.data.data.department.id,
          adminis_ward_id: res.data.data.adminis_ward.id,
          payee_name_id: res.data.data.payee_name.id,
          vendor_name_id: res.data.data.vendor_name.id,
          bill_amount: res.data.data.bill_amount,
          address: res.data.data.address,
          deposit: res.data.data.deposit,
          other_deduction: res.data.data.other_deduction,
          advance: res.data.data.advance,
        };
      });
    })();
  }, []);

  // UPDATE DIRECT PAYMENT ENTRY
  const UpdateBillPaymentEntry = async (
    values: BillPaymentDetailsData
  ): Promise<BillPaymentDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.DIRECT_PAYMENT_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(BillPaymentID),
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
    BillPaymentDetailsData,
    Error,
    BillPaymentDetailsData
  >(UpdateBillPaymentEntry, {
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
    values.voucher_date = `${new Date(values.voucher_date).toISOString()}`;
    mutate(filterValBefStoring(values));
  };

   // Add Input Fields
   const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Bill Number",
      ACCESSOR: "bill_number",
      PLACEHOLDER: "Enter Bill Number",
    },
    {
      CONTROL: "input",
      HEADER: "Bill Entry Date",
      ACCESSOR: "bill_entry_date",
      PLACEHOLDER: "DD/MM/YYYY",
      TYPE: "date",
    },
    {
      CONTROL: "select",
      HEADER: "Bill Type",
      ACCESSOR: "bill_type_id",
      PLACEHOLDER: "Select Bill Type",
      API: `${FINANCE_URL.GRANT_URL.get}`,
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
      HEADER: "Vendor Name",
      ACCESSOR: "vendor_name_id",
      PLACEHOLDER: "Select Vendro Name",
      API: `${FINANCE_URL.PAYMENT_TYPE_URL.get}`,
    },
    {
      CONTROL: "textarea",
      HEADER: "Address",
      ACCESSOR: "address",
      PLACEHOLDER: "Enter Address",
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
      CONTROL: "input",
      HEADER: "Bill Amount",
      ACCESSOR: "bill_amount",
      PLACEHOLDER: "Bill Amount",
      TYPE: "number",
    },
    {
      CONTROL: "input",
      HEADER: "Advance",
      ACCESSOR: "advance",
      PLACEHOLDER: "Enter Advance",
      TYPE: "number",
    },
    {
      CONTROL: "input",
      HEADER: "Deposit",
      ACCESSOR: "deposit",
      PLACEHOLDER: "Enter Deposit",
      TYPE: "number",
    },
    {
      CONTROL: "input",
      HEADER: "Other Deduction",
      ACCESSOR: "other_deduction",
      PLACEHOLDER: "Enter Other Deduction",
      TYPE: "number",
    },
  ];

  return (
    <>
      <Toaster />
      <HeaderWidget title="Edit Direct Payment Entry" variant="view" />
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
