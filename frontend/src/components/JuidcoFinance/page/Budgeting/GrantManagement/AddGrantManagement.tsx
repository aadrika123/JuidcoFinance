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
import { GrantManagementDetailsData } from "@/utils/types/budgeting/grant_management_types";
import { grantManagementDetailsSchema } from "@/utils/validation/budgeting/grant_management.validation";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

interface DesignationType {
  id: number;
  name: string;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddGrantManagement = () => {
  const dispatch = useDispatch();
  const [designation, setDesignation] = useState<DesignationType[]>([]);
  const queryClient = new QueryClient();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: GrantManagementDetailsData = {
    ulb_id: "",
    primary_acc_code_id: "",
    sanction_number: "",
    grant_id: "",
    grant_nature_id: "",
    employee_id: 1,
    sanctioned_amount: undefined,
    grant_from_date: "",
    grant_to_date: "",
    advance_amount: undefined,
    advance_rcving_date: "",
    expenditure_date: "",
    voucher_id: "",
    expenditure_nature_id: "",
    refund_date: "",
    refund_amount: undefined,
  };

  const [data, setData] = useState<GrantManagementDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<GrantManagementDetailsData>(initialValues);

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
              sanction_number: values.sanction_number,
              grant_id: values.grant_id,
              grant_id_name: values.grant_id_name || item.grant_id_name,
              grant_nature_id: values.grant_nature_id,
              grant_nature_id_name:
                values.grant_nature_id_name || item.grant_nature_id_name,
              employee_id: values.employee_id,
              employee_id_name:
                values.employee_id_name || item.employee_id_name,
              sanctioned_amount: values.sanctioned_amount,
              grant_from_date: values.grant_from_date,
              grant_to_date: values.grant_to_date,
              advance_amount: values.advance_amount,
              advance_rcving_date: values.advance_rcving_date,
              expenditure_date: values.expenditure_date,
              voucher_id: values.voucher_id,
              voucher_id_name: values.voucher_id_name || item.voucher_id_name,
              expenditure_nature_id: values.expenditure_nature_id,
              expenditure_nature_id_name:
                values.expenditure_nature_id_name ||
                item.expenditure_nature_id_name,
              refund_date: values.refund_date,
              refund_amount: values.refund_amount,
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
    values: GrantManagementDetailsData
  ): Promise<GrantManagementDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.GRANT_MANAGEMENT_URL.create}`,
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<GrantManagementDetailsData, Error, any>(
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
      sum = sum + Number(item.refund_amount);
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
      sanction_number: data[Id - 1]?.sanction_number,
      grant_id: data[Id - 1]?.grant_id,
      grant_nature_id: data[Id - 1]?.grant_nature_id,
      employee_id: data[Id - 1]?.employee_id,
      sanctioned_amount: data[Id - 1]?.sanctioned_amount,
      grant_from_date: data[Id - 1]?.grant_from_date,
      grant_to_date: data[Id - 1]?.grant_to_date,
      advance_amount: data[Id - 1]?.advance_amount,
      advance_rcving_date: data[Id - 1]?.advance_rcving_date,
      expenditure_date: data[Id - 1]?.expenditure_date,
      voucher_id: data[Id - 1]?.voucher_id,
      expenditure_nature_id: data[Id - 1]?.expenditure_nature_id,
      refund_date: data[Id - 1]?.refund_date,
      refund_amount: data[Id - 1]?.refund_amount,
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
      name: "primary_acc_code_id_name",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "grant_nature_id_name",
      caption: "Nature of the Grant",
      width: "w-[25%]",
    },
    // {
    //   name: "grant_from_date",
    //   caption: "Grant From Date",
    //   width: "w-[25%]",
    // },
    // {
    //   name: "grant_to_date",
    //   caption: "Grant To Date",
    //   width: "w-[25%]",
    // },
    {
      name: "expenditure_nature_id_name",
      caption: "Nature of Expenditure",
      width: "w-[25%]",
    },
    {
      name: "edit/remove",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: addButton,
    },
  ];

  ///////////////// Handle Things Before Adding New Entery ///////////
  const handleAddNewEntery = () =>{
    setIsUpdateMode({
      id: "",
      isOnEdit: false,
    })
  }

  /////////////// Handle Select Primary Accounting Code ////////////////
useEffect(()=>{
 const getEmployeeDesignation = async()=>{
  try {
    const res = await axios({
      url: `${FINANCE_URL.EMPLOYEE_URL.get}`,
      method: "GET",
    });
    const data = res.data.data[0];
    setDesignation([{id: data.id, name: data.designation}])
  } catch (error) {
    console.log(error);
    throw error;
  }
 }
 getEmployeeDesignation()
},[])

const fields: FieldTypeProps[] = [
  {
    TITLE: "Grant Receipt",
    CHILDRENS: [
      {
        CONTROL: "select",
        HEADER: "ULBs",
        ACCESSOR: "ulb_id",
        PLACEHOLDER: "Select ULBs",
        API: `${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`,
      },
      {
        CONTROL: "select",
        HEADER: "Primary Accounting Code",
        ACCESSOR: "primary_acc_code_id",
        PLACEHOLDER: "Select Primary Accounting Code",
        API: `${FINANCE_URL.ACCOUNTING_CODE_URL.getMainCodes}`,
      },
      {
        CONTROL: "input",
        HEADER: "Grant Sanction Number",
        ACCESSOR: "sanction_number",
        PLACEHOLDER: "Enter Sanction Number",
      },
      {
        CONTROL: "select",
        HEADER: "Name of the Grant",
        ACCESSOR: "grant_id",
        PLACEHOLDER: "Select Grant Name",
        API: `${FINANCE_URL.GRANT_URL.get}`,
      },
      {
        CONTROL: "select",
        HEADER: "Nature of the Grant",
        ACCESSOR: "grant_nature_id",
        PLACEHOLDER: "Select Grant Nature",
        API: `${FINANCE_URL.GRANT_URL.getNatures}`,
      },
      {
        CONTROL: "selectForNoApi",
        HEADER: "Designation of the Authority",
        ACCESSOR: "employee_id",
        PLACEHOLDER: "Select Designation",
        DATA: designation,
        READONLY: true,
      },
      {
        CONTROL: "input",
        HEADER: "Sanctioned Amount (Rs)",
        ACCESSOR: "sanctioned_amount",
        PLACEHOLDER: "Enter Sanctioned Amount",
        TYPE: "number",
      },
      {
        CONTROL: "input",
        HEADER: "Grant From Date",
        ACCESSOR: "grant_from_date",
        TYPE: "date",
      },
      {
        CONTROL: "input",
        HEADER: "Grant To Date",
        ACCESSOR: "grant_to_date",
        TYPE: "date",
      },
      {
        CONTROL: "input",
        HEADER: "Grant Received in Advance Amount (Rs)",
        ACCESSOR: "advance_amount",
        PLACEHOLDER: "Enter Reveived in Advance Amount",
        TYPE: "number",
      },
      {
        CONTROL: "input",
        HEADER: "Grant Received in Advance Date",
        ACCESSOR: "advance_rcving_date",
        TYPE: "date",
      },
    ],
  },
  {
    TITLE: "Expenditure Incurred On Specific Grants",
    CHILDRENS: [
      {
        CONTROL: "input",
        HEADER: "Date",
        ACCESSOR: "expenditure_date",
        TYPE: "date",
      },
      {
        CONTROL: "select",
        HEADER: "Voucher Number",
        ACCESSOR: "voucher_id",
        PLACEHOLDER: "Select Voucher Number",
        API: `${FINANCE_URL.DEPARTMENT_URL.get}`,
      },
      {
        CONTROL: "select",
        HEADER: "Nature of Expenditure",
        ACCESSOR: "expenditure_nature_id",
        PLACEHOLDER: "Select Nature of Expenditure",
        API: `${FINANCE_URL.EXPENDITURE_NATURE_URL.get}`,
      },
    ],
  },
  {
    TITLE: "Expenditure Incurred On Specific Grants",
    CHILDRENS: [
      {
        CONTROL: "input",
        HEADER: "Date",
        ACCESSOR: "refund_date",
        TYPE: "date",
      },
      {
        CONTROL: "input",
        HEADER: "Amount (Rs)",
        ACCESSOR: "refund_amount",
        PLACEHOLDER: "Enter Amount",
        TYPE: "number",
      },
    ],
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
        validationSchema={grantManagementDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        resetInitialValue={resetInitialValue}
        title="Add Grant Management"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Grant Management Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
        handleAddNewEntery={handleAddNewEntery}
      />
    </>
  );
};
