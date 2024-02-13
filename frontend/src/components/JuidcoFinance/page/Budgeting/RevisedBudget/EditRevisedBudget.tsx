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
import { RevisedBudgetDetailsData } from "@/utils/types/budgeting/revised_budget_types";
import { revisedBudgetDetailsSchema } from "@/utils/validation/budgeting/revised_budget.validation";
import { fields } from "./RevisedBudgetFormFields";

export const EditRevisedBudget = ({
  RevisedBudgetID,
}: {
  RevisedBudgetID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<RevisedBudgetDetailsData>({
    primary_acc_code_id: "",
    approved_amount: "",
    revised_amount: "",
    remark: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.getById}/${RevisedBudgetID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          approved_amount: res.data.data.approved_amount,
          revised_amount: res.data.data.revised_amount,
          remark: res.data.data.remark,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateRevisedBudgetEntry = async (
    values: RevisedBudgetDetailsData
  ): Promise<RevisedBudgetDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(RevisedBudgetID),
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
    RevisedBudgetDetailsData,
    Error,
    RevisedBudgetDetailsData
  >(UpdateRevisedBudgetEntry, {
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
        title="Edit Revised Budget"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title="Edit Revised Budget"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={revisedBudgetDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
