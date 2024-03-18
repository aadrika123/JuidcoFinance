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
import { VoucherEntryDetailsData } from "@/utils/types/documentation/voucher_entry_types";
import { voucherEntryDetailsSchema } from "@/utils/validation/documentation/voucher_entry.validation";
import FormikW from "./VoucherEntryFormFields";

interface UpdatedModeType {
  id: number | string;
  isOnEdit: boolean;
}

const Hoc = PopupFormikHOC(FormikW);

export const AddVoucherEntry = () => {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [isUpdateMode, setIsUpdateMode] = useState<UpdatedModeType>({
    id: "",
    isOnEdit: false,
  });
  const initialValues: VoucherEntryDetailsData = {
    voucher_type_id: "",
    ulb_id: "",
    date: "",
    fund_id: "",
    journal_voucher_no: "",
    bank_id: "",
    payment_date: "",
    department_id: "",
    pay_slip_ref_no: "",
    pay_slip_date: "",
    crv_bpv_no: "",
    receipt_date: "",
    primary_acc_code_id: "",
    payment_order_no: "",
    acc_description: "",
    debit_amount: "",
    credit_amount: "",
    remittance_money_no: "",
    amount: "",
    cheque_no: "",
    total_amount: "",
    amount_in_words: "",
    prepared_by: "",
    prepared_by_date: "",
    verified_by_id: "",
    verified_by_date: "",
    approved_by_id: "",
    approved_by_date: "",
    posted_by_id: "",
    posted_by_date: "",
    receiver_name: "",
  };

  const [data, setData] = useState<VoucherEntryDetailsData[]>([]);
  const [initialData, setInitialData] =
    useState<VoucherEntryDetailsData>(initialValues);

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
              voucher_type_id: values.voucher_type_id,
              voucher_type_id_name:
                values.voucher_type_id_name || item.voucher_type_id_name,
              ulb_id: values.ulb_id,
              ulb_id_name: values.ulb_id_name || item.ulb_id_name,
              date: values.date,
              fund_id: values.fund_id,
              fund_id_name: values.fund_id_name || item.fund_id_name,
              journal_voucher_no: values.journal_voucher_no,
              bank_id: values.bank_id,
              bank_id_name: values.bank_id_name || item.bank_id_name,
              payment_date: values.payment_date,
              department_id: values.department_id,
              department_id_name:
                values.department_id_name || item.department_id_name,
              pay_slip_ref_no: values.pay_slip_ref_no,
              pay_slip_date: values.pay_slip_date,
              crv_bpv_no: values.crv_bpv_no,
              receipt_date: values.receipt_date,
              primary_acc_code_id: values.primary_acc_code_id,
              primary_acc_code_id_name:
                values.primary_acc_code_id_name ||
                item.primary_acc_code_id_name,
              payment_order_no: values.payment_order_no,
              acc_description: values.acc_description,
              debit_amount: values.debit_amount,
              credit_amount: values.credit_amount,
              remittance_money_no: values.remittance_money_no,
              amount: values.amount,
              cheque_no: values.cheque_no,
              total_amount: values.total_amount,
              amount_in_words: values.amount_in_words,
              prepared_by: values.prepared_by,
              prepared_by_date: values.prepared_by_date,
              verified_by_id: values.verified_by_id,
              verified_by_id_name:
                values.verified_by_id_name || item.verified_by_id_name,
              verified_by_date: values.verified_by_date,
              approved_by_id: values.approved_by_id,
              approved_by_id_name:
                values.approved_by_id_name || item.approved_by_id_name,
              approved_by_date: values.approved_by_date,
              posted_by_id: values.posted_by_id,
              posted_by_id_name:
                values.posted_by_id_name || item.posted_by_id_name,
              posted_by_date: values.posted_by_date,
              receiver_name: values.receiver_name,
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
    values: VoucherEntryDetailsData
  ): Promise<VoucherEntryDetailsData> => {
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

  const { mutate } = useMutation<VoucherEntryDetailsData, Error, any>(
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
      voucher_type_id: data[Id - 1]?.voucher_type_id,
      ulb_id: data[Id - 1]?.ulb_id,
      date: data[Id - 1]?.date,
      fund_id: data[Id - 1]?.fund_id,
      journal_voucher_no: data[Id - 1]?.journal_voucher_no,
      bank_id: data[Id - 1]?.bank_id,
      payment_date: data[Id - 1]?.payment_date,
      department_id: data[Id - 1]?.department_id,
      pay_slip_ref_no: data[Id - 1]?.pay_slip_ref_no,
      pay_slip_date: data[Id - 1]?.pay_slip_date,
      crv_bpv_no: data[Id - 1]?.crv_bpv_no,
      receipt_date: data[Id - 1]?.receipt_date,
      primary_acc_code_id: data[Id - 1]?.primary_acc_code_id,
      payment_order_no: data[Id - 1]?.payment_order_no,
      acc_description: data[Id - 1]?.acc_description,
      debit_amount: data[Id - 1]?.debit_amount,
      credit_amount: data[Id - 1]?.credit_amount,
      remittance_money_no: data[Id - 1]?.remittance_money_no,
      amount: data[Id - 1]?.amount,
      cheque_no: data[Id - 1]?.cheque_no,
      total_amount: data[Id - 1]?.total_amount,
      amount_in_words: data[Id - 1]?.amount_in_words,
      prepared_by: data[Id - 1]?.prepared_by,
      prepared_by_date: data[Id - 1]?.prepared_by_date,
      verified_by_id: data[Id - 1]?.verified_by_id,
      verified_by_date: data[Id - 1]?.verified_by_date,
      approved_by_id: data[Id - 1]?.approved_by_id,
      approved_by_date: data[Id - 1]?.approved_by_date,
      posted_by_id: data[Id - 1]?.posted_by_id,
      posted_by_date: data[Id - 1]?.posted_by_date,
      receiver_name: data[Id - 1]?.receiver_name,
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
      name: "voucher_type_id_name",
      caption: "Voucher Type",
      width: "w-[25%]",
    },
    {
      name: "ulb_id_name",
      caption: "ULBs",
      width: "w-[25%]",
    },
    {
      name: "crv_bpv_no",
      caption: "CRV/BPV No",
      width: "w-[25%]",
    },
    {
      name: "primary_acc_code_id_name",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "payment_order_no",
      caption: "Payment Order No",
      width: "w-[25%]",
    },
    {
      name: "amount",
      caption: "Amount (Rs)",
      width: "w-[25%]",
    },
    {
      name: "cheque_no",
      caption: "Cheque No",
      width: "w-[25%]",
    },
    {
      name: "amount_in_words",
      caption: "Total Amount in Word",
      width: "w-[25%]",
    },
    {
      name: "prepared_by",
      caption: "Prepared By",
      width: "w-[25%]",
    },
    {
      name: "receiver_name",
      caption: "Signature of the Receiver",
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
        validationSchema={voucherEntryDetailsSchema}
        onSubmit={onSubmit}
        resetInitialValue={resetInitialValue}
        title="Add Voucher Entry"
      />
      <TableWithCount
        data={data}
        scrollable
        title="Add Voucher Entry Table"
        columns={columns}
        footerData={footerData}
        handleStore={mutate}
        handleResetTable={handleResetTable}
      />
    </>
  );
};
