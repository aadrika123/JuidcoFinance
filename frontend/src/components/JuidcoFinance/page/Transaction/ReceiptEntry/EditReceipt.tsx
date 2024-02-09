"use client";

import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { ReceiptDataProps, ResponseData } from "@/utils/types/receipt_entry_types";
import { ReceiptDetailsSchema } from "@/utils/validation/transactions/receipt_entry.validation";
import APIs from "@/json/apis.json";
import FormikWrapperV from "@/components/global/organisms/FormikContainerV";
import { HeaderWidgetV } from "@/components/Helpers/Widgets/HeaderWidgetV";

export const EditReceipt = ({
  receiptID,
}: {
  receiptID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<ReceiptDataProps>({
    date: "",
    email: "",
    receipt_no: "",
    module_id: "",
    paid_by: "",
    receipt_type_id: "",
    mobile_no: "",
    admin_ward_id: "",
    narration: "",
    subledger_id: "",
    amount: "",
  });

  const queryClient = new QueryClient();

  // Get Payment entry by ID
  useEffect(() => {
    (async function () {
      const res: ResponseData = await axios({
        method: "GET",
        url: `/receipt-entry/get-by-id/${receiptID}`,
      });

      setInitialData((prev: ReceiptDataProps) => {
        const d = res.data.data;
        console.log(res);
        return {
          ...prev,
          date: DateFormatter(d.date),
          email: d.email,
          receipt_no: d.receipt_no,
          module_id: d.module.id,
          paid_by: d.paid_by,
          receipt_type_id: d.receipt_type.id,
          mobile_no: d.mobile_no,
          admin_ward_id: d.admin_ward.id,
          narration: d.narration,
          subledger_id: d.subledger.id,
          amount: d.amount
        };
      });
    })();
  }, []);

  // UPDATE DIRECT PAYMENT ENTRY
  const UpdateReceipt = async (
    values: ReceiptDataProps
  ): Promise<ReceiptDataProps> => {
    try {
      const res = await axios({
        url: `/receipt-entry/update`,
        method: "POST",
        data: {
          id: Number(receiptID),
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
    ReceiptDataProps,
    Error,
    ReceiptDataProps
  >(UpdateReceipt, {
    onSuccess: () => {
      toast.success("Updated Successfully")
    },
    onError: () => {
      alert("Error updating the record.");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      setTimeout(() => {
        goBack();
      }, 1000);
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    values.date = `${new Date(values.date).toISOString()}`;
    mutate(filterValBefStoring(values));
  };

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Receipt Date",
      ACCESSOR: "date",
      PLACEHOLDER: "DD/MM/YYYY",
      TYPE: "date",
    },
    {
      CONTROL: "input",
      HEADER: "Email",
      ACCESSOR: "email",
      PLACEHOLDER: "Example: ramesh@gmail.com",
    },
    {
      CONTROL: "input",
      HEADER: "Receipt Number",
      ACCESSOR: "receipt_no",
      PLACEHOLDER: "Example: 2444234324243"
    },

    {
      CONTROL: "select",
      HEADER: "Module",
      ACCESSOR: "module_id",
      PLACEHOLDER: "Select Module",
      API: `${APIs.modules_root}`,
    },
    {
      CONTROL: "input",
      HEADER: "Paid By",
      ACCESSOR: "paid_by",
      PLACEHOLDER: "Example: "
    },

    {
      CONTROL: "select",
      HEADER: "Receipt Type",
      ACCESSOR: "receipt_type_id",
      PLACEHOLDER: "Select Receipt Type",
      API: `${APIs.receipt_type_root}`,
    },

    {
      CONTROL: "input",
      HEADER: "Mobile No",
      ACCESSOR: "mobile_no",
      PLACEHOLDER: "Example: 3283838"
    },
    {
      CONTROL: "select",
      HEADER: "Admin Ward",
      ACCESSOR: "admin_ward_id",
      PLACEHOLDER: "",
      API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Narration",
      ACCESSOR: "narration",
      PLACEHOLDER: "Example: 3283838"
    },
    {
      CONTROL: "select",
      HEADER: "Subledger",
      ACCESSOR: "subledger_id",
      PLACEHOLDER: "Select Subledger",
      API: `${FINANCE_URL.SUB_LEDGER_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Amount",
      ACCESSOR: "amount",
      PLACEHOLDER: "Example: 3283838"
    },
  ];

  return (
    <>
      <Toaster />
      <HeaderWidgetV title="Receipt" variant={searchParams == "view"? "view" : "edit"} />
      <FormikWrapperV
        title=""
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={ReceiptDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
