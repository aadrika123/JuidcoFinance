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
import { LoanManagementDetailsData } from "@/utils/types/budgeting/loan_management_types";
import { loanManagementDetailsSchema } from "@/utils/validation/budgeting/loan_management.validation";
import FormikW from "./LoanManagementFormFields";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikW);

export const AddLoanManagement = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: LoanManagementDetailsData = {
    ulb_id: "",
    primary_acc_code_id: "",
    purpose_of_loan: "",
    department_id: "",
    resolution_date: "",
    loan_no: "",
    loan_sanctioned_amount: "",
    interest_rate: "",
    instalments_no: "",
    instalment_amount: "",
    receipt_date: "",
    received_amount: "",
    total_received_amount: "",
    repayment_due_date: "",
    principal_amount: "",
    interest_amount: "",
    total_due_amount_to_repayment: "",
    officer_id: "",
    repaid_repayment_date: "",
    repaid_principal_amount: "",
    repaid_interest: "",
    repaid_total_amount: "",
    balance_principal_amount: "",
    balance_interest: "",
    balance_total_amount: "",
    balance_remarks: "",
    employee_id: "",
    designation_id: "",
  };

  const [data, setData] = useState<LoanManagementDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<LoanManagementDetailsData>(initialValues);

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
              purpose_of_loan: values.purpose_of_loan,
              department_id: values.department_id,
              department_id_name:
                values.department_id_name || item.department_id_name,
              resolution_date: values.resolution_date,
              loan_no: values.loan_no,
              loan_sanctioned_amount: values.loan_sanctioned_amount,
              interest_rate: values.interest_rate,
              instalments_no: values.instalments_no,
              instalment_amount: values.instalment_amount,
              receipt_date: values.receipt_date,
              received_amount: values.received_amount,
              total_received_amount: values.total_received_amount,
              repayment_due_date: values.repayment_due_date,
              principal_amount: values.principal_amount,
              interest_amount: values.interest_amount,
              total_due_amount_to_repayment:
                values.total_due_amount_to_repayment,
              officer_id: values.officer_id,
              officer_id_name: values.officer_id_name || item.officer_id_name,
              repaid_repayment_date: values.repaid_repayment_date,
              repaid_principal_amount: values.repaid_principal_amount,
              repaid_interest: values.repaid_interest,
              repaid_total_amount: values.repaid_total_amount,
              balance_principal_amount: values.balance_principal_amount,
              balance_interest: values.balance_interest,
              balance_total_amount: values.balance_total_amount,
              balance_remarks: values.balance_remarks,
              employee_id: values.employee_id,
              employee_id_name:
                values.employee_id_name || item.employee_id_name,
              designation_id: values.designation_id,
              designation_id_name:
                values.designation_id_name || item.designation_id_name,
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
    values: LoanManagementDetailsData
  ): Promise<LoanManagementDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.LOAN_MANAGEMENT_URL.create}`,
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<LoanManagementDetailsData, Error, any>(
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
      sum = sum + Number(item.balance_total_amount);
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
      purpose_of_loan: data[Id - 1]?.purpose_of_loan,
      department_id: data[Id - 1]?.department_id,
      resolution_date: data[Id - 1]?.resolution_date,
      loan_no: data[Id - 1]?.loan_no,
      loan_sanctioned_amount: data[Id - 1]?.loan_sanctioned_amount,
      interest_rate: data[Id - 1]?.interest_rate,
      instalments_no: data[Id - 1]?.instalments_no,
      instalment_amount: data[Id - 1]?.instalment_amount,
      receipt_date: data[Id - 1]?.receipt_date,
      received_amount: data[Id - 1]?.received_amount,
      total_received_amount: data[Id - 1]?.total_received_amount,
      repayment_due_date: data[Id - 1]?.repayment_due_date,
      principal_amount: data[Id - 1]?.principal_amount,
      interest_amount: data[Id - 1]?.interest_amount,
      total_due_amount_to_repayment:
        data[Id - 1]?.total_due_amount_to_repayment,
      officer_id: data[Id - 1]?.officer_id,
      repaid_repayment_date: data[Id - 1]?.repaid_repayment_date,
      repaid_principal_amount: data[Id - 1]?.repaid_principal_amount,
      repaid_interest: data[Id - 1]?.repaid_interest,
      repaid_total_amount: data[Id - 1]?.repaid_total_amount,
      balance_principal_amount: data[Id - 1]?.balance_principal_amount,
      balance_interest: data[Id - 1]?.balance_interest,
      balance_total_amount: data[Id - 1]?.balance_total_amount,
      balance_remarks: data[Id - 1]?.balance_remarks,
      employee_id: data[Id - 1]?.employee_id,
      designation_id: data[Id - 1]?.designation_id,
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
      name: "ulb_id_name",
      caption: "ULBs",
      width: "w-[25%]",
    },
    {
      name: "purpose_of_loan",
      caption: "Purpose of Loan",
      width: "w-[25%]",
    },
    {
      name: "loan_no",
      caption: "Loan Number",
      width: "w-[25%]",
    },
    {
      name: "interest_rate",
      caption: "Rate of Interest",
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
        validationSchema={loanManagementDetailsSchema}
        onSubmit={onSubmit}
        resetInitialValue={resetInitialValue}
        title="Add Loans & Borrowings Entry"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Loans & Borrowings Entry Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
      />
    </>
  );
};
