"use client";

import React, { useEffect, useState } from "react";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import { fields } from "../BillInvoiceFormFields";
import { BillInvoiceDetailsData } from "../bills_invoice_entry_types";
import { BillInvoiceDetailsSchema } from "../bill_invoice.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

export const EditBillsInvoiceEntry = ({
  BillsInvoiceID,
}: {
  BillsInvoiceID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.getById}/${BillsInvoiceID}`,
      });
      if (!res.data.status) throw new Error("Something Went Wrong!!");

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
    } catch (error) {
      console.log(error);
    }
  };

  const { isFetching: isFetching, refetch: reloadData } = useQuery(
    ["bill-invoice-get-single", BillsInvoiceID],
    fetchData
  );
  useEffect(() => {
    reloadData();
  }, [BillsInvoiceID]);

  // UPDATE VOUCHER DETAILS
  const UpdateBillInvoiceEntry = async (
    values: BillInvoiceDetailsData
  ): Promise<BillInvoiceDetailsData> => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BILL_INVOICE_ENTRY_URL.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(BillsInvoiceID),
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
    BillInvoiceDetailsData,
    Error,
    BillInvoiceDetailsData
  >(UpdateBillInvoiceEntry, {
    onSuccess: () => {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
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
    mutate(filterValBefStoring(values));
  };

  return (
    <>
      {isSuccess && <SuccesfullConfirmPopup message="Updated Successfully" />}

      <RandomWorkingPopup show={isLoading} />
      <HeaderWidget
        title="Bill Invoice"
        variant={searchParams == "view" ? "view" : "edit"}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikWrapper
          title=""
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={BillInvoiceDetailsSchema}
          onSubmit={onSubmit}
          fields={fields}
          readonly={searchParams === "view"}
        />
      )}
    </>
  );
};
