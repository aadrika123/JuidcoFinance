"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { BudgetApproDetailsData } from "./budget_appro_types";
import { FieldTypeProps } from "@/utils/types/formikTypes";
import { budgetApproDetailsSchema } from "./budget_appro.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditBudgetAppro = ({
  BudgetApproID,
}: {
  BudgetApproID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [selects, setSelects] = useState({
    f_p_codes: [],
    approved_amount: undefined,
  });
  const [initialData, setInitialData] = useState<BudgetApproDetailsData>({
    fin_year_id: "",
    primary_acc_code_id: "",
    remark: "",
    from_primary_acc_code_id: "",
    approved_amount: undefined,
    transfer_amount: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BUDGET_APPRO_URL.getById}/${BudgetApproID}`,
      });
      if (res.data.status) {
        setInitialData((prev) => {
          return {
            ...prev,
            fin_year_id: res.data.data.fin_year.id,
            primary_acc_code_id: res.data.data.primary_acc_code.id,
            remark: res.data.data.remark,
            from_primary_acc_code_id: res.data.data.from_primary_acc_code.id,
            approved_amount: res.data.data.approved_amount,
            transfer_amount: res.data.data.transfer_amount,
          };
        });
        handleSelectPrimaryCode(res.data.data.primary_acc_code.id);
        handleSelectFromPrimaryCode(res.data.data.from_primary_acc_code.id);
      } else {
        throw "Something Went Wrong";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { isFetching: isFetching, refetch: reloadData } = useQuery(
    ["budget-appro-get-single", BudgetApproID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [BudgetApproID]);

  // UPDATE VOUCHER DETAILS
  const UpdateBudgetApproEntry = async (
    values: BudgetApproDetailsData
  ): Promise<BudgetApproDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BUDGET_APPRO_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(BudgetApproID),
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
    BudgetApproDetailsData,
    Error,
    BudgetApproDetailsData
  >(UpdateBudgetApproEntry, {
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

  /////////////// Handle Select Primary Accounting Code ////////////////
  const handleSelectPrimaryCode = async (id: string | number) => {
    console.log(id);
    try {
      const res = await axios({
        url: `${FINANCE_URL.ACCOUNTING_CODE_URL.getChildCodes}/1`,
        method: "GET",
      });
      if (res.data.status) {
        setSelects((prev) => ({ ...prev, f_p_codes: res.data.data }));
      } else {
        throw "Something Went Wrong";
      }
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

      if (res.data.status) {
        setSelects((prev) => ({
          ...prev,
          approved_amount: res.data?.data?.balance_amount,
        }));
      }
      throw "Something Went Wrong";
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
      API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getParentCodes}`,
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
          HANDLER: handleSelectFromPrimaryCode,
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
      {isSuccess && <SuccesfullConfirmPopup message="Updated Successfully" />}

      <RandomWorkingPopup show={isLoading} />
      <HeaderWidget
        title="Budget Appropriation"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title="Budget Appropriation"
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={budgetApproDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
