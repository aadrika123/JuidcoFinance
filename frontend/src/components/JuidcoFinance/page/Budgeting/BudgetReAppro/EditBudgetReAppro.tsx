"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { BudgetReApproDetailsData } from "@/utils/types/budgeting/budget_re_appro_types";
import { budgetReApproDetailsSchema } from "@/utils/validation/budgeting/budget_re_appro.validation";
import { fields } from "./BudgetReApproFormFields";

export const EditBudgetReAppro = ({
  BudgetReApproID,
}: {
  BudgetReApproID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<BudgetReApproDetailsData>({
    fin_year_id: "",
    primary_acc_code_id: "",
    transaction_date: "",
    budget_name_id: "",
    actual_amount: "",
    from_primary_acc_code_id: "",
    approved_amount: "",
    balance_amount: "",
    transfer_amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BUDGET_RE_APPRO_URL.getById}/${BudgetReApproID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          fin_year_id: res.data.data.fin_year.id,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          transaction_date: DateFormatter(res.data.data.transaction_date),
          budget_name_id: res.data.data.budget_name.id,
          actual_amount: res.data.data.actual_amount,
          from_primary_acc_code_id: res.data.data.from_primary_acc_code.id,
          approved_amount: res.data.data.approved_amount,
          balance_amount: res.data.data.balance_amount,
          transfer_amount: res.data.data.transfer_amount,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateBudgetReApproEntry = async (
    values: BudgetReApproDetailsData
  ): Promise<BudgetReApproDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BUDGET_RE_APPRO_URL.update}`,
        method: "POST",
        data: {
          id: Number(BudgetReApproID),
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
    BudgetReApproDetailsData,
    Error,
    BudgetReApproDetailsData
  >(UpdateBudgetReApproEntry, {
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
        title="Budget Re-Appropriation"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title="Budget Re-Appropriation"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={budgetReApproDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
