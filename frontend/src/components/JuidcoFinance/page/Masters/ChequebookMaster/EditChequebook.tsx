"use client";

import React, { useEffect, useState } from "react";
import { FieldTypeProps } from "@/utils/types/FormikTypes/formikTypes";
import axios from "@/lib/axiosConfig";
import { DateFormatter, filterValBefStoring } from "@/utils/helper";
import { QueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import goBack from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import APIs from "@/json/apis.json";
import FormikWrapperV from "@/components/global/organisms/FormikContainerV";
import { HeaderWidgetV } from "@/components/Helpers/Widgets/HeaderWidgetV";
import { ChequebookDataProps, ResponseData } from "@/utils/types/chequebook_master_types";
import { ChequebookDetailsSchema } from "@/utils/validation/masters/chequebook_master.validation";

export const EditChequebook = ({
  chequebookID,
}: {
  chequebookID: string;
}) => {
  const searchParams = useSearchParams().get("mode");

  const [initialData, setInitialData] = useState<ChequebookDataProps>({
    date: "",
    bank_branch: "",
    bank_name: "",
    bank_account_no: "",
    cheque_no_from: "",
    cheque_no_to: "",
    employee_id: "",
    issuer_name: "",
    page_count: "",
    remarks: "",
  });

  const queryClient = new QueryClient();

  // Get Payment entry by ID
  useEffect(() => {
    (async function () {
      const res: ResponseData = await axios({
        method: "GET",
        url: `/chequebook-entry/get/${chequebookID}`,
      });

      setInitialData((prev: ChequebookDataProps) => {
        const d = res.data.data;
        console.log(res);
        return {
          ...prev,
          date: DateFormatter(d.date),
          bank_name: d.bank_name,
          bank_branch: d.bank_branch,
          bank_account_no: d.bank_account_no,
          cheque_no_from: d.cheque_no_from,
          cheque_no_to: d.cheque_no_to,
          employee_id: d.employee.id,
          issuer_name: d.issuer_name,
          page_count: d.page_count,
          remarks: d.remarks,
        };
      });
    })();
  }, []);

  // UPDATE DIRECT PAYMENT ENTRY
  const UpdateChequebook = async (
    values: ChequebookDataProps
  ): Promise<ChequebookDataProps> => {
    console.log(values);
    try {
      const res = await axios({
        url: `/chequebook-entry/update`,
        method: "POST",
        data: {
          id: Number(chequebookID),
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
    ChequebookDataProps,
    Error,
    ChequebookDataProps
  >(UpdateChequebook, {
    onSuccess: () => {
      toast.success("Updated Successfully")
    },
    onError: () => {
      alert("Error updating the record.");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
      setTimeout(() => {
        goBack();
      }, 2000);
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    values.date = `${new Date(values.date).toISOString()}`;
    mutate(filterValBefStoring(values));
  };

  // Add Input Fields
  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Issue Date",
      ACCESSOR: "date",
      PLACEHOLDER: "DD/MM/YYYY",
      TYPE: "date",
    },
    {
      CONTROL: "input",
      HEADER: "Bank Branch",
      ACCESSOR: "bank_branch",
      PLACEHOLDER: "Example: Kantatoli, Ranchi",
    },
    {
      CONTROL: "input",
      HEADER: "Bank Name",
      ACCESSOR: "bank_name",
      PLACEHOLDER: "Example: ICICI BANK"
    },

    {
      CONTROL: "input",
      HEADER: "Bank Account No.",
      ACCESSOR: "bank_account_no",
      PLACEHOLDER: "Example: 3224242234324"
    },

    {
      CONTROL: "input",
      HEADER: "Cheque no from",
      ACCESSOR: "cheque_no_from",
      PLACEHOLDER: "Example: 23423432"
    },
    {
      CONTROL: "input",
      HEADER: "Cheque no to",
      ACCESSOR: "cheque_no_to",
      PLACEHOLDER: "Example: 34232242"
    },
    {
      CONTROL: "select",
      HEADER: "Employee",
      ACCESSOR: "employee_id",
      PLACEHOLDER: "Select employee",
      API: `${APIs.employee_root}`,
    },

    {
      CONTROL: "input",
      HEADER: "Issuer Name",
      ACCESSOR: "issuer_name",
      PLACEHOLDER: "Example: Reserve Bank of India"
    },
    
    {
      CONTROL: "input",
      HEADER: "Page Count",
      ACCESSOR: "page_count",
      PLACEHOLDER: "Example: 10"
    },
    {
      CONTROL: "input",
      HEADER: "Remarks",
      ACCESSOR: "remarks",
      PLACEHOLDER: "Example: specific information"
    },
  ];

  return (
    <>
      <Toaster />
      <HeaderWidgetV title="Chequebook" variant={searchParams == "view"? "view" : "edit"} />
      <FormikWrapperV
        title=""
        initialValues={initialData}
        enableReinitialize={true}
        validationSchema={ChequebookDetailsSchema}
        onSubmit={onSubmit}
        fields={fields}
        readonly={searchParams === "view"}
      />
    </>
  );
};
