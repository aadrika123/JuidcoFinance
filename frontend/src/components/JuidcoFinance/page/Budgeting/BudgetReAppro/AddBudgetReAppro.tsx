"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { useDispatch } from "react-redux";
import { closePopup, openPopup } from "@/redux/reducers/PopupReducers";
import { FINANCE_URL } from "@/utils/api/urls";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import axios from "@/lib/axiosConfig";
import { QueryClient, useMutation } from "react-query";
import goBack, { filterValBefStoring } from "@/utils/helper";
import toast from "react-hot-toast";
import { BudgetReApproDetailsData } from "@/utils/types/budgeting/budget_re_appro_types";
import { budgetReApproDetailsSchema } from "@/utils/validation/budgeting/budget_re_appro.validation";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
// import { fields } from "./BudgetReApproFormFields";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddBudgetReAppro = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [selects, setSelects] = useState({
    f_p_codes: [],
  });
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: BudgetReApproDetailsData = {
    fin_year_id: "",
    primary_acc_code_id: "",
    transaction_date: "",
    budget_name_id: "",
    actual_amount: undefined,
    from_primary_acc_code_id: "",
    approved_amount: undefined,
    balance_amount: undefined,
    transfer_amount: undefined,
  };

  const [data, setData] = useState<BudgetReApproDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<BudgetReApproDetailsData>(initialValues);

  /////////////// Show Form Popup on Load //////////////////////
  useEffect(() => {
    dispatch(openPopup());
  }, []);

  function resetInitialValue() {
    setInitialData(initialValues);
  }

  ///////////////// Handling on Form Submit or on Form Edit ///////////////
  const onSubmit = (values: any) => {
    if (!isUpdateMode.isOnEdit) {
      setData((prev) => [...prev, { id: prev.length + 1, ...values }]);
    } else {
      setData((prev) => {
        const updatedData = prev.map((item) => {
          if (item.id === isUpdateMode.id) {
            return {
              ...item,
              fin_year_id: values.fin_year_id,
              fin_year_id_name:
                values.fin_year_id_name || item.fin_year_id_name,
              primary_acc_code_id: values.primary_acc_code_id,
              primary_acc_code_id_name:
                values.primary_acc_code_id_name ||
                item.primary_acc_code_id_name,
              transaction_date: values.transaction_date,
              budget_name_id: values.budget_name_id,
              budget_name_id_name:
                values.budget_name_id_name || item.budget_name_id_name,
              actual_amount: values.actual_amount,
              from_primary_acc_code_id: values.from_primary_acc_code_id,
              from_primary_acc_code_id_name:
                values.from_primary_acc_code_id_name ||
                item.from_primary_acc_code_id_name,
              approved_amount: values.approved_amount,
              balance_amount: values.balance_amount,
              transfer_amount: values.transfer_amount,
            };
          } else {
            return item;
          }
        });
        return updatedData;
      });
    }
    dispatch(closePopup());
    resetInitialValue();
  };

  /////////////////// Handle Storing Entries ///////////////////////////
  const handleStore = async (
    values: BudgetReApproDetailsData
  ): Promise<BudgetReApproDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BUDGET_RE_APPRO_URL.create}`,
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<BudgetReApproDetailsData, Error, any>(
    handleStore,
    {
      onSuccess: () => {
        toast.success("Added Successfully!!");
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
    }
  );

  //////////////////// Handle Reset Table List //////////////////
  const handleResetTable = () => {
    setData([]);
  };

  ///////////////// Handling Total Count ///////////////
  const handleCount = () => {
    let sum = 0;
    data.forEach((item) => {
      sum = sum + Number(item.transfer_amount);
    });
    return sum;
  };

  /////////////// Handle Select Primary Accounting Code ////////////////
  const handleSelectPrimaryCode = async (id: string | number) => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.ACCOUNTING_CODE_URL.getChildCodes}?id=${id}`,
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
        url: `${FINANCE_URL.ACCOUNTING_CODE_URL.getChildCodes}?id=${id}`,
        method: "GET",
      });
      setSelects((prev) => ({ ...prev, f_p_codes: res.data.data }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  ///////////////// Handling Remove item(row) from list ///////////////
  const onRemoveButton = (id: string) => {
    setData((prev) => {
      const filteredData = prev.filter((item) => item.id !== id);

      return filteredData.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    });
  };

  ///////////////// Handling Edit Functionality ///////////////
  const onEditButton = (id: string) => {
    const Id: number = Number(id);
    setIsUpdateMode((prev) => ({ ...prev, isOnEdit: true, id: Id }));
    setInitialData((prev) => ({
      ...prev,
      fin_year_id: data[Id - 1]?.fin_year_id,
      primary_acc_code_id: data[Id - 1]?.primary_acc_code_id,
      transaction_date: data[Id - 1]?.transaction_date,
      budget_name_id: data[Id - 1]?.budget_name_id,
      actual_amount: data[Id - 1]?.actual_amount,
      from_primary_acc_code_id: data[Id - 1]?.from_primary_acc_code_id,
      approved_amount: data[Id - 1]?.approved_amount,
      balance_amount: data[Id - 1]?.balance_amount,
      transfer_amount: data[Id - 1]?.transfer_amount,
    }));
    dispatch(openPopup());
  };

  ///////////////// Edit and Remove Button JSX ///////////////
  const addButton = (id: string) => {
    return (
      <>
        <ViewIconButton variant="edit" onClick={() => onEditButton(id)} />
        <ViewIconButton variant="delete" onClick={() => onRemoveButton(id)} />
      </>
    );
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
      API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getMainCodes}`,
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
          // VISIBILITY: false
        },
        {
          CONTROL: "input",
          HEADER: "Balance Approved Amount",
          ACCESSOR: "balance_amount",
          PLACEHOLDER: "Enter balance amount",
          TYPE: "number",
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

  // Add Table
  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "primary_acc_code_id_name",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "transaction_date ",
      caption: "Transaction Date",
      width: "w-[25%]",
    },
    {
      name: "from_primary_acc_code",
      caption: "From Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "transfer_amount",
      caption: "Transfer Amount",
      width: "w-[25%]",
    },
    {
      name: "edit/remove",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: addButton,
    },
  ];

  const footerData = [
    {
      key: "Total",
      value: handleCount(),
    },
  ];

  return (
    <>
      <Hoc
        initialValues={initialData}
        validationSchema={budgetReApproDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        resetInitialValue={resetInitialValue}
        title="Add Budget Re-Appropriation"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Budget Re-Appropriation Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
      />
    </>
  );
};
