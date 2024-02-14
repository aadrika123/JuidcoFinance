"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { OpeningBalanceDetailsData } from "@/utils/types/budgeting/opening_balance_types";
import { openingBalanceDetailsSchema } from "@/utils/validation/budgeting/opening_balance.validation";
import { fields } from "./OpeningBalanceFormFields";

export const EditOpeningBalance = ({
  OpeningBalanceID,
}: {
  OpeningBalanceID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<OpeningBalanceDetailsData>({
    fin_year_id: "",
    dr_cr: "",
    primary_acc_code_id: "",
    amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.OPENING_BALANCE_ENTRY_URL.getById}/${OpeningBalanceID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          fin_year_id: res.data.data.fin_year.id,
          dr_cr: res.data.data.dr_cr,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          amount: res.data.data.amount,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateOpeningBalanceEntry = async (
    values: OpeningBalanceDetailsData
  ): Promise<OpeningBalanceDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.OPENING_BALANCE_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(OpeningBalanceID),
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
    OpeningBalanceDetailsData,
    Error,
    OpeningBalanceDetailsData
  >(UpdateOpeningBalanceEntry, {
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
        title="Edit Opening Balance"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title="Edit Opening Balance"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={openingBalanceDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
