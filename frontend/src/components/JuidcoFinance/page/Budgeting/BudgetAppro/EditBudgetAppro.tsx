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
import { BudgetApproDetailsData } from "@/utils/types/budgeting/budget_appro_types";
import { budgetApproDetailsSchema } from "@/utils/validation/budgeting/budget_appro.validation";
import { fields } from "./BudgetApproFormFields";

export const EditBudgetAppro = ({
  BudgetApproID,
}: {
  BudgetApproID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<BudgetApproDetailsData>({
    fin_year_id: "",
    primary_acc_code_id: "",
    remark: "",
    from_primary_acc_code_id: "",
    approved_amount: "",
    transfer_amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BUDGET_APPRO_URL.getById}/${BudgetApproID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          fin_year_id: res.data.data.fin_year.id,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          remark: res.data.data.remark,
          from_primary_acc_code_id: res.data.data.from_primary_acc_code.id,
          approved_amount: res.data.data.approved_amount,
          transfer_amount: res.data.data.transfer_amount,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateBudgetApproEntry = async (
    values: BudgetApproDetailsData
  ): Promise<BudgetApproDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BUDGET_APPRO_URL.update}`,
        method: "POST",
        data: {
          id: Number(BudgetApproID),
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
    BudgetApproDetailsData,
    Error,
    BudgetApproDetailsData
  >(UpdateBudgetApproEntry, {
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
        title="Edit Budget Appropriation"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title="Edit Budget Appropriation"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={budgetApproDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
