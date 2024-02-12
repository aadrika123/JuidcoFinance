"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { BillPaymentDetailsData, ResponseData } from "@/utils/types/bill_payment_entry_types";
import { BillPaymentDetailsSchema } from "@/utils/validation/transactions/bill_payment.validation";
import { fields } from "../BillPaymentFormFields";

export const EditBillPaymentEntry = ({
  BillPaymentID,
}: {
  BillPaymentID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<BillPaymentDetailsData>({
    bill_no: "",
    bill_entry_date: "",
    bill_type_id: "",
    vendor_id: "",
    department_id: "",
    adminis_ward_id: "",
    payee_id: "",
    bill_amount: "",
    advance: "",
    address: "",
    deposit: "",
    deductions_amount: "",
  });

  const queryClient = new QueryClient();

  // Get Payment entry by ID
  useEffect(() => {
    (async function () {
      const res: ResponseData = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_PAYMENT_ENTRY_URL.getById}/${BillPaymentID}`,
      });

      setInitialData((prev: BillPaymentDetailsData) => {
        return {
          ...prev,
          bill_entry_date: DateFormatter(res.data.data.bill_entry_date),
          bill_type_id: res.data.data.bill_type.id,
          bill_no: res.data.data.bill_no,
          department_id: res.data.data.department.id,
          adminis_ward_id: res.data.data.adminis_ward.id,
          payee_id: res.data.data.payee.id,
          vendor_id: res.data.data.vendor.id,
          bill_amount: res.data.data.bill_amount,
          address: res.data.data.address,
          deposit: res.data.data.deposit,
          deductions_amount: res.data.data.deductions_amount,
          advance: res.data.data.advance,
        };
      });
    })();
  }, []);

  // UPDATE BILL PAYMENT ENTRY
  const UpdateBillPaymentEntry = async (
    values: BillPaymentDetailsData
  ): Promise<BillPaymentDetailsData> => {
    console.log("first", values)
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_PAYMENT_ENTRY_URL.update}`,
        method: "POST",
        data: {
          id: Number(BillPaymentID),
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
    BillPaymentDetailsData,
    Error,
    BillPaymentDetailsData
  >(UpdateBillPaymentEntry, {
    onSuccess: () => {
      toast.success("Bill Payment Entry Updated Successfully!!");
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
    values.bill_entry_date = `${new Date(values.bill_entry_date).toISOString()}`;
    console.log("sf ls df", values)
    mutate(filterValBefStoring(values));
  };

  return (
    <>
      <Toaster />
      <HeaderWidget title="Edit Bill Payment Entry" variant="view" />
      <FormikWrapper
        title=""
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={BillPaymentDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
