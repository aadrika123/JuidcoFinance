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
import { VoucherEntryDetailsData } from "@/utils/types/documentation/voucher_entry_types";
import { voucherEntryDetailsSchema } from "@/utils/validation/documentation/voucher_entry.validation";
import FormikW from "./VoucherEntryFormFields";

export const EditVoucherEntry = ({
  VoucherEntryID,
}: {
  VoucherEntryID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<VoucherEntryDetailsData>({
    voucher_type_id: "",
    ulb_id: "",
    date: "",
    fund_id: "",
    journal_voucher_no: "",
    bank_id: "",
    payment_date: "",
    department_id: "",
    pay_slip_ref_no: "",
    pay_slip_date: "",
    crv_bpv_no: "",
    receipt_date: "",
    primary_acc_code_id: "",
    payment_order_no: "",
    acc_description: "",
    debit_amount: "",
    credit_amount: "",
    remittance_money_no: "",
    amount: "",
    cheque_no: "",
    total_amount: "",
    amount_in_words: "",
    prepared_by: "",
    prepared_by_date: "",
    verified_by_id: "",
    verified_by_date: "",
    approved_by_id: "",
    approved_by_date: "",
    posted_by_id: "",
    posted_by_date: "",
    receiver_name: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.getById}/${VoucherEntryID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          voucher_type_id: res.data.data.voucher_type.id,
          ulb_id: res.data.data.ulb.id,
          date: DateFormatter(res.data.data.date),
          fund_id: res.data.data.fund.id,
          journal_voucher_no: res.data.data.journal_voucher_no,
          bank_id: res.data.data.bank.id,
          payment_date: DateFormatter(res.data.data.payment_date),
          department_id: res.data.data.department.id,
          pay_slip_ref_no: res.data.data.pay_slip_ref_no,
          pay_slip_date: DateFormatter(res.data.data.pay_slip_date),
          crv_bpv_no: res.data.data.crv_bpv_no,
          receipt_date: DateFormatter(res.data.data.receipt_date),
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          payment_order_no: res.data.data.payment_order_no,
          acc_description: res.data.data.acc_description,
          debit_amount: res.data.data.debit_amount,
          credit_amount: res.data.data.credit_amount,
          remittance_money_no: res.data.data.remittance_money_no,
          amount: res.data.data.amount,
          cheque_no: res.data.data.cheque_no,
          total_amount: res.data.data.total_amount,
          amount_in_words: res.data.data.amount_in_words,
          prepared_by: res.data.data.prepared_by,
          prepared_by_date: DateFormatter(res.data.data.prepared_by_date),
          verified_by_id: res.data.data.verified_by.id,
          verified_by_date: DateFormatter(res.data.data.verified_by_date),
          approved_by_id: res.data.data.approved_by.id,
          approved_by_date: DateFormatter(res.data.data.approved_by_date),
          posted_by_id: res.data.data.posted_by.id,
          posted_by_date: DateFormatter(res.data.data.posted_by_date),
          receiver_name: res.data.data.receiver_name,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateVoucherEntryEntry = async (
    values: VoucherEntryDetailsData
  ): Promise<VoucherEntryDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(VoucherEntryID),
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
    VoucherEntryDetailsData,
    Error,
    VoucherEntryDetailsData
  >(UpdateVoucherEntryEntry, {
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
        title="Edit Voucher Entry"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikW
        title="Edit Voucher Entry"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={voucherEntryDetailsSchema}
        onSubmit={onSubmit}
        readonly={searchParams === "view"}
      />
    </>
  );
};
