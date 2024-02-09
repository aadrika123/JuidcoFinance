"use client";

import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { VoucherDataProps } from "@/utils/types/voucher_entry_types";
import { voucherSchema } from "@/utils/validation/documentation/voucher_entry.validation";
import { FINANCE_URL } from "@/utils/api/urls";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import axios from "@/lib/axiosConfig";
import { DateFormatter } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";

export const EditBillsPaymentEntry = ({ BillsInvoiceID }: { BillsInvoiceID: string }) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<VoucherDataProps>({
    voucher_date: "",
    voucher_type_id: 0,
    narration: "",
    department_id: 0,
    adminis_ward_id: 0,
    voucher_sub_id: 0,
    sub_ledger_id: 0,
    amount: undefined,
    dr_cr: 1,
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.VOUCHER_ENTRY_URL.getById}/${BillsInvoiceID}`,
      });
      console.log(res.data.data);

      setInitialData((prev) => {
        return {
          ...prev,
          voucher_no: res.data.data.voucher_no,
          adminis_ward_id: res.data.data.adminis_ward.id,
          // adminis_ward_id_name:
          //   res.data.data.adminis_ward_id_name ||
          //   res.data.data.adminis_ward_id_name,
          amount: res.data.data.amount,
          department_id: res.data.data.department.id,
          // department_id_name:
          //   res.data.data.department_id_name ||
          //   res.data.data.department_id_name,
          // dr_cr: res.data.data.dr_cr,
          // dr_cr_name: res.data.data.dr_cr_name || res.data.data.dr_cr_name,
          narration: res.data.data.narration,
          sub_ledger_id: res.data.data.sub_ledger.id,
          // sub_ledger_id_name:
          //   res.data.data.sub_ledger_id_name ||
          //   res.data.data.sub_ledger_id_name,
          voucher_date: DateFormatter(res.data.data.voucher_date),
          voucher_sub_id: res.data.data.voucher_sub_type.id,
          // voucher_sub_id_name:
          //   res.data.data.voucher_sub_id_name ||
          //   res.data.data.voucher_sub_id_name,
          voucher_type_id: res.data.data.voucher_type.id,
          // voucher_type_id_name:
          //   res.data.data.voucher_type_id_name ||
          //   res.data.data.voucher_type_id_name,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateVoucherEntry = async (
    values: VoucherDataProps
  ): Promise<VoucherDataProps> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.VOUCHER_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(BillsInvoiceID),
          ...values,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate } = useMutation<VoucherDataProps, Error, VoucherDataProps>(
    UpdateVoucherEntry,
    {
      onSuccess: () => {
        toast.success("Updated Voucher Entry");
      },
      onError: () => {
        alert("Error updating Voucher Entry");
      },
      onSettled: () => {
        queryClient.invalidateQueries();
        setTimeout(() => {
          goBack();
        }, 1000);
      },
    }
  );

  const onSubmit = (values: any) => {
    delete values.adminis_ward_id_name;
    delete values.department_id_name;
    delete values.sub_ledger_id_name;
    delete values.voucher_sub_id_name;
    delete values.voucher_type_id_name;
    values.voucher_date = `${new Date(values.voucher_date).toISOString()}`;
    mutate(values);
  };

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
      TYPE: "number",
    },
  ];

  return (
    <>
      <Toaster />
      <HeaderWidget title="Edit Voucher Entry" variant="view" />
      <FormikWrapper
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={voucherSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
