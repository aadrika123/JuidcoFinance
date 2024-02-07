"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/reducers/PopupReducers";
import { VoucherDataProps } from "@/utils/types/voucher_entry_types";
import {
  voucherInitialValues,
  voucherSchema,
} from "@/utils/validation/documentation/voucher_entry.validation";
import { FINANCE_URL } from "@/utils/api/urls";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddVoucherEntry = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openPopup());
  }, []);
  const [isUpdateMode, setIsUpdateMode] = useState<object>({
    id: null,
    isOnEdit: false,
  });
  const [data, setData] = useState<VoucherDataProps[]>([]);
  const onSubmit = (values: VoucherDataProps) => {
    if (!isUpdateMode.isOnEdit) {
      setData((prev) => [...prev, { id: prev.length + 1, ...values }]);
    } else {
      console.log("first", values);
      setData((prev) => {
        const updatedData = prev.map((item) => {
          if (item.id === isUpdateMode.id) {
            return {
              ...item,
              adminis_ward_id: 4,
              adminis_ward_id_name: "Armstrong - Walsh",
              amount: "076",
              department_id: 5,
              department_id_name: "Schmidt - Bode",
              dr_cr: 4,
              dr_cr_name: "Haag Inc",
              narration: "dfghjkg",
              sub_ledger_id: 3,
              sub_ledger_id_name: "Prince Movies",
              voucher_date: "02-10-2004",
              voucher_sub_id: 4,
              voucher_sub_id_name: "Ullrich and Sons",
              voucher_type_id: 5,
              voucher_type_id_name: "Gibson, Wolf and Ritchie",
            };
          }
          return item;
        });
        return [...prev, updatedData];
      });
    }
    // actions.setSubmitting(false);
  };

  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Voucher Date",
      ACCESSOR: "voucher_date",
      PLACEHOLDER: "DD/MM/YYYY",
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
      ACCESSOR: "dr_cr",
      PLACEHOLDER: "Select Dr/Cr",
      API: "/bill-type/get",
    },

    {
      CONTROL: "select",
      HEADER: "Sub Ledger/Name",
      ACCESSOR: "sub_ledger_id",
      PLACEHOLDER: "Select Dr/Cr",
      API: `${FINANCE_URL.SUB_LEDGER_URL.get}`,
    },
    {
      CONTROL: "textarea",
      HEADER: "Narration",
      ACCESSOR: "narration",
    },
    {
      CONTROL: "input",
      HEADER: "Amount",
      ACCESSOR: "amount",
    },
  ];

  const handleCount = () => {
    let sum = 0;
    data.forEach((item) => {
      sum = sum + Number(item.amount);
    });
    return sum;
  };

  const footerData = [
    {
      key: "Total",
      value: handleCount(),
    },
  ];

  const [initialData, setInitialData] = useState<VoucherDataProps>({
    voucher_date: "",
    voucher_type_id: 0,
    narration: "",
    department_id: 0,
    adminis_ward_id: 0,
    voucher_sub_id: 0,
    sub_ledger_id: 0,
    amount: 0,
    dr_cr: 0,
  });

  const onRemoveButton = (id: number | string) => {
    setData((prev) => {
      const filteredData = prev.filter((item) => item.id !== id);

      return filteredData.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
    });
  };

  const onEditButton = (id: number) => {
    setIsUpdateMode((prev) => ({ ...prev, isOnEdit: true, id: id }));
    setInitialData((prev) => ({
      ...prev,
      voucher_date: data[id - 1]?.voucher_date,
      voucher_type_id: data[id - 1]?.voucher_type_id,
      narration: data[id - 1]?.narration,
      department_id: data[id - 1]?.department_id,
      adminis_ward_id: data[id - 1]?.adminis_ward_id,
      voucher_sub_id: data[id - 1]?.voucher_sub_id,
      sub_ledger_id: data[id - 1]?.sub_ledger_id,
      amount: data[id - 1]?.amount,
      dr_cr: data[id - 1]?.dr_cr,
    }));
    dispatch(openPopup());
  };

  const addButton = (id: string | number) => {
    return (
      <>
        <ViewIconButton onClick={() => onEditButton(id)} />
        <ViewIconButton onClick={() => onRemoveButton(id)} />
      </>
    );
  };

  return (
    <>
      <Hoc
        initialValues={initialData}
        validationSchema={voucherSchema}
        onSubmit={onSubmit}
        fields={fields}
      />
      <TableWithCount
        data={data}
        scrollable
        title="Title 1"
        columns={[
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
          { name: "dr_cr_name", caption: "Dr/Cr", width: "w-[15%]" },
          {
            name: "branch",
            caption: "Edit/Remove",
            width: "w-[10%]",
            value: addButton,
          },
        ]}
        footerData={footerData}
      />
    </>
  );
};
function setIsUpdateMode(arg0: boolean) {
  throw new Error("Function not implemented.");
}
