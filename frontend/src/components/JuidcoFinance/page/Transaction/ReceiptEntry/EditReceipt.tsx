"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { ReceiptDataProps, ResponseData } from "@/utils/types/receipt_entry_types";
import { ReceiptDetailsSchema } from "@/utils/validation/transactions/receipt_entry.validation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { fields } from "./RecieptEntryFormFields";

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
      toast.success("Updated Successfully");
      setTimeout(() => {
        goBack();
      }, 1000);
    },
    onError: () => {
      alert("Something Went Wrong!!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (values: any) => {
    values.date = `${new Date(values.date).toISOString()}`;
    mutate(filterValBefStoring(values));
  };

  return (
    <>
      <Toaster />
      <HeaderWidget title="Receipt" variant={searchParams == "view"? "view" : "edit"} />
      <FormikWrapper
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
