"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closePopup, openPopup } from "@/redux/reducers/PopupReducers";
import { FINANCE_URL } from "@/utils/api/urls";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import axios from "@/lib/axiosConfig";
import { QueryClient, useMutation } from "react-query";
import goBack, { filterValBefStoring } from "@/utils/helper";
import toast from "react-hot-toast";
import { ReceiptRegisterDetailsData } from "@/utils/types/masters/receipt_register_types";
import { receiptRegisterDetailsSchema } from "@/utils/validation/masters/receipt_register.validation";
import FormikW from "./ReceiptRegisterFormFields";
import { useSelector } from "react-redux";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikW);

export const AddReceiptRegister = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
   /////////////// For Transforming in JSON

  const queryClient = new QueryClient();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: ReceiptRegisterDetailsData = {
    receipt_no: "",
    ulb_id: "",
    primary_acc_code_id: "",
    revenue_module_id: "",
    paid_by: "",
    receipt_mode_id: "",
    receipt_date: "",
    cheque_or_draft_no: "",
    bank_amount: "",
    cash_amount: "",
    bank_acc_no: "",
    deposit_date: "",
    realisation_date: "",
    wheather_returned: true,
    remarks: "",
    entered_by_id: user?.id,
    entered_by_print_name: ""
  };

  const [data, setData] = useState<ReceiptRegisterDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<ReceiptRegisterDetailsData>(initialValues);

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
      setData((prev) => [...prev, { id: prev.length + 1, ...values, entered_by_id: user.id }]);
    } else {
      setData((prev) => {
        const updatedData = prev.map((item) => {
          if (item.id === isUpdateMode.id) {
            return {
              ...item,
              receipt_no: values.receipt_no,
              ulb_id: values.ulb_id,
              ulb_id_name: values.ulb_id_name || item.ulb_id_name,
              primary_acc_code_id: values.primary_acc_code_id,
              primary_acc_code_id_name:
                values.primary_acc_code_id_name ||
                item.primary_acc_code_id_name,
              revenue_module_id: values.revenue_module_id,
              revenue_module_id_name:
                values.revenue_module_id_name || item.revenue_module_id_name,
              paid_by: values.paid_by,
              receipt_mode_id: values.receipt_mode_id,
              receipt_mode_id_name:
                values.receipt_mode_id_name || item.receipt_mode_id_name,
              receipt_date: values.receipt_date,
              cheque_or_draft_no: values.cheque_or_draft_no,
              bank_amount: values.bank_amount || item.bank_amount,
              cash_amount: values.cash_amount,
              bank_acc_no: values.bank_acc_no,
              deposit_date: values.deposit_date,
              realisation_date: values.realisation_date,
              wheather_reaturned: values.wheather_reaturned,
              remarks: values.remarks,
              entered_by_id: user.id,
              entered_by_print_name: values.entered_by_print_name,
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
    values: ReceiptRegisterDetailsData
  ): Promise<ReceiptRegisterDetailsData> => {
    try {
      console.log("first", filterValBefStoring(values))
      const res = await axios({
        url: `${FINANCE_URL.RECEIPT_REGISTER.create}`,
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<ReceiptRegisterDetailsData, Error, any>(
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
      sum = sum + Number(item.cash_amount);
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
      receipt_no: data[Id - 1]?.receipt_no,
      ulb_id: data[Id - 1]?.ulb_id,
      primary_acc_code_id: data[Id - 1]?.primary_acc_code_id,
      revenue_module_id: data[Id - 1]?.revenue_module_id,
      paid_by: data[Id - 1]?.paid_by,
      receipt_mode_id: data[Id - 1]?.receipt_mode_id,
      receipt_date: data[Id - 1]?.receipt_date,
      cheque_or_draft_no: data[Id - 1]?.cheque_or_draft_no,
      bank_amount: data[Id - 1]?.bank_amount,
      cash_amount: data[Id - 1]?.cash_amount,
      bank_acc_no: data[Id - 1]?.bank_acc_no,
      deposit_date: data[Id - 1]?.deposit_date,
      realisation_date: data[Id - 1]?.realisation_date,
      wheather_returned: data[Id - 1]?.wheather_returned,
      remarks: data[Id - 1]?.remarks,
      entered_by_id: data[Id - 1]?.entered_by_id,
      entered_by_print_name: data[Id - 1]?.entered_by_print_name
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

  // Add Table
  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "receipt_no",
      caption: "Receipt Number",
      width: "w-[25%]",
    },
    {
      name: "cash_amount",
      caption: "Amount",
      width: "w-[25%]",
    },
    {
      name: "revenue_module_id_name",
      caption: "Revenue Module Name",
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
        validationSchema={receiptRegisterDetailsSchema}
        onSubmit={onSubmit}
        resetInitialValue={resetInitialValue}
        title="Add Receipt Register"
      />
      <TableWithCount
        data={data}
        scrollable
        center
        title="Add Receipt Register Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
      />
    </>
  );
};
