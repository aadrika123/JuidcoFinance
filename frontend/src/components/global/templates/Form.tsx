"use client";

import React from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";
import FormikWrapper from "../organisms/FormikContainer";
import { Choice, FieldTypeProps, FormValues } from "@/utils/types/FormikTypes/formikTypes";

interface HrmsFormProps {
  onClose?: () => void;
}

const Form: React.FC<HrmsFormProps> = (props) => {
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
    console.log("Form data", values);
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

  return (
    <>
      <FormikWrapper
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        fields={fields}
        onClose={props.onClose}
      />
    </>
  );
};

export default Form;
