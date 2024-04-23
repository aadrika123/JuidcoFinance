"use client";

import React, { lazy, useEffect, useState } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import goBack, { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation, useQuery } from "react-query";
import { useSearchParams } from "next/navigation";
const HeaderWidget = lazy(() =>
  import("@/components/Helpers/Widgets/HeaderWidget").then((module) => ({
    default: module.HeaderWidget,
  }))
);
const FormikW = lazy(() => import("./ReceiptRegisterFormFields"));
// import { useSelector } from "react-redux";
import { ReceiptRegisterDetailsData } from "./receipt_register_types";
import { receiptRegisterDetailsSchema } from "./receipt_register.validation";
import Loader from "@/components/global/atoms/Loader";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";
import { useReactToPrint } from "react-to-print";
// import { ROLES } from "@/json/roles";

export const EditReceiptRegister = ({
  ReceiptRegisterID,
}: {
  ReceiptRegisterID: string;
}) => {
  const searchParams = useSearchParams().get("mode");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const [data, setData] = useState<any>();
  // const [user, setUser] = useState<any>();
  // const userData = useSelector((state: any) => state.user.user?.userDetails);
  const [inEditMode, setInEditMode] = useState(false);

  // useEffect(() => {
  //   setUser(userData);
  // }, []);

  const [initialData, setInitialData] = useState<ReceiptRegisterDetailsData>({
    receipt_no: "",
    ulb_id: "",
    primary_acc_code_id: "",
    revenue_module_id: "",
    revenue_accounted_type_id: "",
    paid_by: "",
    receipt_mode_id: "",
    receipt_date: "",
    cheque_or_draft_no: "",
    bank_amount: "",
    cash_amount: "",
    bank_acc_no: "",
    deposit_date: "",
    realisation_date: "",
    wheather_returned: undefined,
    remarks: "",
    entered_by_id: "",
    entered_by_print_name: "",
    checked_by_id: "",
    checked_by_print_name: "",
  });

  const queryClient = new QueryClient();

  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.RECEIPT_REGISTER.getById}/${ReceiptRegisterID}`,
      });

      if (!res.data.status) {
        throw "Something Went Wrong!!!";
      } else if (!res.data.data) {
        throw "Not Found";
      }

      // setData(res.data.data);
      setInitialData((prev) => {
        return {
          ...prev,
          receipt_no: res.data.data.receipt_no,
          ulb_id: res.data.data.ulb.id,
          primary_acc_code_id: res.data.data.primary_acc_code.id,
          revenue_module_id: res.data.data.revenue_module.id,
          revenue_accounted_type_id: res.data.data.revenue_accounted_type.id,
          paid_by: res.data.data.paid_by,
          receipt_mode_id: res.data.data.receipt_mode.id,
          receipt_date: DateFormatter(res.data.data.receipt_date) || "",
          cheque_or_draft_no: res.data.data?.cheque_or_draft_no || "",
          bank_amount: res.data.data.bank_amount,
          cash_amount: res.data.data.cash_amount,
          bank_acc_no: res.data.data.bank_acc_no || "",
          deposit_date: DateFormatter(res.data.data.deposit_date),
          realisation_date: DateFormatter(res.data.data.realisation_date),
          wheather_returned: res.data.data.wheather_returned,
          remarks: res.data.data.remarks,
          entered_by_id: res.data.data.entered_by?.id,
          entered_by_print_name: res.data.data?.entered_by_print_name,
          checked_by_id: res.data.data.checked_by_id?.id,
          checked_by_print_name: res.data.data.checked_by_print_name,
          del_checked_by_name: res.data.data.checked_by?.name,
          del_checked_by_designation:
            res.data.data.checked_by?.wf_roleusermaps[0]?.wf_role?.role_name,
          del_entered_by_name:
            res.data.data?.entered_by?.name ||
            res.data.data?.revenue_module?.name,
          del_entered_by_designation:
            res.data.data.entered_by?.wf_roleusermaps[0]?.wf_role?.role_name ||
            "null",
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { refetch: reloadData, isFetching: isFetching } = useQuery(
    ["receipt-register-get-single", ReceiptRegisterID],
    fetchData
  );

  useEffect(() => {
    reloadData();
  }, [ReceiptRegisterID]);

  // UPDATE VOUCHER DETAILS
  const UpdateReceiptRegisterEntry = async (
    values: ReceiptRegisterDetailsData
  ): Promise<ReceiptRegisterDetailsData> => {
    values.wheather_returned =
      String(values.wheather_returned) == "false" ? false : true;

    try {
      const res = await axios({
        url: `${FINANCE_URL.RECEIPT_REGISTER.update}`,
        method: "POST",
        data: {
          data: {
            id: Number(ReceiptRegisterID),
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
    ReceiptRegisterDetailsData,
    Error,
    ReceiptRegisterDetailsData
  >(UpdateReceiptRegisterEntry, {
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
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

  /////// Handle Edit Mode /////////
  const handleEditMode = () => {
    setInEditMode(!inEditMode);
  };

  ///////////// Handling React print
  const handlePrint = useReactToPrint({
    content: () => document.getElementById("receipt-print"),
    pageStyle: `
    @page {
        margin: 11mm 11mm 11mm 11mm;
}`,
  });

  return (
    <>
      {isSuccess && <SuccesfullConfirmPopup message="Updated Successfully" />}

      <RandomWorkingPopup show={isLoading} />
      <HeaderWidget
        title="Receipt Register"
        variant={searchParams == "view" ? "view" : "view"}
        editVisible={false}
        handleEditMode={handleEditMode}
        handlePrint={handlePrint}
      />
      {isFetching ? (
        <Loader />
      ) : (
        <FormikW
          title="Edit Receipt Register"
          initialValues={initialData}
          enableReinitialize={true}
          validationSchema={receiptRegisterDetailsSchema}
          onSubmit={onSubmit}
          readonly={searchParams === "view" || !inEditMode}
        />
      )}
    </>
  );
};
