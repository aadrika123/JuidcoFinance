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
import { AdvanceManagementDetailsData } from "@/utils/types/budgeting/advance_management_types";
import { advanceManagementDetailsSchema } from "@/utils/validation/budgeting/advance_management.validation";
import FormikW from "./AdvanceManagementFormFields";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikW);

export const AddAdvanceManagement = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: AdvanceManagementDetailsData = {
    ulb_id: "",
    primary_acc_code_id: "",
    serial_no_of_estimate: "",
    work_order_no: "",
    work_name: "",
    work_nature: "",
    contract_amount: "",
    contractor_name: "",
    order_sanctioning_the_contract_no: "",
    order_sanctioning_the_contract_resolution_date: "",
    order_sanctioning_the_estimate_no: "",
    order_sanctioning_the_estimate_date: "",
    voucher_no: "",
    date: "",
    amount: "",
    officer_id: "",
    bill_no: "",
    bill_date: "",
    payable_amount: "",
    approved_amount: "",
    cumulative_approved_amount: "",
    pwd_officer_id: "",
    security_deposit_deducted_amount: "",
    tds_amount: "",
    work_contract_tax_amount: "",
    material_issued_recovery_amount: "",
    advance_provided_recovery_amount: "",
    other_deduction_amount: "",
    net_paid_amount: "",
    department_id: "",
    remarks: "",
  };

  const [data, setData] = useState<AdvanceManagementDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<AdvanceManagementDetailsData>(initialValues);

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
              serial_no_of_estimate: values.serial_no_of_estimate,
              work_order_no: values.work_order_no,
              work_name: values.work_name,
              work_nature: values.work_nature,
              contract_amount: values.contract_amount,
              contractor_name: values.contractor_name,
              order_sanctioning_the_contract_no:
                values.order_sanctioning_the_contract_no,
              order_sanctioning_the_contract_resolution_date:
                values.order_sanctioning_the_contract_resolution_date,
              order_sanctioning_the_estimate_no:
                values.order_sanctioning_the_estimate_no,
              order_sanctioning_the_estimate_date:
                values.order_sanctioning_the_estimate_date,
              voucher_no: values.voucher_no,
              date: values.date,
              amount: values.amount,
              officer_id: values.officer_id,
              officer_id_name: values.officer_id_name || item.officer_id_name,
              bill_no: values.bill_no,
              bill_date: values.bill_date,
              payable_amount: values.payable_amount,
              approved_amount: values.approved_amount,
              cumulative_approved_amount: values.cumulative_approved_amount,
              pwd_officer_id: values.pwd_officer_id,
              pwd_officer_id_name:
                values.pwd_officer_id_name || item.pwd_officer_id_name,
              security_deposit_deducted_amount:
                values.security_deposit_deducted_amount,
              tds_amount: values.tds_amount,
              work_contract_tax_amount: values.work_contract_tax_amount,
              material_issued_recovery_amount:
                values.material_issued_recovery_amount,
              advance_provided_recovery_amount:
                values.advance_provided_recovery_amount,
              other_deduction_amount: values.other_deduction_amount,
              net_paid_amount: values.net_paid_amount,
              department_id: values.department_id,
              department_id_name:
                values.department_id_name || item.department_id_name,
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
    values: AdvanceManagementDetailsData
  ): Promise<AdvanceManagementDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.ADVANCE_MANAGEMENT_URL.create}`,
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

  const { mutate } = useMutation<AdvanceManagementDetailsData, Error, any>(
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
      ulb_id: data[Id - 1]?.ulb_id,
      primary_acc_code_id: data[Id - 1]?.primary_acc_code_id,
      serial_no_of_estimate: data[Id - 1]?.serial_no_of_estimate,
      work_order_no: data[Id - 1]?.work_order_no,
      work_name: data[Id - 1]?.work_name,
      work_nature: data[Id - 1]?.work_nature,
      contract_amount: data[Id - 1]?.contract_amount,
      contractor_name: data[Id - 1]?.contractor_name,
      order_sanctioning_the_contract_no:
        data[Id - 1]?.order_sanctioning_the_contract_no,
      order_sanctioning_the_contract_resolution_date:
        data[Id - 1]?.order_sanctioning_the_contract_resolution_date,
      order_sanctioning_the_estimate_no:
        data[Id - 1]?.order_sanctioning_the_estimate_no,
      order_sanctioning_the_estimate_date:
        data[Id - 1]?.order_sanctioning_the_estimate_date,
      voucher_no: data[Id - 1]?.voucher_no,
      date: data[Id - 1]?.date,
      amount: data[Id - 1]?.amount,
      officer_id: data[Id - 1]?.officer_id,
      bill_no: data[Id - 1]?.bill_no,
      bill_date: data[Id - 1]?.bill_date,
      payable_amount: data[Id - 1]?.payable_amount,
      approved_amount: data[Id - 1]?.approved_amount,
      cumulative_approved_amount: data[Id - 1]?.cumulative_approved_amount,
      pwd_officer_id: data[Id - 1]?.pwd_officer_id,
      security_deposit_deducted_amount:
        data[Id - 1]?.security_deposit_deducted_amount,
      tds_amount: data[Id - 1]?.tds_amount,
      work_contract_tax_amount: data[Id - 1]?.work_contract_tax_amount,
      material_issued_recovery_amount:
        data[Id - 1]?.material_issued_recovery_amount,
      advance_provided_recovery_amount:
        data[Id - 1]?.advance_provided_recovery_amount,
      other_deduction_amount: data[Id - 1]?.other_deduction_amount,
      net_paid_amount: data[Id - 1]?.net_paid_amount,
      department_id: data[Id - 1]?.department_id,
      remarks: data[Id - 1]?.remarks,
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
      name: "primary_acc_code_id_name",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "work_order_no",
      caption: "Work Order No",
      width: "w-[25%]",
    },
    {
      name: "work_nature",
      caption: "Nature of Work",
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
        validationSchema={advanceManagementDetailsSchema}
        onSubmit={onSubmit}
        resetInitialValue={resetInitialValue}
        title="Add Advance"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Advance Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
      />
    </>
  );
};
