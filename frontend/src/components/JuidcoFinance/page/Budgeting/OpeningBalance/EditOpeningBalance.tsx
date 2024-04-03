"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { fields } from "./OpeningBalanceFormFields";
import { OpeningBalanceDetailsData } from "./opening_balance_types";
import { openingBalanceDetailsSchema } from "./opening_balance.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditOpeningBalance = ({
  OpeningBalanceID,
}: {
  OpeningBalanceID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<OpeningBalanceDetailsData>({
    fin_year_id: "",
    dr_cr_id: "",
    primary_acc_code_id: "",
    amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.OPENING_BALANCE_ENTRY_URL.getById}/${OpeningBalanceID}`,
      });

      if (res.data.status) {
        setInitialData((prev) => {
          return {
            ...prev,
            fin_year_id: res.data.data.fin_year.id,
            dr_cr_id: res.data.data.dr_cr.id,
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
    ["opening-balance-get-single", OpeningBalanceID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [OpeningBalanceID]);

  // UPDATE VOUCHER DETAILS
  const UpdateOpeningBalanceEntry = async (
    values: OpeningBalanceDetailsData
  ): Promise<OpeningBalanceDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.OPENING_BALANCE_ENTRY_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(OpeningBalanceID),
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
    OpeningBalanceDetailsData,
    Error,
    OpeningBalanceDetailsData
  >(UpdateOpeningBalanceEntry, {
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
        title="Opening Balance"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title="Opening Balance"
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={openingBalanceDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
