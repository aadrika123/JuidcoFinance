"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import { Choice, FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { useDispatch } from "react-redux";
import { closePopup, openPopup } from "@/redux/reducers/PopupReducers";
import { FINANCE_URL } from "@/utils/api/urls";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { DirPaymentDataProps } from "@/utils/types/direct_payment_entry_types";
import { PaymentDetailsSchema } from "@/utils/validation/transactions/direct_payment.validation";
import axios from "@/lib/axiosConfig";
import { QueryClient, useMutation } from "react-query";
import goBack, { filterValBefStoring } from "@/utils/helper";
import toast from "react-hot-toast";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const HeroAddPaymentEntry = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const initialValue: DirPaymentDataProps = {
    payment_date: "",
    payment_type_id: "",
    narration: "",
    department_id: "",
    adminis_ward_id: "",
    payee_name_id: "",
    subledger_id: "",
    grant_id: "",
    address: "",
    payment_mode: "",
    user_common_budget: "",
    amount: undefined,
  };
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const [data, setData] = useState<DirPaymentDataProps[]>([]);
  const [initialData, setInitialData] =
    useState<DirPaymentDataProps>(initialValue);
  //////////// Reseting InitialData on FormikPopup off //////////////
  const resetInitialValue = () => {
    setInitialData(initialValue);
  };

  /////////////// Show Form Popup on Load //////////////////////
  useEffect(() => {
    dispatch(openPopup());
  }, []);

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
              adminis_ward_id: values.adminis_ward_id,
              adminis_ward_id_name:
                values.adminis_ward_id_name || item.adminis_ward_id_name,
              amount: values.amount,
              department_id: values.department_id,
              department_id_name:
                values.department_id_name || item.department_id_name,
              narration: values.narration,
              subledger_id: values.subledger_id,
              subledger_id_name:
                values.subledger_id_name || item.subledger_id_name,
              payment_date: values.payment_date,
              payment_mode: values.payment_mode,
              user_common_budget: values.user_common_budget,
              payee_name_id: values.payee_name_id,
              payee_name_id_name:
                values.payee_name_id_name || item.payee_name_id_name,
              payment_type_id: values.payment_type_id,
              payment_type_id_name:
                values.payment_type_id_name || item.payment_type_id_name,
              grant_id: values.grant_id,
              grant_id_name: values.grant_id_name || item.grant_id_name,
              address: values.address,
            };
          } else {
            return item;
          }
        });
        return updatedData;
      });
    }
    resetInitialValue();
    dispatch(closePopup());
  };

  /////////////////// Handle Storing Entries ///////////////////////////
  const handleStore = async (
    values: DirPaymentDataProps
  ): Promise<DirPaymentDataProps> => {
    try {
     const res = await axios({
        url: `${FINANCE_URL.DIRECT_PAYMENT_ENTRY_URL.create}`,  
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<
    DirPaymentDataProps,
    Error,
    any
  >(handleStore, {
    onSuccess: () => {
      toast.success("Updated Direct Payment Entry");
    },
    onError: () => {
      alert("Error updating Direct Payment Entry");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      setTimeout(() => {
        goBack();
      }, 1000);
    },
  });

   //////////////////// Handle Reset Table List //////////////////
   const handleResetTable = () =>{
    setData([]);
  }

  ///////////////// Handling Total Count ///////////////
  const handleCount = () => {
    let sum = 0;
    data.forEach((item) => {
      sum = sum + Number(item.amount);
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
      payment_date: data[Id - 1]?.payment_date,
      payment_type_id: data[Id - 1]?.payment_type_id,
      narration: data[Id - 1]?.narration,
      department_id: data[Id - 1]?.department_id,
      adminis_ward_id: data[Id - 1]?.adminis_ward_id,
      payee_name_id: data[Id - 1]?.payee_name_id,
      subledger_id: data[Id - 1]?.subledger_id,
      amount: data[Id - 1]?.amount,
      payment_mode: data[Id - 1]?.payment_mode,
      user_common_budget: data[Id - 1]?.user_common_budget || true,
      address: data[Id - 1]?.address,
      grant_id: data[Id - 1]?.grant_id,
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
      name: "subledger_id_name",
      caption: "Sub-Ledge Code",
      width: "w-[30%]",
    },
    { name: "amount", caption: "Amount(Rs) ", width: "w-[20%]" },
    {
      name: "payment_mode",
      caption: "Payment Mode",
      width: "w-[30%]",
    },
    {
      name: "button",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: addButton,
    },
  ];

  /////  Radio buttons list
  const choices: Choice[] = [
    { key: "Cash", value: "cash" },
    { key: "Cheque", value: "cheque" },
    { key: "NFT/RTGS", value: "NFT/RTGS" },
  ];

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Payment Date",
      ACCESSOR: "payment_date",
      PLACEHOLDER: "DD/MM/YYYY",
      TYPE: "date",
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
      HEADER: "Payment Type",
      ACCESSOR: "payment_type_id",
      PLACEHOLDER: "Select Payment Type",
      API: `${FINANCE_URL.PAYMENT_TYPE_URL.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Department Name",
      ACCESSOR: "department_id",
      PLACEHOLDER: "Select Department",
      API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Payee Name",
      ACCESSOR: "payee_name_id",
      PLACEHOLDER: "Select Payee Name",
      API: `${FINANCE_URL.VOUCHER_TYPE_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Administration Ward",
      ACCESSOR: "adminis_ward_id",
      PLACEHOLDER: "Select Administration Ward",
      API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
    },

    {
      CONTROL: "textarea",
      HEADER: "Narration",
      ACCESSOR: "narration",
      PLACEHOLDER: "Enter Narration",
    },
    {
      CONTROL: "textarea",
      HEADER: "Address",
      ACCESSOR: "address",
      PLACEHOLDER: "Enter Address",
    },
    {
      CONTROL: "select",
      HEADER: "Sub Ledger",
      ACCESSOR: "subledger_id",
      PLACEHOLDER: "Select Sub Ledger",
      API: `${FINANCE_URL.SUB_LEDGER_URL.getCodes}`,
    },
    {
      CONTROL: "input",
      HEADER: "Amount",
      ACCESSOR: "amount",
      PLACEHOLDER: "Amount",
      TYPE: "number",
    },
    {
      CONTROL: "checkbox",
      HEADER: "User Common Budget",
      ACCESSOR: "user_common_budget",
      TYPE: "checkbox",
    },
    {
      CONTROL: "radio",
      HEADER: "Payment Mode",
      ACCESSOR: "payment_mode",
      OPTIONS: choices,
      TYPE: "radio",
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
        validationSchema={PaymentDetailsSchema}
        resetInitialValue={resetInitialValue}
        onSubmit={onSubmit}
        fields={fields}
        title="Add New Entry"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add New Entry"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
      />
    </>
  );
};
