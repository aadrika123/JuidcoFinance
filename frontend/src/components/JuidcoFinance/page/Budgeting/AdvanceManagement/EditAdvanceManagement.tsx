"use client";

import React, { useEffect, useState } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import FormikW from "./AdvanceManagementFormFields";
import { AdvanceManagementDetailsData } from "./advance_management_types";
import { advanceManagementDetailsSchema } from "./advance_management.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditAdvanceManagement = ({
  AdvanceManagementID,
}: {
  AdvanceManagementID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [initialData, setInitialData] = useState<AdvanceManagementDetailsData>({
    ulb_id: "",
    primary_acc_code_id: "",
    serial_no_of_estimate: "",
    work_order_no: "",
    work_name: "",
    work_nature: "",
    contract_amount: "",
    contractor_name: "",
    order_sanctioning_the_contract_no: "",
    order_sanctioning_the_contract_resolution_date: "",
    order_sanctioning_the_estimate_no: "",
    order_sanctioning_the_estimate_date: "",
    voucher_no: "",
    date: "",
    amount: "",
    officer_id: "",
    bill_no: "",
    bill_date: "",
    payable_amount: "",
    approved_amount: "",
    cumulative_approved_amount: "",
    pwd_officer_id: "",
    security_deposit_deducted_amount: "",
    tds_amount: "",
    work_contract_tax_amount: "",
    material_issued_recovery_amount: "",
    advance_provided_recovery_amount: "",
    other_deduction_amount: "",
    net_paid_amount: "",
    department_id: "",
    remarks: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.ADVANCE_MANAGEMENT_URL.getById}/${AdvanceManagementID}`,
      });
      if (res.data.status) {
        setInitialData((prev) => {
          return {
            ...prev,
            ulb_id: res.data.data.ulb.id,
            primary_acc_code_id: res.data.data.primary_acc_code.id,
            serial_no_of_estimate: res.data.data.serial_no_of_estimate,
            work_order_no: res.data.data.work_order_no,
            work_name: res.data.data.work_name,
            work_nature: res.data.data.work_nature,
            contract_amount: res.data.data.contract_amount,
            contractor_name: res.data.data.contractor_name,
            order_sanctioning_the_contract_no:
              res.data.data.order_sanctioning_the_contract_no,
            order_sanctioning_the_contract_resolution_date: DateFormatter(
              res.data.data.order_sanctioning_the_contract_resolution_date
            ),
            order_sanctioning_the_estimate_no:
              res.data.data.order_sanctioning_the_estimate_no,
            order_sanctioning_the_estimate_date: DateFormatter(
              res.data.data.order_sanctioning_the_estimate_date
            ),
            voucher_no: res.data.data.voucher_no,
            date: DateFormatter(res.data.data.date),
            amount: res.data.data.amount,
            officer_id: res.data.data.officer.id,
            bill_no: res.data.data.bill_no,
            bill_date: DateFormatter(res.data.data.bill_date),
            payable_amount: res.data.data.payable_amount,
            approved_amount: res.data.data.approved_amount,
            cumulative_approved_amount:
              res.data.data.cumulative_approved_amount,
            pwd_officer_id: res.data.data.pwd_officer.id,
            security_deposit_deducted_amount:
              res.data.data.security_deposit_deducted_amount,
            tds_amount: res.data.data.tds_amount,
            work_contract_tax_amount: res.data.data.work_contract_tax_amount,
            material_issued_recovery_amount:
              res.data.data.material_issued_recovery_amount,
            advance_provided_recovery_amount:
              res.data.data.advance_provided_recovery_amount,
            other_deduction_amount: res.data.data.other_deduction_amount,
            net_paid_amount: res.data.data.net_paid_amount,
            department_id: res.data.data.department.id,
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
    ["advance-management-get-single", AdvanceManagementID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [AdvanceManagementID]);

  // UPDATE VOUCHER DETAILS
  const UpdateAdvanceManagementEntry = async (
    values: AdvanceManagementDetailsData
  ): Promise<AdvanceManagementDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.ADVANCE_MANAGEMENT_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(AdvanceManagementID),
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
    AdvanceManagementDetailsData,
    Error,
    AdvanceManagementDetailsData
  >(UpdateAdvanceManagementEntry, {
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
        title="Edit Advance Entry"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikW
          title="Edit Advance Entry"
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={advanceManagementDetailsSchema}
          onSubmit={onSubmit}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
