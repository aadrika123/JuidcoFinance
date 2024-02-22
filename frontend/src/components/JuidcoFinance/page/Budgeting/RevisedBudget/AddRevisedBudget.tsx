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
import { RevisedBudgetDetailsData } from "@/utils/types/budgeting/revised_budget_types";
import { revisedBudgetDetailsSchema } from "@/utils/validation/budgeting/revised_budget.validation";
import { fields } from "./RevisedBudgetFormFields";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddRevisedBudget = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: RevisedBudgetDetailsData = {
    primary_acc_code_id: "",
    approved_amount: undefined,
    revised_amount: undefined,
    remarks: "",
  };

  const [data, setData] = useState<RevisedBudgetDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<RevisedBudgetDetailsData>(initialValues);

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
              primary_acc_code_id: values.primary_acc_code_id,
              primary_acc_code_id_name:
                values.primary_acc_code_id_name ||
                item.primary_acc_code_id_name,
              approved_amount: values.approved_amount,
              revised_amount: values.revised_amount,
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
    values: RevisedBudgetDetailsData
  ): Promise<RevisedBudgetDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.REVISED_BUDGET_URL.create}`,
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<RevisedBudgetDetailsData, Error, any>(
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
      sum = sum + Number(item.revised_amount);
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
      primary_acc_code_id: data[Id - 1]?.primary_acc_code_id,
      approved_amount: data[Id - 1]?.approved_amount,
      revised_amount: data[Id - 1]?.revised_amount,
      remarks: data[Id - 1]?.remarks,
    }));
    dispatch(openPopup());
  };

  ///////////////// Handle Things Before Adding New Entery ///////////
  const handleAddNewEntery = () =>{
    setIsUpdateMode({
      id: "",
      isOnEdit: false,
    })
  }

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
      name: "primary_acc_code_id_name",
      caption: "Primary Accounting Code",
      width: "w-[20%]",
    },
    {
      name: "approved_amount",
      caption: "Approved Budget Amount",
      width: "w-[20%]",
    },
    {
      name: "revised_amount",
      caption: "Revised Budget Amount",
      width: "w-[20%]",
    },
    {
      name: "remarks",
      caption: "Remarks",
      width: "w-[18%]",
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
        validationSchema={revisedBudgetDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        resetInitialValue={resetInitialValue}
        title="Add Revised Budget"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Revised Budget Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
        handleAddNewEntery={handleAddNewEntery}
      />
    </>
  );
};
