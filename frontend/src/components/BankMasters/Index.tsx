"use client";

import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import AccountList from "./AccountList/AccountList";
import AddBankHeader from "./AddBank/AddBank";
import Popup from "../Helpers/Basic/Popup";
import InputBox from "../Helpers/InputBox";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Helpers/Basic/Loader";
import * as Yup from "yup";
import { Formik } from "formik";
import PrimaryButton from "../Helpers/Button";
import { addBankDetails } from "@/redux/bankMasterReducer";
import { useDispatch } from "react-redux";
import type {
  AddBankDetailsData,
  AccountTableData,
  BankMasterProps,
} from "@/utils/types/bank_master_types";

// ----- FORMIK & YUP FORM VAIDATION ---------- //
export const AddBankDetailsSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank Name is required"),
  ifscCode: Yup.string().required("IFSC Code is required"),
  branch: Yup.string().required("Branch Name is required"),
  micrCode: Yup.string().required("Micr Code is required"),
  branchAddress: Yup.string().required("Branch Address is required"),
  branchCity: Yup.string().required("Branch City is required"),
  branchState: Yup.string().required("Branch State is required"),
  branchDistrict: Yup.string().required("Branch District is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactNo: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Contact Number is required"),
  contactPersonName: Yup.string().required("Contact Person Name is required"),
});

export const initialBankDetailsValues = {
  bankName: "",
  ifscCode: "",
  branch: "",
  micrCode: "",
  branchAddress: "",
  branchCity: "",
  branchState: "",
  branchDistrict: "",
  email: "",
  contactNo: "",
  contactPersonName: "",
};

// ----- FORMIK & YUP FORM VAIDATION ---------- //

export const HeroBankMasters = () => {
  const [page, setPage] = useState<number>(1);
  const [isAddBankAccountOpen, setIsBankAccountOpen] = useState<boolean>(false);

  const handlePageChangeAccountList = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  function handleOpenAddBankAccount() {
    setIsBankAccountOpen(!isAddBankAccountOpen);
  }

  // redux
  const dispatch = useDispatch();

  // redux

  // ----- FETCH DATA ------////

  const queryClient = useQueryClient();

  const fetchBankData = async (): Promise<
    BankMasterProps<AccountTableData>
  > => {
    const res = await axios({
      url: `bank-master/get-all?limit=10&page=${page}`,
      method: "GET",
    });
    return res.data?.data as BankMasterProps<AccountTableData>;
  };

  const {
    data: accountListData,
    isError: bankAccountError,
    isLoading: bankAccountLoading,
  } = useQuery(["bank-list", page], fetchBankData);

  if (accountListData?.data) {
    dispatch(addBankDetails(accountListData?.data ?? []));
  }

  if (bankAccountError) {
    throw new Error("some error occurred");
  }

  // Add Bank Details
  const createBankDetails = async (
    values: AddBankDetailsData
  ): Promise<AddBankDetailsData> => {
    const res = await axios({
      url: `/bank-master/create`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  const { mutate } = useMutation(createBankDetails, {
    onSuccess: (data) => {
      console.log(data);
      handleOpenAddBankAccount();
      toast.success("Successfully Added Bank Details!");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  return (
    <>
      <Toaster />
      {isAddBankAccountOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-30"></div>
          <section className="fixed left-1/2 top-[2rem] transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[11.73831rem] z-50">
            <div className="relative z-50 scale-75">
              <Popup
                closeModal={handleOpenAddBankAccount}
                title="Add Bank Account"
              >
                <Formik
                  initialValues={initialBankDetailsValues}
                  validationSchema={AddBankDetailsSchema}
                  onSubmit={(values) => {
                    console.log(values);
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
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.bankName}
                          error={errors.bankName}
                          touched={touched.bankName}
                          label="Name of Bank *"
                          name="bankName"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ifscCode}
                          error={errors.ifscCode}
                          touched={touched.ifscCode}
                          label="IFSC Code *"
                          name="ifscCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branch}
                          error={errors.branch}
                          touched={touched.branch}
                          label="Bank Branch *"
                          name="branch"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.micrCode}
                          error={errors.micrCode}
                          touched={touched.micrCode}
                          label="MICR Code"
                          name="micrCode"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branchAddress}
                          error={errors.branchAddress}
                          touched={touched.branchAddress}
                          label="Bank Branch Address"
                          name="branchAddress"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contactNo}
                          error={errors.contactNo}
                          touched={touched.contactNo}
                          label="Contact Number"
                          name="contactNo"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branchCity}
                          error={errors.branchCity}
                          touched={touched.branchCity}
                          label="Bank Branch City"
                          name="branchCity"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branchDistrict}
                          error={errors.branchDistrict}
                          touched={touched.branchDistrict}
                          label="Bank Branch District"
                          name="branchDistrict"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branchState}
                          error={errors.branchState}
                          touched={touched.branchState}
                          label="Bank Branch State "
                          name="branchState"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          error={errors.email}
                          touched={touched.email}
                          label="Email Id"
                          name="email"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contactPersonName}
                          error={errors.contactPersonName}
                          touched={touched.contactPersonName}
                          name="contactPersonName"
                          label="Contact Person Name / Designation"
                        />
                      </div>
                      <div className="mt-4 flex items-center gap-5 justify-end">
                        <PrimaryButton
                          onClick={handleOpenAddBankAccount}
                          buttonType="button"
                          variant="cancel"
                        >
                          Close
                        </PrimaryButton>
                        <PrimaryButton buttonType="button" variant="cancel">
                          Reset
                        </PrimaryButton>
                        <PrimaryButton buttonType="submit" variant="primary">
                          Save
                        </PrimaryButton>
                      </div>
                    </form>
                  )}
                </Formik>
              </Popup>
            </div>
          </section>
        </>
      )}

      <section>
        <AddBankHeader openModal={handleOpenAddBankAccount} />
      </section>

      <section className="mt-8">
        {bankAccountLoading ? (
          <Loader />
        ) : (
          <AccountList
            nextPage={() => handlePageChangeAccountList("next")}
            prevPage={() => handlePageChangeAccountList("prev")}
            pages={{
              page: page,
              totalPage: accountListData?.totalPage ?? 1,
              currentPage: accountListData?.currentPage ?? 1,
            }}
          />
        )}
      </section>
    </>
  );
};
