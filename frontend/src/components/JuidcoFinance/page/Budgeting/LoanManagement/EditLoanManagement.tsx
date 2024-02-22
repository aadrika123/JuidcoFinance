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
import { LoanManagementDetailsData } from "@/utils/types/budgeting/loan_management_types";
import { loanManagementDetailsSchema } from "@/utils/validation/budgeting/loan_management.validation";
import FormikW from "./LoanManagementFormFields";

export const EditLoanManagement = ({
  LoanManagementID,
}: {
  LoanManagementID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<LoanManagementDetailsData>({
    ulb_id: "",
    primary_acc_code_id: "",
    purpose_of_loan: "",
    department_id: "",
    resolution_date: "",
    loan_no: "",
    loan_sanctioned_amount: "",
    interest_rate: "",
    instalments_no: "",
    instalment_amount: "",
    receipt_date: "",
    received_amount: "",
    total_received_amount: "",
    repayment_due_date: "",
    principal_amount: "",
    interest_amount: "",
    total_due_amount_to_repayment: "",
    officer_id: "",
    repaid_repayment_date: "",
    repaid_principal_amount: "",
    repaid_interest: "",
    repaid_total_amount: "",
    balance_principal_amount: "",
    balance_interest: "",
    balance_total_amount: "",
    balance_remarks: "",
    employee_id: "",
    designation_id: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.getById}/${LoanManagementID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          ulb_id: res.data.data.ulb_id,
          primary_acc_code_id: res.data.data.primary_acc_code_id,
          purpose_of_loan: res.data.data.purpose_of_loan,
          department_id: res.data.data.department_id,
          resolution_date: DateFormatter(res.data.data.resolution_date),
          loan_no: res.data.data.loan_no,
          loan_sanctioned_amount: res.data.data.loan_sanctioned_amount,
          interest_rate: res.data.data.interest_rate,
          instalments_no: res.data.data.instalments_no,
          instalment_amount: res.data.data.instalment_amount,
          receipt_date: DateFormatter(res.data.data.receipt_date),
          received_amount: res.data.data.received_amount,
          total_received_amount: res.data.data.total_received_amount,
          repayment_due_date: DateFormatter(res.data.data.repayment_due_date),
          principal_amount: res.data.data.principal_amount,
          interest_amount: res.data.data.interest_amount,
          total_due_amount_to_repayment:
            res.data.data.total_due_amount_to_repayment,
          officer_id: res.data.data.officer_id,
          repaid_repayment_date: DateFormatter(
            res.data.data.repaid_repayment_date
          ),
          repaid_principal_amount: res.data.data.repaid_principal_amount,
          repaid_interest: res.data.data.repaid_interest,
          repaid_total_amount: res.data.data.repaid_total_amount,
          balance_principal_amount: res.data.data.balance_principal_amount,
          balance_interest: res.data.data.balance_interest,
          balance_total_amount: res.data.data.balance_total_amount,
          balance_remarks: res.data.data.balance_remarks,
          employee_id: res.data.data.employee_id,
          designation_id: res.data.data.designation_id,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateLoanManagementEntry = async (
    values: LoanManagementDetailsData
  ): Promise<LoanManagementDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.LOAN_MANAGEMENT_URL.update}`,
        method: "POST",
        data: {
          id: Number(LoanManagementID),
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
    LoanManagementDetailsData,
    Error,
    LoanManagementDetailsData
  >(UpdateLoanManagementEntry, {
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
        title="Edit Loan Entry"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikW
        title="Edit Loan Entry"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={loanManagementDetailsSchema}
        onSubmit={onSubmit}
        readonly={searchParams === "view"}
      />
    </>
  );
};
