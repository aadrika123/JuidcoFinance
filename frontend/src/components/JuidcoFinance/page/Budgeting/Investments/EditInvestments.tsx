"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { fields } from "./InvestmentsFormFields";
import { InvestmentsDetailsData } from "./investments_types";
import { investmentsDetailsSchema } from "./investments.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditInvestments = ({
  InvestmentsID,
}: {
  InvestmentsID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<InvestmentsDetailsData>({
    ulb_id: "",
    primary_acc_code_id: "",
    investment_no: "",
    authorization_date: "",
    investment_date: "",
    particulars: "",
    investment_type_id: "",
    purchase_amount: "",
    face_value_amount: "",
    interest_due_date: "",
    interest_due_amount: "",
    employee_id: "",
    interest_recovered_amount: "",
    interest_recovery_date: "",
    acc_adj_recovery_date: "",
    realization_final_amount: "",
    realization_date: "",
    acc_adj_realization_date: "",
    remarks: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.INVESTMENT_URL.getById}/${InvestmentsID}`,
      });

      if (res.data.status) {
        setInitialData((prev) => {
          return {
            ...prev,
            ulb_id: res.data.data.ulb.id,
            primary_acc_code_id: res.data.data.primary_acc_code.id,
            investment_no: res.data.data.investment_no,
            authorization_date: DateFormatter(res.data.data.authorization_date),
            investment_date: DateFormatter(res.data.data.investment_date),
            particulars: res.data.data.particulars,
            investment_type_id: res.data.data.investment_type.id,
            purchase_amount: res.data.data.purchase_amount,
            face_value_amount: res.data.data.face_value_amount,
            interest_due_date: DateFormatter(res.data.data.interest_due_date),
            interest_due_amount: res.data.data.interest_due_amount,
            employee_id: res.data.data.employee.id,
            interest_recovered_amount: res.data.data.interest_recovered_amount,
            interest_recovery_date: DateFormatter(
              res.data.data.interest_recovery_date
            ),
            acc_adj_recovery_date: DateFormatter(
              res.data.data.acc_adj_recovery_date
            ),
            realization_final_amount: res.data.data.realization_final_amount,
            realization_date: DateFormatter(res.data.data.realization_date),
            acc_adj_realization_date: DateFormatter(
              res.data.data.acc_adj_realization_date
            ),
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
    ["investment-get-single", InvestmentsID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [InvestmentsID]);

  // UPDATE VOUCHER DETAILS
  const UpdateInvestmentsEntry = async (
    values: InvestmentsDetailsData
  ): Promise<InvestmentsDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.INVESTMENT_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(InvestmentsID),
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
    InvestmentsDetailsData,
    Error,
    InvestmentsDetailsData
  >(UpdateInvestmentsEntry, {
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
        title="Investments"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title="Investments"
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={investmentsDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
