"use client";

import React, { useEffect, useState } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { AdvanceManagementDetailsData } from "@/utils/types/budgeting/advance_management_types";
import { advanceManagementDetailsSchema } from "@/utils/validation/budgeting/advance_management.validation";
import FormikW from "./AdvanceManagementFormFields";

export const EditAdvanceManagement = ({
  AdvanceManagementID,
}: {
  AdvanceManagementID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

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
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.ADVANCE_MANAGEMENT_URL.getById}/${AdvanceManagementID}`,
      });

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
          cumulative_approved_amount: res.data.data.cumulative_approved_amount,
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
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateAdvanceManagementEntry = async (
    values: AdvanceManagementDetailsData
  ): Promise<AdvanceManagementDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.ADVANCE_MANAGEMENT_URL.update}`,
        method: "POST",
        data: {
          id: Number(AdvanceManagementID),
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
    AdvanceManagementDetailsData,
    Error,
    AdvanceManagementDetailsData
  >(UpdateAdvanceManagementEntry, {
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
        title="Edit Advance Entry"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikW
        title="Edit Advance Entry"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={advanceManagementDetailsSchema}
        onSubmit={onSubmit}
        readonly={searchParams === "view"}
      />
    </>
  );
};
