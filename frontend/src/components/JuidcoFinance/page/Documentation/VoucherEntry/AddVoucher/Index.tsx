"use client";

import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import TableWithCount from "@/components/JuidcoFinance/Partials/organisms/TableWithCount";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Choice,
  FieldTypeProps,
  FormValues,
} from "@/utils/types/FormikTypes/formikTypes";
import FormikWrapper from "@/components/global/organisms/FormikContainer";
import { FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/reducers/PopupReducers";

const Hoc = PopupFormikHOC(FormikWrapper);

export const AddVoucherEntry = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(openPopup())
  }, [])
  const [data, setData] = useState<FormValues[]>([]);
  const choices: Choice[] = [
    { key: "Choice a", value: "choicea" },
    { key: "Choice b", value: "choiceb" },
  ];

  const initialValues: FormValues = {
    email: "sanjiv@gmail.com",
    description: "",
    select_choice: "",
    click_choice: "",
    check_box_choice: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    select_choice: Yup.number().required("Required"),
    click_choice: Yup.string().required("Required"),
    check_box_choice: Yup.boolean().required("Required"),
  });

  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    setData((prev) => [...prev, values]);
    actions.setSubmitting(false);
  };

  const fields: FieldTypeProps[] = [
    {
      CONTROL: "input",
      HEADER: "Email",
      ACCESSOR: "email",
      PLACEHOLDER: "Enter Email",
    },
    {
      CONTROL: "textarea",
      HEADER: "Description",
      ACCESSOR: "description",
      PLACEHOLDER: "Enter Description",
    },
    {
      CONTROL: "select",
      HEADER: "Select your choice",
      ACCESSOR: "select_choice",
      PLACEHOLDER: "Select your choice",
      API: "/bill-type/get",
    },
    {
      CONTROL: "radio",
      HEADER: "Click your choice",
      ACCESSOR: "click_choice",
      OPTIONS: choices,
    },
    {
      CONTROL: "checkbox",
      HEADER: "Select your choice",
      ACCESSOR: "check_box_choice",
    },
  ];

  const footerData = [
    {
      key: "Total",
      value: 200,
    },
    {
      key: "Net Total",
      value: 300,
    },
  ];

  return (
    <>
      <Hoc
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        fields={fields}
      />
      <TableWithCount
        data={data}
        scrollable
        title="Title 1"
        columns={[
          { name: "email", caption: "Sr. No." },
          { name: "description", caption: "Sub-Ledger/Name" },
          { name: "select_choice", caption: "Amount(Rs) " },
          { name: "click_choice", caption: "Voucher Type" },
          // { name: "branch", caption: "Dr/Cr" },
          // { name: "branch", caption: "Add/Remove" },
        ]}
        footerData={footerData}
      />
    </>
  );
};
