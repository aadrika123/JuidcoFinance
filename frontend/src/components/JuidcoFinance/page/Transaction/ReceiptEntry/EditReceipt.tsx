"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import goBack, { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { fields } from "./RecieptEntryFormFields";
import { ReceiptDataProps, ResponseData } from "./receipt_entry_types";
import { ReceiptDetailsSchema } from "./receipt_entry.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditReceipt = ({ receiptID }: { receiptID: string }) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<ReceiptDataProps>({
    date: "",
    email: "",
    receipt_no: "",
    module_id: "",
    paid_by: "",
    receipt_type_id: "",
    mobile_no: "",
    admin_ward_id: "",
    narration: "",
    subledger_id: "",
    amount: "",
  });

  const queryClient = new QueryClient();

  ///////////////////////

  const fetchData = async () => {
    try {
      const res: ResponseData = await axios({
        method: "GET",
        url: `/receipt-entry/get-by-id/${receiptID}`,
      });

      if (!res.data.status) throw Error("Something Went Wrong!!");

      setInitialData((prev: ReceiptDataProps) => {
        const d = res.data.data;
        return {
          ...prev,
          date: DateFormatter(d.date),
          email: d.email,
          receipt_no: d.receipt_no,
          module_id: d.module.id,
          paid_by: d.paid_by,
          receipt_type_id: d.receipt_type.id,
          mobile_no: d.mobile_no,
          admin_ward_id: d.admin_ward.id,
          narration: d.narration,
          subledger_id: d.subledger.id,
          amount: d.amount,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { isFetching: isFetching, refetch: reloadData } = useQuery(
    ["receipt-entry-get-single", receiptID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [receiptID]);

  // UPDATE DIRECT PAYMENT ENTRY
  const UpdateReceipt = async (
    values: ReceiptDataProps
  ): Promise<ReceiptDataProps> => {
    try {
      const res = await axios({
        url: `/receipt-entry/update`,
        method: "POST",
        data: {
          data: {
            id: Number(receiptID),
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
    ReceiptDataProps,
    Error,
    ReceiptDataProps
  >(UpdateReceipt, {
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        goBack()
      }, 1000);
    },
    onError: () => {
      alert("Something Went Wrong!!!");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (values: any) => {
    values.date = `${new Date(values.date).toISOString()}`;
    mutate(filterValBefStoring(values));
  };

  return (
    <>
      {isSuccess && <SuccesfullConfirmPopup message="Updated Successfully" />}

      <RandomWorkingPopup show={isLoading} />
      <HeaderWidget
        title="Receipt"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title=""
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={ReceiptDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
