"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { BudgetApproDetailsData } from "@/utils/types/budgeting/budget_appro_types";
import { budgetApproDetailsSchema } from "@/utils/validation/budgeting/budget_appro.validation";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

export const EditBudgetAppro = ({
  BudgetApproID,
}: {
  BudgetApproID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [selects, setSelects] = useState({
    f_p_codes: [],
    approved_amount: undefined,
  });
  const [initialData, setInitialData] = useState<BudgetApproDetailsData>({
    fin_year_id: "",
    primary_acc_code_id: "",
    remark: "",
    from_primary_acc_code_id: "",
    // approved_amount: undefined,
    transfer_amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BUDGET_APPRO_URL.getById}/${BudgetApproID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          fin_year_id: res.data.data.fin_year.id,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          remark: res.data.data.remark,
          from_primary_acc_code_id: res.data.data.from_primary_acc_code.id,
          // approved_amount: res.data.data.approved_amount,
          transfer_amount: res.data.data.transfer_amount,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateBudgetApproEntry = async (
    values: BudgetApproDetailsData
  ): Promise<BudgetApproDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BUDGET_APPRO_URL.update}`,
        method: "POST",
        data: {
          id: Number(BudgetApproID),
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
    BudgetApproDetailsData,
    Error,
    BudgetApproDetailsData
  >(UpdateBudgetApproEntry, {
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
    try {
      const res = await axios({
        url: `${FINANCE_URL.ACCOUNTING_CODE_URL.getParentCodes}/${id}`,
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
        url: `${FINANCE_URL.BALANCE_TRACKING_URL.get}/1`,
        method: "GET",
      });
      setSelects((prev)=> ({...prev, approved_amount: res.data?.data?.balance_amount}))
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  ////////// Form Fields /////////////////
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
      API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getChildCodes}`,
      HANDLER: handleSelectPrimaryCode,
    },
    {
      CONTROL: "input",
      HEADER: "Budget Appropriation Remark",
      ACCESSOR: "remark",
      PLACEHOLDER: "Enter budget appropriation remark",
    },
    {
      TITLE: "Budget Transfer From",
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
          HEADER: "Approved Amount",
          ACCESSOR: "approved_amount",
          PLACEHOLDER: "Enter approved amount",
          TYPE: "number",
          VISIBILITY: selects.approved_amount ? true : false,
          READONLY: true,
          VALUE: selects.approved_amount,
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
        title="Budget Appropriation"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title="Budget Appropriation"
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={budgetApproDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
