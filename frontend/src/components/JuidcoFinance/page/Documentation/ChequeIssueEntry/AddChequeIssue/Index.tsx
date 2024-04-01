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
import { ChequeIssueEntryData } from "@/utils/types/cheque_issue_entry_types";
import { chequeIssueValidationSchema } from "@/utils/validation/documentation/cheque_issue_entry.validation";
import { useMutation, QueryClient } from "react-query";
import toast from "react-hot-toast";
import goBack, { filterValBefStoring } from "@/utils/helper";
import axios from "@/lib/axiosConfig";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddChequeIssueEntry = () => {
  const dispatch = useDispatch();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: ChequeIssueEntryData = {
    voucher_no: "",
    voucher_date: "",
    bill_type_id: 0,
    narration: "",
    admin_ward_id: 0,
    payee_id: 0,
    grant_id: 0,
    bank_id: 0,
    module_id: 0,
    issue_date: "",
    cheque_no: "",
    amount: "",
  };
  const [data, setData] = useState<ChequeIssueEntryData[]>([]);
  const [initialData, setInitialData] =
    useState<ChequeIssueEntryData>(initialValues);

  /////////////// Show Form Popup on Load //////////////////////
  useEffect(() => {
    dispatch(openPopup());
  }, []);

  function resetInitialValue() {
    setInitialData(initialValues);
  }

  ///////////////// Handling on Form Submit or on Form Edit ///////////////
  const onSubmit = (values: any): void => {
    if (!isUpdateMode.isOnEdit) {
      setData((prev) => [...prev, { id: prev.length + 1, ...values }]);
    } else {
      setData((prev) => {
        const updatedData = prev.map((item) => {
          if (item.id === isUpdateMode.id) {
            return {
              ...item,
              voucher_no: item.voucher_no,
              voucher_date: item.voucher_date,
              bill_type_id: item.bill_type_id,
              bill_type_id_name:
                values.bill_type_id_name || item.bill_type_id_name,
              narration: item.narration,
              admin_ward_id: item.admin_ward_id,
              admin_ward_id_name:
                values.admin_ward_id_name || item.admin_ward_id,
              payee_id: item.payee_id,
              payee_id_name: values.payee_id_name || item.payee_id_name,
              grant_id: item.grant_id,
              grant_id_name: values.grant_id_name || item.grant_id_name,
              bank_id: item.bank_id,
              bank_id_name: values.bank_id_name || item.bank_id_name,
              module_id: item.module_id,
              module_id_name: values.module_id_name || item.module_id_name,
              issue_date: item.issue_date,
              cheque_no: item.cheque_no,
              amount: item.amount,
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

  const queryClient = new QueryClient();
  // store multiple data in row
  const handleStore = async (
    values: ChequeIssueEntryData
  ): Promise<ChequeIssueEntryData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.CHEQUE_ISSUE_ENTRY.create}`,
        method: "POST",
        data: {
        data: filterValBefStoring(values)
      },
    });
    if(res.data.status){

      return res.data;
    } 
    throw "Something Went Wrong";
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<ChequeIssueEntryData, Error, any>(
    handleStore,
    {
      onSuccess: () => {
        toast.success("Added Cheque Issue Entry");
        setTimeout(() => {
          goBack();
        }, 1000);
      },
      onError: () => {
        alert("Something Went Wrong!!!");
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

   ///////////////// Handle Things Before Adding New Entery ///////////
   const handleAddNewEntery = () =>{
    setIsUpdateMode({
      id: "",
      isOnEdit: false,
    })
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
      voucher_no: data[Id - 1].voucher_no,
      voucher_date: data[Id - 1].voucher_date,
      bill_type_id: data[Id - 1].bill_type_id,
      narration: data[Id - 1].narration,
      admin_ward_id: data[Id - 1].admin_ward_id,
      payee_id: data[Id - 1].payee_id,
      grant_id: data[Id - 1].grant_id,
      bank_id: data[Id - 1].bank_id,
      module_id: data[Id - 1].module_id,
      issue_date: data[Id - 1].issue_date,
      cheque_no: data[Id - 1].cheque_no,
      amount: data[Id - 1].amount,
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
      name: "issue_date",
      caption: "Issue date",
      width: "w-[25%]",
    },
    { name: "module_id_name", caption: "Module Name ", width: "w-[20%]" },
    {
      name: "cheque_no",
      caption: "Cheque No.",
      width: "w-[20%]",
    },
    { name: "amount", caption: "Amount(Rs) ", width: "w-[20%]" },
    {
      name: "",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: addButton,
    },
  ];

  // Add Input Fields
   // Add Input Fields
   const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Payment Voucher No",
      ACCESSOR: "voucher_no",
      PLACEHOLDER: "Enter Voucher No",
    },
    {
      CONTROL: "input",
      HEADER: "Payment Voucher Date",
      ACCESSOR: "voucher_date",
      PLACEHOLDER: "YYYY-MM-DD",
      TYPE: "date",
    },
    {
      CONTROL: "select",
      HEADER: "Type of Bill",
      ACCESSOR: "bill_type_id",
      PLACEHOLDER: "Select Bill Type",
      API: `${FINANCE_URL.BILL_TYPE.get}`,
    },

    {
      CONTROL: "input",
      HEADER: "Narration",
      ACCESSOR: "narration",
      PLACEHOLDER: "Enter Narration",
    },

    {
      CONTROL: "select",
      HEADER: "Administration Ward",
      ACCESSOR: "admin_ward_id",
      PLACEHOLDER: "Select Administration Ward",
      API: `${FINANCE_URL.ADMINIS_WARD_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Payee Name",
      ACCESSOR: "payee_id",
      PLACEHOLDER: "Select Payee Name",
      API: `${FINANCE_URL.EMPLOYEE_URL.get}`,
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
      HEADER: "Department",
      ACCESSOR: "department_id",
      PLACEHOLDER: "Select Department",
      API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Bank Name",
      ACCESSOR: "bank_id",
      PLACEHOLDER: "Select Bank Name",
      API: `${FINANCE_URL.BANK_URL.get}`,
    },
    {
      CONTROL: "select",
      HEADER: "Module Name",
      ACCESSOR: "module_id",
      PLACEHOLDER: "Select Module Name",
      API: `${FINANCE_URL.MODULE_URL.get}`,
    },
    {
      CONTROL: "input",
      HEADER: "Issue Date",
      ACCESSOR: "issue_date",
      TYPE: "date",
    },
    {
      CONTROL: "input",
      HEADER: "Cheque No",
      ACCESSOR: "cheque_no",
      PLACEHOLDER: "Enter Cheque Number",
    },

    {
      CONTROL: "input",
      HEADER: "Amount",
      ACCESSOR: "amount",
      PLACEHOLDER: "Enter Amount",
      TYPE: "number",
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
        validationSchema={chequeIssueValidationSchema}
        onSubmit={onSubmit}
        fields={fields}
        resetInitialValue={resetInitialValue}
        title={"Add Cheque Issue"}
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Cheque Issue"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
        handleAddNewEntery={handleAddNewEntery}
      />
    </>
  );
};
