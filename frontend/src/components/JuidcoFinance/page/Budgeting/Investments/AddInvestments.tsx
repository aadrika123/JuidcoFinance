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
import { fields } from "./InvestmentsFormFields";
import { InvestmentsDetailsData } from "./investments_types";
import { investmentsDetailsSchema } from "./investments.validation";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddInvestments = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: InvestmentsDetailsData = {
    ulb_id: "",
    primary_acc_code_id: "",
    investment_no: "",
    authorization_date: "",
    investment_date: "",
    particulars: "",
    investment_type_id: "",
    purchase_amount: undefined,
    face_value_amount: undefined,
    interest_due_date: "",
    interest_due_amount: undefined,
    employee_id: "",
    interest_recovered_amount: undefined,
    interest_recovery_date: "",
    acc_adj_recovery_date: "",
    realization_final_amount: undefined,
    realization_date: "",
    acc_adj_realization_date: "",
    remarks: "",
  };

  const [data, setData] = useState<InvestmentsDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<InvestmentsDetailsData>(initialValues);

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
              ulb_id: values.ulb_id,
              ulb_id_name: values.ulb_id_name || item.ulb_id_name,
              primary_acc_code_id: values.primary_acc_code_id,
              primary_acc_code_id_name:
                values.primary_acc_code_id_name ||
                item.primary_acc_code_id_name,
              investment_no: values.investment_no,
              authorization_date: values.authorization_date,
              investment_date: values.investment_date,
              particulars: values.particulars,
              investment_type_id: values.investment_type_id,
              investment_type_id_name:
                values.investment_type_id_name || item.investment_type_id_name,
              purchase_amount: values.purchase_amount,
              face_value_amount: values.face_value_amount,
              interest_due_date: values.interest_due_date,
              interest_due_amount: values.interest_due_amount,
              employee_id: values.employee_id,
              employee_id_name:
                values.employee_id_name || item.employee_id_name,
              interest_recovered_amount: values.interest_recovered_amount,
              interest_recovery_date: values.interest_recovery_date,
              acc_adj_recovery_date: values.acc_adj_recovery_date,
              realization_final_amount: values.realization_final_amount,
              realization_date: values.realization_date,
              acc_adj_realization_date: values.acc_adj_realization_date,
              remarks: values.remarks,
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
    values: InvestmentsDetailsData
  ): Promise<InvestmentsDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.INVESTMENT_URL.create}`,
        method: "POST",
        data: {
          data: filterValBefStoring(values),
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

  const { mutate, isLoading, isSuccess } = useMutation<
    InvestmentsDetailsData,
    Error,
    any
  >(handleStore, {
    onSuccess: () => {
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

  //////////////////// Handle Reset Table List //////////////////
  const handleResetTable = () => {
    setData([]);
  };

  ///////////////// Handling Total Count ///////////////
  const handleCount = () => {
    let sum = 0;
    data.forEach((item) => {
      sum = sum + Number(item.face_value_amount);
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
      ulb_id: data[Id - 1]?.ulb_id,
      primary_acc_code_id: data[Id - 1]?.primary_acc_code_id,
      investment_no: data[Id - 1]?.investment_no,
      authorization_date: data[Id - 1]?.authorization_date,
      investment_date: data[Id - 1]?.investment_date,
      particulars: data[Id - 1]?.particulars,
      investment_type_id: data[Id - 1]?.investment_type_id,
      purchase_amount: data[Id - 1]?.purchase_amount,
      face_value_amount: data[Id - 1]?.face_value_amount,
      interest_due_date: data[Id - 1]?.interest_due_date,
      interest_due_amount: data[Id - 1]?.interest_due_amount,
      employee_id: data[Id - 1]?.employee_id,
      interest_recovered_amount: data[Id - 1]?.interest_recovered_amount,
      interest_recovery_date: data[Id - 1]?.interest_recovery_date,
      acc_adj_recovery_date: data[Id - 1]?.acc_adj_recovery_date,
      realization_final_amount: data[Id - 1]?.realization_final_amount,
      realization_date: data[Id - 1]?.realization_date,
      acc_adj_realization_date: data[Id - 1]?.acc_adj_realization_date,
      remarks: data[Id - 1]?.remarks,
    }));
    dispatch(openPopup());
  };

  ///////////////// Handle Things Before Adding New Entery ///////////
  const handleAddNewEntery = () => {
    setIsUpdateMode({
      id: "",
      isOnEdit: false,
    });
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

  // Add Table
  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "investment_no",
      caption: "Investment Number",
      width: "w-[25%]",
    },
    {
      name: "purchase_amount",
      caption: "Purchase Price",
      width: "w-[25%]",
    },
    {
      name: "face_value_amount",
      caption: "Face Value Price",
      width: "w-[25%]",
    },
    {
      name: "investment_date",
      caption: "Date of Investments",
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
      {isSuccess && <SuccesfullConfirmPopup message="Saved Successfully" />}

      <RandomWorkingPopup show={isLoading} />
      <Hoc
        initialValues={initialData}
        validationSchema={investmentsDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        resetInitialValue={resetInitialValue}
        title="Add Investments"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Investments Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
        handleAddNewEntery={handleAddNewEntery}
      />
    </>
  );
};
