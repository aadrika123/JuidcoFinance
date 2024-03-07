"use client";

import React, { useEffect, useState } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { ReceiptRegisterDetailsData } from "@/utils/types/masters/receipt_register_types";
import { receiptRegisterDetailsSchema } from "@/utils/validation/masters/receipt_register.validation";
import FormikW from "./ReceiptRegisterFormFields";

export const EditReceiptRegister = ({
  ReceiptRegisterID,
}: {
  ReceiptRegisterID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<ReceiptRegisterDetailsData>({
    receipt_no: "",
    ulb_id: "",
    primary_acc_code_id: "",
    revenue_module_id: "",
    paid_by: "",
    receipt_mode_id: "",
    receipt_date: "",
    cheque_or_draft_no: "",
    bank_id: "",
    cash_amount: "",
    bank_acc_no: "",
    deposit_date: "",
    realisation_date: "",
    wheather_returned: "",
    remarks: "",
    entered_by_id: "",
    entered_by_print_name: "",
    checked_by_id: "",
    checked_by_print_name: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.getById}/${ReceiptRegisterID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          receipt_no: res.data.data.receipt_no,
          ulb_id: res.data.data.ulb.id,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          revenue_module_id: res.data.data.revenue_module.id,
          paid_by: res.data.data.paid_by,
          receipt_mode_id: res.data.data.receipt_mode.id,
          receipt_date: DateFormatter(res.data.data.receipt_date),
          cheque_or_draft_no: res.data.data.cheque_or_draft_no,
          bank_id: res.data.data.bank.id,
          cash_amount: res.data.data.cash_amount,
          bank_acc_no: res.data.data.bank_acc_no,
          deposit_date: DateFormatter(res.data.data.deposit_date),
          realisation_date: DateFormatter(res.data.data.realisation_date),
          wheather_reaturned: res.data.data.wheather_reaturned,
          remarks: res.data.data.remarks,
          entered_by: res.data.data.entered_by,
          designation: res.data.data.designation,
          print_name: res.data.data.print_name,
          checked_by: res.data.data.checked_by,
          designation1: res.data.data.designation1,
          print_name1: res.data.data.print_name1,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateReceiptRegisterEntry = async (
    values: ReceiptRegisterDetailsData
  ): Promise<ReceiptRegisterDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(ReceiptRegisterID),
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
    ReceiptRegisterDetailsData,
    Error,
    ReceiptRegisterDetailsData
  >(UpdateReceiptRegisterEntry, {
    onSuccess: () => {
      toast.success("Updated Successfully!!");
      setTimeout(() => {
        goBack();
      }, 1000);
    },
    onError: () => {
      alert("Something went wrong!!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (values: any) => {
    mutate(filterValBefStoring(values));
  };

  return (
    <>
      <Toaster />
      <HeaderWidget
        title="Edit Receipt Register"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikW
        title="Edit Receipt Register"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={receiptRegisterDetailsSchema}
        onSubmit={onSubmit}
        readonly={searchParams === "view"}
      />
    </>
  );
};
