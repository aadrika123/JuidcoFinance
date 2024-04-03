"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import axios from "@/lib/axiosConfig";
import goBack, { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { fields } from "../BillPaymentFormFields";
import {
  BillPaymentDetailsData,
  ResponseData,
} from "../bill_payment_entry_types";
import { BillPaymentDetailsSchema } from "../bill_payment.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditBillPaymentEntry = ({
  BillPaymentID,
}: {
  BillPaymentID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
  const fetchData = async () => {
    try {
      const res: ResponseData = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_PAYMENT_ENTRY_URL.getById}/${BillPaymentID}`,
      });
      if (!res.data.status) throw new Error("Something Went Wrong!!");

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
    } catch (error) {
      console.log(error);
    }
  };

  const { refetch: reloadData, isFetching: isFetching } = useQuery(
    ["bill-payment-get-single", BillPaymentID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [BillPaymentID]);

  // UPDATE BILL PAYMENT ENTRY
  const UpdateBillPaymentEntry = async (
    values: BillPaymentDetailsData
  ): Promise<BillPaymentDetailsData> => {
    console.log("first", values);
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_PAYMENT_ENTRY_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(BillPaymentID),
            ...values,
          },
        },
      });
      if (res.data.status) {
        return res.data;
      }
      throw "Something Went Wrong";
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { mutate, isLoading } = useMutation<
    BillPaymentDetailsData,
    Error,
    BillPaymentDetailsData
  >(UpdateBillPaymentEntry, {
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        goBack()
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
    console.log("sf ls df", values);
    mutate(filterValBefStoring(values));
  };

  return (
    <>
      {isSuccess && <SuccesfullConfirmPopup message="Updated Successfully" />}

      <RandomWorkingPopup show={isLoading} />
      <HeaderWidget
        title="Bill Payment Entry"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title=""
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={BillPaymentDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
