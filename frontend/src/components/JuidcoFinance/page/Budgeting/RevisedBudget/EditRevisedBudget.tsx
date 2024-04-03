"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { fields } from "./RevisedBudgetFormFields";
import { RevisedBudgetDetailsData } from "./revised_budget_types";
import { revisedBudgetDetailsSchema } from "./revised_budget.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditRevisedBudget = ({
  RevisedBudgetID,
}: {
  RevisedBudgetID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<RevisedBudgetDetailsData>({
    primary_acc_code_id: "",
    approved_amount: "",
    revised_amount: "",
    remarks: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.REVISED_BUDGET_URL.getById}/${RevisedBudgetID}`,
      });
      if (res.data.status) {
        setInitialData((prev) => {
          return {
            ...prev,
            primary_acc_code_id: res.data.data.primary_acc_code.id,
            approved_amount: res.data.data.approved_amount,
            revised_amount: res.data.data.revised_amount,
            remarks: res.data.data.remarks,
          };
        });
      } else {
        throw "Something Went Wrong";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { isFetching: isFetching, refetch: reloadData } = useQuery(
    ["revised-budget-get-single", RevisedBudgetID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [RevisedBudgetID]);

  // UPDATE VOUCHER DETAILS
  const UpdateRevisedBudgetEntry = async (
    values: RevisedBudgetDetailsData
  ): Promise<RevisedBudgetDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.REVISED_BUDGET_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(RevisedBudgetID),
            ...values,
          },
        },
      });
      if (res.data.status) {
        return res.data;
      }
      throw "Something Went Wrong";
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate, isLoading } = useMutation<
    RevisedBudgetDetailsData,
    Error,
    RevisedBudgetDetailsData
  >(UpdateRevisedBudgetEntry, {
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
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
      {isSuccess && <SuccesfullConfirmPopup message="Updated Successfully" />}

      <RandomWorkingPopup show={isLoading} />
      <HeaderWidget
        title="Revised Budget"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title="Revised Budget"
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={revisedBudgetDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
