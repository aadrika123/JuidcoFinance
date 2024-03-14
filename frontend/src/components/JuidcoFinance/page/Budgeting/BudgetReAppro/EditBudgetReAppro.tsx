"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { BudgetReApproDetailsData } from "@/utils/types/budgeting/budget_re_appro_types";
import { budgetReApproDetailsSchema } from "@/utils/validation/budgeting/budget_re_appro.validation";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

export const EditBudgetReAppro = ({
  BudgetReApproID,
}: {
  BudgetReApproID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [selects, setSelects] = useState({
    f_p_codes: [],
    balance_amount: undefined,
    approved_amount: undefined,
  });

  const [initialData, setInitialData] = useState<BudgetReApproDetailsData>({
    fin_year_id: "",
    primary_acc_code_id: "",
    transaction_date: "",
    remark: "",
    budget_name_id: "",
    actual_amount: "",
    from_primary_acc_code_id: "",
    approved_amount: "",
    balance_amount: "",
    transfer_amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BUDGET_RE_APPRO_URL.getById}/${BudgetReApproID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          fin_year_id: res.data.data.fin_year.id,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          transaction_date: DateFormatter(res.data.data.transaction_date),
          budget_name_id: res.data.data.budget_name.id,
          actual_amount: res.data.data.actual_amount,
          from_primary_acc_code_id: res.data.data.from_primary_acc_code.id,
          approved_amount: res.data.data.approved_amount,
          balance_amount: res.data.data.balance_amount,
          transfer_amount: res.data.data.transfer_amount,
          remark: res.data.data.remark,
        };
      });
      handleSelectPrimaryCode(res.data.data.primary_acc_code.id);
      handleSelectFromPrimaryCode(res.data.data.from_primary_acc_code.id);
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateBudgetReApproEntry = async (
    values: BudgetReApproDetailsData
  ): Promise<BudgetReApproDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BUDGET_RE_APPRO_URL.update}`,
        method: "POST",
        data: {
          id: Number(BudgetReApproID),
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
    BudgetReApproDetailsData,
    Error,
    BudgetReApproDetailsData
  >(UpdateBudgetReApproEntry, {
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

  /////////////// Handle Select Primary Accounting Code ////////////////
  const handleSelectPrimaryCode = async (id: string | number) => {
    console.log(id)
    try {
      const res = await axios({
        url: `${FINANCE_URL.ACCOUNTING_CODE_URL.getChildCodes}/1`,
        method: "GET",
      });
      setSelects((prev) => ({ ...prev, f_p_codes: res.data.data }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //////////////////// Handle Select From Primary Accounting Code //////////////
  const handleSelectFromPrimaryCode = async (id: string | number) => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BALANCE_TRACKING_URL.get}/${id}`,
        method: "GET",
      });
      setSelects((prev) => ({
        ...prev,
        balance_amount: res.data?.data?.balance_amount,
        approved_amount: res.data?.data?.approved_amount,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /////////////////// Field List ///////////////////////
  const fields: FieldTypeProps[] = [
    {
      CONTROL: "select",
      HEADER: "Financial Year",
      ACCESSOR: "fin_year_id",
      PLACEHOLDER: "Select financial year",
      API: `${FINANCE_URL.FINANCIAL_YEAR_URL.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Primary Accounting Code",
      ACCESSOR: "primary_acc_code_id",
      PLACEHOLDER: "Select Primary Accounting Code",
      API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getParentCodes}`,
      HANDLER: handleSelectPrimaryCode,
    },
    {
      CONTROL: "input",
      HEADER: "Transaction Date",
      ACCESSOR: "transaction_date",
      TYPE: "date",
    },
    {
      CONTROL: "select",
      HEADER: "Budget Name",
      ACCESSOR: "budget_name_id",
      PLACEHOLDER: "Select budget name",
      API: `${FINANCE_URL.BUDGET_NAME_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Actual Budget Amount",
      ACCESSOR: "actual_amount",
      PLACEHOLDER: "Enter Actual Amount",
      TYPE: "number",
    },
    {
      CONTROL: "input",
      HEADER: "Remarks",
      ACCESSOR: "remark",
      PLACEHOLDER: "Enter Remark",
    },
    {
      TITLE: "Budget Transfer Form",
      CHILDRENS: [
        {
          CONTROL: "selectForNoApi",
          HEADER: "From Primary Accounting Code",
          ACCESSOR: "from_primary_acc_code_id",
          PLACEHOLDER: "Select From Primary Accounting Code",
          DATA: selects.f_p_codes,
          HANDLER: handleSelectFromPrimaryCode
        },
        {
          CONTROL: "input",
          HEADER: "Approved Budget Amount",
          ACCESSOR: "approved_amount",
          PLACEHOLDER: "Enter approved budget amount",
          TYPE: "number",
          VISIBILITY: selects.approved_amount ? true : false,
          READONLY: true,
          VALUE: selects.approved_amount,
        },
        {
          CONTROL: "input",
          HEADER: "Balance Approved Amount",
          ACCESSOR: "balance_amount",
          PLACEHOLDER: "Enter balance amount",
          TYPE: "number",
          VISIBILITY: selects.balance_amount ? true : false,
          READONLY: true,
          VALUE: selects.balance_amount,
        },
        {
          CONTROL: "input",
          HEADER: "Transfer Amount",
          ACCESSOR: "transfer_amount",
          PLACEHOLDER: "Enter transfer amount",
          TYPE: "number",
        },
      ],
    },
  ];

  return (
    <>
      <Toaster />
      <HeaderWidget
        title="Budget Re-Appropriation"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title="Budget Re-Appropriation"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={budgetReApproDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
