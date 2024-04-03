"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { fields } from "./ReceiptBudgetFormFields";
import { ReceiptBudgetDetailsData } from "./receipt_budget_types";
import { receiptBudgetDetailsSchema } from "./receipt_budget.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditReceiptBudget = ({
  ReceiptBudgetID,
}: {
  ReceiptBudgetID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<ReceiptBudgetDetailsData>({
    fin_year_id: "",
    primary_acc_code_id: "",
    amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.RECEIPT_BUDGET_URL.getById}/${ReceiptBudgetID}`,
      });

      if (res.data.status) {
        setInitialData((prev) => {
          return {
            ...prev,
            fin_year_id: res.data.data.fin_year.id,
            primary_acc_code_id: res.data.data.primary_acc_code.id,
            amount: res.data.data.amount,
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
    ["receipt-budget-get-single", ReceiptBudgetID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [ReceiptBudgetID]);

  // UPDATE VOUCHER DETAILS
  const UpdateReceiptBudgetEntry = async (
    values: ReceiptBudgetDetailsData
  ): Promise<ReceiptBudgetDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.RECEIPT_BUDGET_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(ReceiptBudgetID),
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
    ReceiptBudgetDetailsData,
    Error,
    ReceiptBudgetDetailsData
  >(UpdateReceiptBudgetEntry, {
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
        title="Receipt Budget"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title=""
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={receiptBudgetDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
