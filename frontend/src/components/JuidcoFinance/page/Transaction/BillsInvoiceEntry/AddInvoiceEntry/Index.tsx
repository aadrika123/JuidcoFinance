"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { useDispatch } from "react-redux";
import { closePopup, openPopup } from "@/redux/reducers/PopupReducers";
import { FINANCE_URL } from "@/utils/api/urls";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { BillInvoiceDetailsData } from "@/utils/types/bills_invoice_entry_types";
import { BillInvoiceDetailsSchema } from "@/utils/validation/transactions/bill_invoice.validation";
import axios from "@/lib/axiosConfig";
import { QueryClient, useMutation } from "react-query";
import goBack, { filterValBefStoring } from "@/utils/helper";
import toast from "react-hot-toast";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddBillsPaymentEntry = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: BillInvoiceDetailsData = {
    entry_date: "",
    type_id: "",
    bill_no: "",
    department_id: "",
    admin_ward_id: "",
    bill_date: "",
    stage_id: "",
    vendor_id: "",
    amount: "",
    address: "",
    narration: "",
  };
  const [data, setData] = useState<BillInvoiceDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<BillInvoiceDetailsData>(initialValues);

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
              bill_no: values.bill_no,
              bill_date: values.bill_date,
              address: values.address,
              admin_ward_id: values.admin_ward_id,
              admin_ward_id_name:
                values.admin_ward_id_name || item.admin_ward_id_name,
              amount: values.amount,
              department_id: values.department_id,
              department_id_name:
                values.department_id_name || item.department_id_name,
              narration: values.narration,
              stage_id: values.stage_id,
              stage_id_name: values.stage_id_name || item.stage_id_name,
              entry_date: values.entry_date,
              vendor_id: values.vendor_id,
              vendor_id_name: values.vendor_id_name || item.vendor_id_name,
              type_id: values.type_id,
              type_id_name: values.type_id_name || item.type_id_name,
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
    values: BillInvoiceDetailsData
  ): Promise<BillInvoiceDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.create}`,
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<BillInvoiceDetailsData, Error, any>(
    handleStore,
    {
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
      entry_date: data[Id - 1]?.entry_date,
      bill_date: data[Id - 1]?.bill_date,
      type_id: data[Id - 1]?.type_id,
      narration: data[Id - 1]?.narration,
      department_id: data[Id - 1]?.department_id,
      admin_ward_id: data[Id - 1]?.admin_ward_id,
      vendor_id: data[Id - 1]?.vendor_id,
      stage_id: data[Id - 1]?.stage_id,
      amount: data[Id - 1]?.amount,
      address: data[Id - 1]?.address,
      bill_no: data[Id - 1]?.bill_no,
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
      name: "bill_no",
      caption: "Bill Number",
      width: "w-[25%]",
    },

    {
      name: "vendor_id_name",
      caption: "Vendor Name",
      width: "w-[20%]",
    },
    { name: "department_id_name", caption: "Department", width: "w-[15%]" },

    { name: "amount", caption: "Amount(Rs) ", width: "w-[20%]" },
    {
      name: "edit/remove",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: addButton,
    },
  ];

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    // Add Bill/Invoice
    { TITLE: "Add Bill/Invoice" },
    {
      CONTROL: "input",
      HEADER: "Bill Number",
      ACCESSOR: "bill_no",
      PLACEHOLDER: "Enter Bill Number",
    },
    {
      CONTROL: "select",
      HEADER: "Bill Type",
      ACCESSOR: "type_id",
      PLACEHOLDER: "Select Bill Type",
      API: `${FINANCE_URL.BILL_TYPE.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Vendor Name",
      ACCESSOR: "vendor_id",
      PLACEHOLDER: "Select Vendor Type",
      API: `${FINANCE_URL.EMPLOYEE_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Department",
      ACCESSOR: "department_id",
      PLACEHOLDER: "Select Department",
      API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Bill Entry Date",
      ACCESSOR: "entry_date",
      TYPE: "date",
    },

    {
      CONTROL: "input",
      HEADER: "Narration",
      ACCESSOR: "narration",
      PLACEHOLDER: "Enter Narration",
    },

    {
      CONTROL: "select",
      HEADER: "Bill Stage",
      ACCESSOR: "stage_id",
      PLACEHOLDER: "Select Bill State",
      API: `${FINANCE_URL.BILL_TYPE.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Bill Date",
      ACCESSOR: "bill_date",
      TYPE: "date",
    },
    {
      CONTROL: "input",
      HEADER: "Address",
      ACCESSOR: "address",
      PLACEHOLDER: "Enter Address",
    },
    {
      CONTROL: "select",
      HEADER: "Administration Ward",
      ACCESSOR: "admin_ward_id",
      PLACEHOLDER: "Select Administration Ward",
      API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Bill Amount",
      ACCESSOR: "amount",
      TYPE: "number",
      PLACEHOLDER: "Enter amount",
    },

    // Deduction Details
    // { TITLE: "Deduction Details" },
    // {
    //   CONTROL: "select",
    //   HEADER: "Vendor Name",
    //   ACCESSOR: "voucher_id",
    //   PLACEHOLDER: "Select Vendor Name",
    //   API: `${FINANCE_URL.VOUCHER_SUB_TYPE_URL.get}`,
    // },

    // {
    //   CONTROL: "input",
    //   HEADER: "Concerned Work",
    //   ACCESSOR: "dr_cr",
    //   PLACEHOLDER: "Select Dr/Cr",
    //   API: "/bill-type/get",
    // },
    // {
    //   CONTROL: "input",
    //   HEADER: "Advance",
    //   ACCESSOR: "advance",
    //   PLACEHOLDER: "Enter Advance",
    //   TYPE: "number",
      
    // },
    // {
    //   CONTROL: "input",
    //   HEADER: "Amount",
    //   ACCESSOR: "amount1",
    //   TYPE: "number",
    //   PLACEHOLDER: "Enter amount",
    // },
    // {
    //   CONTROL: "input",
    //   HEADER: "Deposit",
    //   ACCESSOR: "deposit",
    //   TYPE: "number",
    //   PLACEHOLDER: "Enter deposit",
    // },
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
        validationSchema={BillInvoiceDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        resetInitialValue={resetInitialValue}
        title=""
      />
      <TableWithCount
        data={data}
        scrollable
        title="Bills Invoice Entry Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
      />
    </>
  );
};
