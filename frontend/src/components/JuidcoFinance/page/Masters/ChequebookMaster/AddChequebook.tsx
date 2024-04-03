"use client";

import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Formik } from "formik";
import { SubHeading } from "@/components/Helpers/Heading";
import * as Yup from "yup";
import DateInputBox from "@/components/Helpers/DateInputBox";
import Routes from "@/json/routes.json";
import APIs from "@/json/apis.json";
import goBack from "@/utils/helper";
import { FINANCE_URL } from "@/utils/api/urls";
import Input from "@/components/global/atoms/Input";
import Button from "@/components/global/atoms/Button";
import DropDownList from "@/components/global/atoms/DropDownList";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | UI/UX Design: https://www.figma.com/file/E8bQY6k1Hx9IFkZEOXXo6R/Finance-Module-Final-Kit?node-id=933%3A2529&mode=dev
 * | Status: closed
 */

export interface AddChequebookDetailsData {
  date: Date;
  issuer_name: string;
  bank_id: number | string;
  bank_account_no: string;
  cheque_no_from: string;
  employee_id: number;
  bank_branch: string;
  page_count: number;
  cheque_no_to: string;
}

export const AddChequebook = () => {
  const queryClient = useQueryClient();

  // Add Chequebook Details
  const createChequebookDetails = async (
    values: AddChequebookDetailsData
  ): Promise<AddChequebookDetailsData> => {
    const res = await axios({
      url: `${APIs.chequebook_mater$create}`,
      method: "POST",
      data: {
        data: values,
      },
    });
    if (res.data.status) {
      return res.data;
    }
    throw "Something Went Wrong";
  };
  const { mutate, isLoading, isSuccess } = useMutation(
    createChequebookDetails,
    {
      onSuccess: () => {
        setTimeout(() => {
          goBack();
        }, 2000);
      },
      onError: () => {
        alert("There was an error, Please check your internet connection.");
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );
  // ----- FORMIK & YUP FORM VAIDATION ---------- //
  const AddCheckbookDetailsSchema = Yup.object().shape({
    date: Yup.date().required("Issue date is required."),
    issuer_name: Yup.string().required("Issuer name is required."),
    bank_id: Yup.string().required("Bank Name is required"),
    bank_account_no: Yup.string().required("Bank Account No is required."),
    cheque_no_from: Yup.string().required("Serial number of first check leaf"),
    employee_id: Yup.number()
      .required("Please select the employee")
      .notOneOf([-1], "Please select an employee"),
    bank_branch: Yup.string().required("Bank branch is required."),
    page_count: Yup.number()
      .required("Page count is required.")
      .notOneOf([0], "Invalid page count"),
    cheque_no_to: Yup.string().required(
      "Serial number of the last check leaf is required"
    ),
  });

  const initialChequebookDetails = {
    date: new Date(),
    issuer_name: "",
    bank_id: -1,
    bank_account_no: "",
    cheque_no_from: "",
    employee_id: -1,
    bank_branch: "",
    page_count: 0,
    cheque_no_to: "",
  };

  // ----- FORMIK & YUP FORM VAIDATION ---------- //

  return (
    <>
      {isSuccess && <SuccesfullConfirmPopup message="Saved Successfully" />}

      <RandomWorkingPopup show={isLoading} />

      <section className="border bg-white shadow-xl p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>Add Cheque Book</SubHeading>
        </div>

        <div className="mt-8">
          <Formik
            initialValues={initialChequebookDetails}
            validationSchema={AddCheckbookDetailsSchema}
            onSubmit={(values) => {
              // console.log(values);
              mutate(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                  <DateInputBox
                    label="Issue Date"
                    name="date"
                    error={errors.date}
                    touched={touched.date}
                    value={values.date}
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Example: ICICI bank Delhi"
                    value={values.issuer_name}
                    touched={touched.issuer_name}
                    error={errors.issuer_name}
                    label="Issuer Name"
                    name="issuer_name"
                  />
                  <DropDownList
                    api={`${FINANCE_URL.BANK_URL.get}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Please select an bank"
                    value={values.bank_id}
                    error={errors.bank_id}
                    touched={touched.bank_id}
                    label="Bank Name"
                    name="bank_id"
                  />
                  <DropDownList
                    api={`${FINANCE_URL.EMPLOYEE_URL.get}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Please select an employee"
                    value={values.employee_id}
                    error={errors.employee_id}
                    touched={touched.employee_id}
                    label="Employee Name"
                    name="employee_id"
                  />

                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Example: Ranchi"
                    value={values.bank_branch}
                    touched={touched.bank_branch}
                    error={errors.bank_branch}
                    label="Bank Branch Name"
                    name="bank_branch"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Example: 374837438787438"
                    value={values.cheque_no_from}
                    touched={touched.cheque_no_from}
                    error={errors.cheque_no_from}
                    label="Cheque Number From"
                    name="cheque_no_from"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Example: 32987239847"
                    value={values.bank_account_no}
                    touched={touched.bank_account_no}
                    error={errors.bank_account_no}
                    label="Bank Account No"
                    name="bank_account_no"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Example: 374837438787438"
                    value={values.cheque_no_to}
                    touched={touched.cheque_no_to}
                    error={errors.cheque_no_to}
                    label="Cheque Number To"
                    name="cheque_no_to"
                  />
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Example: 20"
                    value={values.page_count}
                    touched={touched.page_count}
                    error={errors.page_count}
                    label="Number of pages"
                    name="page_count"
                  />
                </div>

                <div className="mt-4 flex items-center gap-5 justify-end">
                  <Button
                    onClick={() => open(Routes.chequebook_master, "_self")}
                    variant="cancel"
                  >
                    Back
                  </Button>
                  {dirty && (
                    <>
                      <Button onClick={handleReset} variant="cancel">
                        Reset
                      </Button>
                      <Button buttontype="submit" variant="primary">
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};
