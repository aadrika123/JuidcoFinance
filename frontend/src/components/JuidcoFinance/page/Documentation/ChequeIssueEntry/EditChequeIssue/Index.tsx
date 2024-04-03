/**
 * Author: Krish
 * date: 02-09-2024
 * status: open
 */

"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import axios from "@/lib/axiosConfig";
import goBack, { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { ChequeIssueEntryData } from "../cheque_issue_entry_types";
import { FieldTypeProps } from "@/utils/types/formikTypes";
import { chequeIssueValidationSchema } from "../cheque_issue_entry.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditChequeIssueEntry = ({
  ChequeIssueID,
}: {
  ChequeIssueID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<ChequeIssueEntryData>({
    voucher_no: 0,
    voucher_date: "",
    bill_type_id: 0,
    narration: "",
    admin_ward_id: 0,
    payee_id: 0,
    grant_id: 0,
    bank_id: 0,
    module_id: 0,
    issue_date: "",
    cheque_no: "",
    amount: 0,
  });

  const queryClient = new QueryClient();

  // Get cheque issue entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.CHEQUE_ISSUE_ENTRY.getById}/${ChequeIssueID}`,
      });
      console.log(res.data.data);

      setInitialData((prev) => {
        return {
          ...prev,
          voucher_no: res.data.data.voucher_no,
          voucher_date: DateFormatter(res.data.data.voucher_date),
          bill_type_id: res.data.data.bill_type.id,
          narration: res.data.data.narration,
          admin_ward_id: res.data.data.admin_ward.id,
          payee_id: res.data.data.payee.id,
          grant_id: res.data.data.grant.id,
          bank_id: res.data.data.bank.id,
          module_id: res.data.data.module.id,
          issue_date: DateFormatter(res.data.data.issue_date),
          cheque_no: res.data.data.cheque_no,
          amount: res.data.data.amount,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { isFetching: isFetching, refetch: reloadData } = useQuery(
    ["cheque-issue-get-single", ChequeIssueID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [ChequeIssueID]);

  // UPDATE Cheque issue entry DETAILS
  const UpdateChequeIssueEntry = async (
    values: ChequeIssueEntryData
  ): Promise<ChequeIssueEntryData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.CHEQUE_ISSUE_ENTRY.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(ChequeIssueID),
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
    ChequeIssueEntryData,
    Error,
    ChequeIssueEntryData
  >(UpdateChequeIssueEntry, {
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        goBack();
      }, 1000);
    },
    onError: () => {
      alert("Error updating Voucher Entry");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (values: any) => {
    values.voucher_date = `${new Date(values.voucher_date).toISOString()}`;
    values.issue_date = `${new Date(values.issue_date).toISOString()}`;
    mutate(filterValBefStoring(values));
  };

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Payment Voucher No",
      ACCESSOR: "voucher_no",
      PLACEHOLDER: "Enter Voucher No",
    },
    {
      CONTROL: "input",
      HEADER: "Payment Voucher Date",
      ACCESSOR: "voucher_date",
      PLACEHOLDER: "YYYY-MM-DD",
      TYPE: "date",
    },
    {
      CONTROL: "select",
      HEADER: "Type of Bill",
      ACCESSOR: "bill_type_id",
      PLACEHOLDER: "Select Bill Type",
      API: `${FINANCE_URL.BILL_TYPE.get}`,
    },

    {
      CONTROL: "input",
      HEADER: "Narration",
      ACCESSOR: "narration",
      PLACEHOLDER: "Enter Narration",
    },

    {
      CONTROL: "select",
      HEADER: "Administration Ward",
      ACCESSOR: "admin_ward_id",
      PLACEHOLDER: "Select Administration Ward",
      API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Payee Name",
      ACCESSOR: "payee_id",
      PLACEHOLDER: "Select Payee Name",
      API: `${FINANCE_URL.EMPLOYEE_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Grant",
      ACCESSOR: "grant_id",
      PLACEHOLDER: "Select Grant",
      API: `${FINANCE_URL.GRANT_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Department",
      ACCESSOR: "department_id",
      PLACEHOLDER: "Select Department",
      API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Bank Name",
      ACCESSOR: "bank_id",
      PLACEHOLDER: "Select Bank Name",
      API: `${FINANCE_URL.BANK_URL.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Module Name",
      ACCESSOR: "module_id",
      PLACEHOLDER: "Select Module Name",
      API: `${FINANCE_URL.MODULE_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Issue Date",
      ACCESSOR: "issue_date",
      TYPE: "date",
    },
    {
      CONTROL: "input",
      HEADER: "Cheque No",
      ACCESSOR: "cheque_no",
      PLACEHOLDER: "Enter Cheque Number",
    },

    {
      CONTROL: "input",
      HEADER: "Amount",
      ACCESSOR: "amount",
      PLACEHOLDER: "Enter Amount",
      TYPE: "number",
    },
  ];

  return (
    <>
      {isSuccess && <SuccesfullConfirmPopup message="Updated Successfully" />}

      <RandomWorkingPopup show={isLoading} />
      <HeaderWidget
        title="Cheque Issue Entry"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={chequeIssueValidationSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
          title={""}
        />
      )}
    </>
  );
};
