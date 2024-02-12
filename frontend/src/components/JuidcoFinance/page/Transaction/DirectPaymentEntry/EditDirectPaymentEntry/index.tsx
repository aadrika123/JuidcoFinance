"use client";

import React, { useEffect, useState } from "react";
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
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { fields } from "../DirPaymentFormFields";

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
      toast.success("Direct Payment Entry Updated Successfully!!");
      setTimeout(() => {
        goBack();
      }, 1000);
    },
    onError: () => {
      alert("Something is wrong!!!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (values: any) => {
    values.payment_date = `${new Date(values.payment_date).toISOString()}`;
    mutate(values);
  };

  return (
    <>
      <Toaster />
      <HeaderWidget title="Direct Payment" variant={searchParams == "view"? "view" : "edit"} />
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
