"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { useDispatch } from "react-redux";
import { closePopup, openPopup } from "@/redux/reducers/PopupReducers";
import { FINANCE_URL } from "@/utils/api/urls";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { BillPaymentDetailsData } from "@/utils/types/bill_payment_entry_types";
import { BillPaymentDetailsSchema } from "@/utils/validation/transactions/bill_payment.validation";
import axios from "@/lib/axiosConfig";
import { QueryClient, useMutation } from "react-query";
import goBack, { filterValBefStoring } from "@/utils/helper";
import toast from "react-hot-toast";
import { fields } from "../BillPaymentFormFields";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const HeroAddBillPaymentEntry = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const initialValue: BillPaymentDetailsData = {
    bill_no: "",
    bill_entry_date: "",
    bill_type_id: "",
    vendor_id: "",
    department_id: "",
    adminis_ward_id: "",
    payee_id: "",
    bill_amount: "",
    advance: "",
    address: "",
    deposit: "",
    deductions_amount: "",
  };
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const [data, setData] = useState<BillPaymentDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<BillPaymentDetailsData>(initialValue);
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
              bill_no: values.bill_no,
              bill_entry_date: values.bill_entry_date,
              bill_type_id: values.bill_type_id,
              vendor_id: values.vendor_id,
              vendor_id_name:
                values.vendor_id_name || item.vendor_id_name,
              adminis_ward_id: values.adminis_ward_id,
              adminis_ward_id_name:
                values.adminis_ward_id_name || item.adminis_ward_id_name,
              bill_amount: values.bill_amount,
              department_id: values.department_id,
              department_id_name:
                values.department_id_name || item.department_id_name,
              payee_id: values.payee_id,
              payee_id_name:
                values.payee_id_name || item.payee_id_name,
              address: values.address,
              advance: values.advance,
              deposit: values.deposit,
              deductions_amount: values.deductions_amount,
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
    values: BillPaymentDetailsData
  ): Promise<BillPaymentDetailsData> => {
    try {
     const res = await axios({
        url: `${FINANCE_URL.BILL_PAYMENT_ENTRY_URL.create}`,
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
    BillPaymentDetailsData,
    Error,
    any
  >(handleStore, {
    onSuccess: () => {
      toast.success("Bill Payment Entry Added Successfully!!");
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
  const handleResetTable = () =>{
    setData([]);
  }

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

  ///////////////// Handle Things Before Adding New Entery ///////////
  const handleAddNewEntery = () =>{
    setIsUpdateMode({
      id: "",
      isOnEdit: false,
    })
  }

  ///////////////// Handling Edit Functionality ///////////////
  const onEditButton = (id: string) => {
    const Id: number = Number(id);
    setIsUpdateMode((prev) => ({ ...prev, isOnEdit: true, id: Id }));
    setInitialData((prev) => ({
      ...prev,
      bill_no: data[Id - 1]?.bill_no,
    bill_entry_date: data[Id - 1]?.bill_entry_date,
    bill_type_id: data[Id - 1]?.bill_type_id,
    vendor_id: data[Id - 1]?.vendor_id,
    department_id: data[Id - 1]?.department_id,
    adminis_ward_id: data[Id - 1]?.adminis_ward_id,
    payee_id: data[Id - 1]?.payee_id,
    bill_amount: data[Id - 1]?.bill_amount,
    advance: data[Id - 1]?.advance,
    address: data[Id - 1]?.address,
    deposit: data[Id - 1]?.deposit,
    deductions_amount: data[Id - 1]?.deductions_amount,
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
      name: "vendor_id_name",
      caption: "Vendor Name",
      width: "w-[30%]",
    },
    {
      name: "payee_id_name",
      caption: "Payee Name",
      width: "w-[30%]",
    },
    { name: "bill_amount", caption: "Bill Amount", width: "w-[20%]" },
    
    {
      name: "button",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: addButton,
    },
  ];


  return (
    <>
      <Hoc
        initialValues={initialData}
        validationSchema={BillPaymentDetailsSchema}
        resetInitialValue={resetInitialValue}
        onSubmit={onSubmit}
        fields={fields}
        title="Add New Bill Payment Entry"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Bill Payment Entry"
        columns={columns}
        handleStore={mutate}
        handleResetTable={handleResetTable}
        handleAddNewEntery={handleAddNewEntery}
      />
    </>
  );
};
