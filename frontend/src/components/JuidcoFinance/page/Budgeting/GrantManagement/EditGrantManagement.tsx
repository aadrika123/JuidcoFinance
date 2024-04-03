"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { fields } from "./GrantManagementFormFields";
import { GrantManagementDetailsData } from "./grant_management_types";
import { grantManagementDetailsSchema } from "./grant_management.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditGrantManagement = ({
  GrantManagementID,
}: {
  GrantManagementID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [initialData, setInitialData] = useState<GrantManagementDetailsData>({
    ulb_id: "",
    primary_acc_code_id: "",
    sanction_number: "",
    grant_id: "",
    grant_nature_id: "",
    employee_id: "",
    sanctioned_amount: "",
    grant_from_date: "",
    grant_to_date: "",
    advance_amount: "",
    advance_rcving_date: "",
    expenditure_date: "",
    voucher_id: "",
    expenditure_nature_id: "",
    refund_date: "",
    refund_amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.GRANT_MANAGEMENT_URL.getById}/${GrantManagementID}`,
      });

      if (res.data.status) {
        setInitialData((prev) => {
          return {
            ...prev,
            ulb_id: res.data.data.ulb.id,
            primary_acc_code_id: res.data.data.primary_acc_code.id,
            sanction_number: res.data.data.sanction_number,
            grant_id: res.data.data.grant.id,
            grant_nature_id: res.data.data.grant_nature.id,
            employee_id: res.data.data.employee.id,
            sanctioned_amount: res.data.data.sanctioned_amount,
            grant_from_date: DateFormatter(res.data.data.grant_from_date),
            grant_to_date: DateFormatter(res.data.data.grant_to_date),
            advance_amount: res.data.data.advance_amount,
            advance_rcving_date: DateFormatter(
              res.data.data.advance_rcving_date
            ),
            expenditure_date: DateFormatter(res.data.data.expenditure_date),
            voucher_id: res.data.data.voucher.id,
            expenditure_nature_id: res.data.data.expenditure_nature.id,
            refund_date: DateFormatter(res.data.data.refund_date),
            refund_amount: res.data.data.refund_amount,
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
    ["grant-managemennt-get-single", GrantManagementID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [GrantManagementID]);

  // UPDATE VOUCHER DETAILS
  const UpdateGrantManagementEntry = async (
    values: GrantManagementDetailsData
  ): Promise<GrantManagementDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.GRANT_MANAGEMENT_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(GrantManagementID),
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
    GrantManagementDetailsData,
    Error,
    GrantManagementDetailsData
  >(UpdateGrantManagementEntry, {
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
        title="Grant Management"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title="Grant Management"
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={grantManagementDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
