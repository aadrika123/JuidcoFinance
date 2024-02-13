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
import { receiptBudgetDetailsSchema } from "@/utils/validation/budgeting/receipt_budget.validation";
import { fields } from "./ReceiptBudgetFormFields";
import { ReceiptBudgetDetailsData } from "@/utils/types/budgeting/receipt_budget_types";

export const EditReceiptBudget = ({
  ReceiptBudgetID,
}: {
  ReceiptBudgetID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<ReceiptBudgetDetailsData>({
    fin_year_id: "",
    department_id: "",
    primary_acc_code_id: "",
    admin_ward_id: "",
    budget_type_id: "",
    amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.RECEIPT_BUDGET_URL.getById}/${ReceiptBudgetID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          fin_year_id: res.data.data.fin_year.id,
          department_id: res.data.data.department.id,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          admin_ward_id: res.data.data.admin_ward.id,
          budget_type_id: res.data.data.budget_type.id,
          amount: res.data.data.amount,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateReceiptBudgetEntry = async (
    values: ReceiptBudgetDetailsData
  ): Promise<ReceiptBudgetDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.RECEIPT_BUDGET_URL.update}`,
        method: "POST",
        data: {
          id: Number(ReceiptBudgetID),
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
    ReceiptBudgetDetailsData,
    Error,
    ReceiptBudgetDetailsData
  >(UpdateReceiptBudgetEntry, {
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
        title="Edit Receipt Budget"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title="Edit Receipt Budget"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={receiptBudgetDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
