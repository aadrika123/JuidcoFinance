"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { useDispatch } from "react-redux";
import { closePopup, openPopup } from "@/redux/reducers/PopupReducers";
import { VoucherDataProps } from "@/utils/types/voucher_entry_types";
import { voucherSchema } from "@/utils/validation/documentation/voucher_entry.validation";
import { FINANCE_URL } from "@/utils/api/urls";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import axios from "@/lib/axiosConfig";
import goBack, { filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddVoucherEntry = () => {
  const dispatch = useDispatch();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: VoucherDataProps = {
    voucher_date: "",
    voucher_type_id: 0,
    narration: "",
    department_id: 0,
    adminis_ward_id: 0,
    voucher_sub_id: 0,
    sub_ledger_id: 0,
    amount: undefined,
    dr_cr_id: "",
  };
  const [data, setData] = useState<VoucherDataProps[]>([]);
  const [initialData, setInitialData] =
    useState<VoucherDataProps>(initialValues);

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
              adminis_ward_id: values.adminis_ward_id,
              adminis_ward_id_name:
                values.adminis_ward_id_name || item.adminis_ward_id_name,
              amount: values.amount,
              department_id: values.department_id,
              department_id_name:
                values.department_id_name || item.department_id_name,
              dr_cr_id: values.dr_cr_id,
              dr_cr_id_name: values.dr_cr_id_name || item.dr_cr_id_name,
              narration: values.narration,
              sub_ledger_id: values.sub_ledger_id,
              sub_ledger_id_name:
                values.sub_ledger_id_name || item.sub_ledger_id_name,
              voucher_date: values.voucher_date,
              voucher_sub_id: values.voucher_sub_id,
              voucher_sub_id_name:
                values.voucher_sub_id_name || item.voucher_sub_id_name,
              voucher_type_id: values.voucher_type_id,
              voucher_type_id_name:
                values.voucher_type_id_name || item.voucher_type_id_name,
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
    values: VoucherDataProps
  ): Promise<VoucherDataProps> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.VOUCHER_ENTRY_URL.create}`,
        method: "POST",
        data: filterValBefStoring(values),
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<VoucherDataProps, Error, any>(handleStore, {
    onSuccess: () => {
     toast.success("Added Voucher Entry");
     setTimeout(() => {
      goBack();
    }, 1000);
    },
    onError: () => {
      alert("Something Went Wrong!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

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
      voucher_date: data[Id - 1]?.voucher_date,
      voucher_type_id: data[Id - 1]?.voucher_type_id,
      narration: data[Id - 1]?.narration,
      department_id: data[Id - 1]?.department_id,
      adminis_ward_id: data[Id - 1]?.adminis_ward_id,
      voucher_sub_id: data[Id - 1]?.voucher_sub_id,
      sub_ledger_id: data[Id - 1]?.sub_ledger_id,
      amount: data[Id - 1]?.amount,
      dr_cr_id: data[Id - 1]?.dr_cr_id,
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

  ///////////////// Handle Things Before Adding New Entery ///////////
  const handleAddNewEntery = () =>{
    setIsUpdateMode({
      id: "",
      isOnEdit: false,
    })
  }

  // Add Table
  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "sub_ledger_id_name",
      caption: "Sub-Ledger/Name",
      width: "w-[25%]",
    },
    { name: "amount", caption: "Amount(Rs) ", width: "w-[20%]" },
    {
      name: "voucher_type_id_name",
      caption: "Voucher Type",
      width: "w-[20%]",
    },
    { name: "dr_cr_id_name", caption: "Dr/Cr", width: "w-[15%]" },
    {
      name: "branch",
      caption: "Edit/Remove",
      width: "w-[10%]",
      value: addButton,
    },
  ];

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Voucher Date",
      ACCESSOR: "voucher_date",
      PLACEHOLDER: "DD/MM/YYYY",
      TYPE: "date",
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
      HEADER: "Voucher Type",
      ACCESSOR: "voucher_type_id",
      PLACEHOLDER: "Select Voucher Type",
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
      CONTROL: "select",
      HEADER: "Voucher Sub Type",
      ACCESSOR: "voucher_sub_id",
      PLACEHOLDER: "Select Voucher Sub Type",
      API: `${FINANCE_URL.VOUCHER_SUB_TYPE_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Dr/Cr",
      ACCESSOR: "dr_cr_id",
      PLACEHOLDER: "Select Dr/Cr",
      API: `${FINANCE_URL.DR_CR_URL.get}`,
    },

    {
      CONTROL: "select",
      HEADER: "Sub Ledger/Name",
      ACCESSOR: "sub_ledger_id",
      PLACEHOLDER: "Select Sub Ledger",
      API: `${FINANCE_URL.SUB_LEDGER_URL.get}`,
    },
    {
      CONTROL: "textarea",
      HEADER: "Narration",
      ACCESSOR: "narration",
      PLACEHOLDER: "Enter Narration",
    },
    {
      CONTROL: "input",
      HEADER: "Amount",
      ACCESSOR: "amount",
      TYPE: "number",
      PLACEHOLDER: "Enter amount",
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
      <Toaster/>
      <Hoc
        title="Add New Voucher"
        initialValues={initialData}
        validationSchema={voucherSchema}
        onSubmit={onSubmit}
        fields={fields}
        resetInitialValue={resetInitialValue}
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Voucher"
        columns={columns}
        footerData={footerData}
        handleResetTable={handleResetTable}
        handleStore={mutate}
        handleAddNewEntery={handleAddNewEntery}
      />
    </>
  );
};
