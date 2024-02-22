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
import { budgetApproDetailsSchema } from "@/utils/validation/budgeting/budget_appro.validation";
import { BudgetApproDetailsData } from "@/utils/types/budgeting/budget_appro_types";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddBudgetAppro = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [selects, setSelects] = useState({
    f_p_codes: [],
    approved_amount: undefined,
  });
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: BudgetApproDetailsData = {
    fin_year_id: "",
    primary_acc_code_id: "",
    remark: "",
    from_primary_acc_code_id: "",
    approved_amount: undefined,
    transfer_amount: undefined,
  };

  const [data, setData] = useState<BudgetApproDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<BudgetApproDetailsData>(initialValues);
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
              remark: values.remark,
              from_primary_acc_code_id: values.from_primary_acc_code_id,
              from_primary_acc_code_id_name:
                values.from_primary_acc_code_id_name ||
                item.from_primary_acc_code_id_name,
              approved_amount: selects.approved_amount,
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
    values: BudgetApproDetailsData
  ): Promise<BudgetApproDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BUDGET_APPRO_URL.create}`,
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<BudgetApproDetailsData, Error, any>(
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

  /////////////// Handle Select Primary Accounting Code ////////////////
  const handleSelectPrimaryCode = async (id: string | number) => {
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
        approved_amount: res.data?.data?.balance_amount,
      }));
      setInitialData((prev) => ({
        ...prev,
        approved_amount: res.data?.data?.balance_amount,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  ///////////////// Handling Total Count ///////////////
  const handleCount = () => {
    let sum = 0;
    data.forEach((item) => {
      sum = sum + Number(item.transfer_amount);
    });
    return sum;
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
      remark: data[Id - 1]?.remark,
      from_primary_acc_code_id: data[Id - 1]?.from_primary_acc_code_id,
      approved_amount: data[Id - 1]?.approved_amount,
      transfer_amount: data[Id - 1]?.transfer_amount,
    }));
    handleSelectPrimaryCode(data[Id - 1]?.primary_acc_code_id)
    handleSelectFromPrimaryCode(data[Id - 1]?.from_primary_acc_code_id)
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

  ///////////////// Handle Things Before Adding New Entery ///////////
  const handleAddNewEntery = () =>{
    setIsUpdateMode({
      id: "",
      isOnEdit: false,
    })
    setSelects({
      f_p_codes: [],
      approved_amount: undefined,
    });
  }

  // Add Table
  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "primary_acc_code_id_name",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "from_primary_acc_code_id_name",
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
          // READONLY: true,
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

  const footerData = [
    {
      key: "Total Transfer Amount",
      value: handleCount(),
    },
  ];

  return (
    <>
      <Hoc
        initialValues={initialData}
        validationSchema={budgetApproDetailsSchema}
        onSubmit={onSubmit}
        // enableReinitialize={true}
        fields={fields}
        resetInitialValue={resetInitialValue}
        title="Add Budget Appropriation"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Budget Appropriation Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
        handleAddNewEntery={handleAddNewEntery}
      />
    </>
  );
};
