"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import { useDispatch } from "react-redux";
import { closePopup, openPopup } from "@/redux/reducers/PopupReducers";
import { FINANCE_URL } from "@/utils/api/urls";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { ReceiptDataProps } from "@/utils/types/receipt_entry_types";
import APIs from "@/json/apis.json";
import { ReceiptDetailsSchema } from "@/utils/validation/transactions/receipt_entry.validation";
import FormikWrapperV from "@/components/global/organisms/FormikContainerV";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapperV);

export const AddReceipt = () => {
  const dispatch = useDispatch();
  const initialValue: ReceiptDataProps = {
    date: "",
    email: "",
    receipt_no: "",
    module_id: "",
    paid_by: "",
    receipt_type_id: "",
    mobile_no: "",
    admin_ward_id: "",
    narration: "",
    subledger_id: "",
    amount: 0,
  }
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const [data, setData] = useState<ReceiptDataProps[]>([]);
  const [initialData, setInitialData] = useState<ReceiptDataProps>(initialValue);
  //////////// Reseting InitialData on FormikPopup off //////////////
  const resetInitialValue = () =>{
    setInitialData(initialValue);
  }

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
              date: values.date,
              email: values.email,
              receipt_no: values.receipt_no,

              module_id: values.module_id,
              module_id_name: values.module_id_name || item.module_id_name,

              paid_by: values.paid_by,
              
              receipt_type_id: values.receipt_type_id,
              receipt_type_id_name: values.receipt_type_id_name || item.receipt_type_id_name,
              
              mobile_no: values.mobile_no,

              admin_ward_id: values.admin_ward_id,
              admin_ward_id_name: values.admin_ward_id_name || item.admin_ward_id_name,
              
              amount: values.amount,
              
              narration: values.narration,
              
              subledger_id: values.subledger_id,
              subledger_id_name: values.subledger_id_name || item.subledger_id_name,

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
      date: data[Id - 1]?.date,
      email: data[Id - 1]?.email,
      receipt_no: data[Id - 1]?.receipt_no,
      module_id: data[Id - 1]?.module_id,
      paid_by: data[Id - 1]?.paid_by,
      receipt_type_id: data[Id - 1]?.receipt_type_id,
      mobile_no: data[Id - 1]?.mobile_no,
      admin_ward_id: data[Id - 1]?.admin_ward_id,
      narration: data[Id - 1]?.narration,
      subledger_id: data[Id - 1]?.subledger_id,
      amount: data[Id - 1]?.amount,
    }));
    dispatch(openPopup());
  };

  ///////////////// Edit and Remove Button JSX ///////////////
  const addButton = (id: string) => {
    return (
      <>
        <ViewIconButton variant="edit" onClick={() => onEditButton(id)} />
        <ViewIconButton variant="view" onClick={() => onRemoveButton(id)} />
      </>
    );
  };

  // Add Table
  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "subledger_id_name",
      caption: "Sub-Ledger/Name",
      width: "w-[25%]",
    },
    { name: "amount", caption: "Amount(Rs) ", width: "w-[20%]" },
    {
      name: "receipt_type_id_name",
      caption: "Payment Mode",
      width: "w-[20%]",
    },
    {
      name: "button",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: addButton,
    },
  ];


    // Add Input Fields
    const fields: FieldTypeProps[] = [
      {
        CONTROL: "input",
        HEADER: "Receipt Date",
        ACCESSOR: "date",
        PLACEHOLDER: "DD/MM/YYYY",
        TYPE: "date",
      },
      {
        CONTROL: "input",
        HEADER: "Email",
        ACCESSOR: "email",
        PLACEHOLDER: "Example: ramesh@gmail.com",
      },
      {
        CONTROL: "input",
        HEADER: "Receipt Number",
        ACCESSOR: "receipt_no",
        PLACEHOLDER: "Example: 2444234324243"
      },
  
      {
        CONTROL: "select",
        HEADER: "Module",
        ACCESSOR: "module_id",
        PLACEHOLDER: "Select Module",
        API: `${APIs.modules_root}`,
      },
      {
        CONTROL: "input",
        HEADER: "Paid By",
        ACCESSOR: "paid_by",
        PLACEHOLDER: "Example: "
      },
  
      {
        CONTROL: "select",
        HEADER: "Receipt Type",
        ACCESSOR: "receipt_type_id",
        PLACEHOLDER: "Select Receipt Type",
        API: `${APIs.receipt_type_root}`,
      },
  
      {
        CONTROL: "input",
        HEADER: "Mobile No",
        ACCESSOR: "mobile_no",
        PLACEHOLDER: "Example: 3283838"
      },
      {
        CONTROL: "select",
        HEADER: "Admin Ward",
        ACCESSOR: "admin_ward_id",
        PLACEHOLDER: "",
        API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
      },
      {
        CONTROL: "input",
        HEADER: "Narration",
        ACCESSOR: "narration",
        PLACEHOLDER: "Example: 3283838"
      },
      {
        CONTROL: "select",
        HEADER: "Subledger",
        ACCESSOR: "subledger_id",
        PLACEHOLDER: "Select Subledger",
        API: `${FINANCE_URL.SUB_LEDGER_URL.get}`,
      },
      {
        CONTROL: "input",
        HEADER: "Amount",
        ACCESSOR: "amount",
        PLACEHOLDER: "Example: 3283838"
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
        validationSchema={ReceiptDetailsSchema}
        resetInitialValue={resetInitialValue}
        onSubmit={onSubmit}
        fields={fields}
        title="Add New Entry"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Title 1"
        columns={columns}
        footerData={footerData}
      />
    </>
  );
};
