"use client";

import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { BillInvoiceDetailsData } from "@/utils/types/bills_invoice_entry_types";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { BillInvoiceDetailsSchema } from "@/utils/validation/transactions/bill_invoice.validation";

export const EditBillsPaymentEntry = ({
  BillsInvoiceID,
}: {
  BillsInvoiceID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<BillInvoiceDetailsData>({
    entry_date: "",
    type_id: "",
    bill_no: "",
    department_id: "",
    admin_ward_id: "",
    bill_date: "",
    stage_id: "",
    vendor_id: "",
    amount: "",
    address: "",
    narration: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.getById}/${BillsInvoiceID}`,
      });
      console.log(res.data.data);

      setInitialData((prev) => {
        return {
          ...prev,
          bill_no: res.data.data.bill_no,
          bill_date: DateFormatter(res.data.data.bill_date),
          address: res.data.data.address,
          admin_ward_id: res.data.data.admin_ward.id,
          amount: res.data.data.amount,
          department_id: res.data.data.department.id,
          narration: res.data.data.narration,
          stage_id: res.data.data.bill_stage.id,
          entry_date: DateFormatter(res.data.data.entry_date),
          vendor_id: res.data.data.vendor.id,
          type_id: res.data.data.type.id,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateBillInvoiceEntry = async (
    values: BillInvoiceDetailsData
  ): Promise<BillInvoiceDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(BillsInvoiceID),
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
    BillInvoiceDetailsData,
    Error,
    BillInvoiceDetailsData
  >(UpdateBillInvoiceEntry, {
    onSuccess: () => {
      toast.success("Updated Bill Invoice Entry");
    },
    onError: () => {
      alert("Error updating Bill Invoice Entry");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      setTimeout(() => {
        goBack();
      }, 1000);
    },
  });

  const onSubmit = (values: any) => {
    mutate(filterValBefStoring(values));
  };

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    // Add Bill/Invoice
    { TITLE: "Add Bill/Invoice" },
    {
      CONTROL: "input",
      HEADER: "Bill Number",
      ACCESSOR: "bill_no",
      PLACEHOLDER: "Enter Bill Number",
    },
    {
      CONTROL: "select",
      HEADER: "Bill Type",
      ACCESSOR: "type_id",
      PLACEHOLDER: "Select Bill Type",
      API: `${FINANCE_URL.BILL_TYPE.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Vendor Name",
      ACCESSOR: "vendor_id",
      PLACEHOLDER: "Select Vendor Type",
      API: `${FINANCE_URL.EMPLOYEE_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Department",
      ACCESSOR: "department_id",
      PLACEHOLDER: "Select Department",
      API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Bill Entry Date",
      ACCESSOR: "entry_date",
      TYPE: "date",
    },

    {
      CONTROL: "input",
      HEADER: "Narration",
      ACCESSOR: "narration",
      PLACEHOLDER: "Enter Narration",
    },

    {
      CONTROL: "select",
      HEADER: "Bill Stage",
      ACCESSOR: "stage_id",
      PLACEHOLDER: "Select Bill State",
      API: `${FINANCE_URL.BILL_TYPE.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Bill Date",
      ACCESSOR: "bill_date",
      TYPE: "date",
    },
    {
      CONTROL: "input",
      HEADER: "Address",
      ACCESSOR: "address",
      PLACEHOLDER: "Enter Address",
    },
    {
      CONTROL: "select",
      HEADER: "Administration Ward",
      ACCESSOR: "admin_ward_id",
      PLACEHOLDER: "Select Administration Ward",
      API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Bill Amount",
      ACCESSOR: "amount",
      TYPE: "number",
      PLACEHOLDER: "Enter amount",
    },

    // Deduction Details
    // { TITLE: "Deduction Details" },
    // {
    //   CONTROL: "select",
    //   HEADER: "Vendor Name",
    //   ACCESSOR: "voucher_id",
    //   PLACEHOLDER: "Select Vendor Name",
    //   API: `${FINANCE_URL.VOUCHER_SUB_TYPE_URL.get}`,
    // },

    // {
    //   CONTROL: "input",
    //   HEADER: "Concerned Work",
    //   ACCESSOR: "dr_cr",
    //   PLACEHOLDER: "Select Dr/Cr",
    //   API: "/bill-type/get",
    // },
    // {
    //   CONTROL: "input",
    //   HEADER: "Advance",
    //   ACCESSOR: "advance",
    //   PLACEHOLDER: "Enter Advance",
    //   TYPE: "number",

    // },
    // {
    //   CONTROL: "input",
    //   HEADER: "Amount",
    //   ACCESSOR: "amount1",
    //   TYPE: "number",
    //   PLACEHOLDER: "Enter amount",
    // },
    // {
    //   CONTROL: "input",
    //   HEADER: "Deposit",
    //   ACCESSOR: "deposit",
    //   TYPE: "number",
    //   PLACEHOLDER: "Enter deposit",
    // },
  ];

  return (
    <>
      <Toaster />
      <HeaderWidget
        title="Bill Invoice"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title=""
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={BillInvoiceDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
