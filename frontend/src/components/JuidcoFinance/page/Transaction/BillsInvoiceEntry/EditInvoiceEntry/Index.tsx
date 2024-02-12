"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { BillInvoiceDetailsData } from "@/utils/types/bills_invoice_entry_types";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { BillInvoiceDetailsSchema } from "@/utils/validation/transactions/bill_invoice.validation";
import { fields } from "../BillInvoiceFormFields";

export const EditBillsInvoiceEntry = ({
  BillsInvoiceID,
}: {
  BillsInvoiceID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<BillInvoiceDetailsData>({
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
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  useEffect(() => {
    (async function () {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.getById}/${BillsInvoiceID}`,
      });

      setInitialData((prev) => {
        return {
          ...prev,
          bill_no: res.data.data.bill_no,
          bill_date: DateFormatter(res.data.data.bill_date),
          address: res.data.data.address,
          admin_ward_id: res.data.data.admin_ward.id,
          amount: res.data.data.amount,
          department_id: res.data.data.department.id,
          narration: res.data.data.narration,
          stage_id: res.data.data.bill_stage.id,
          entry_date: DateFormatter(res.data.data.entry_date),
          vendor_id: res.data.data.vendor.id,
          type_id: res.data.data.type.id,
        };
      });
    })();
  }, []);

  // UPDATE VOUCHER DETAILS
  const UpdateBillInvoiceEntry = async (
    values: BillInvoiceDetailsData
  ): Promise<BillInvoiceDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.update}`,
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

  const { mutate } = useMutation<
    BillInvoiceDetailsData,
    Error,
    BillInvoiceDetailsData
  >(UpdateBillInvoiceEntry, {
    onSuccess: () => {
      toast.success("Bill Invoice Entry Updated Successfully!!");
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
  });

  const onSubmit = (values: any) => {
    mutate(filterValBefStoring(values));
  };

  return (
    <>
      <Toaster />
      <HeaderWidget
        title="Bill Invoice"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      <FormikWrapper
        title=""
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={BillInvoiceDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
