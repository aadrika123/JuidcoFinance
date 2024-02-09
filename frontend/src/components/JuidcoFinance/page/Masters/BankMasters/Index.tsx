"use client";

// Imports //
import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import AccountList from "./AccountList/AccountList";
import AddBankHeader from "./AddBank/AddBank";
import Popup from "@/components/Helpers/Basic/Popup";
import InputBox from "@/components/Helpers/InputBox";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Helpers/Basic/Loader";
import { Formik } from "formik";
import PrimaryButton from "@/components/Helpers/Button";
import { addBankDetails } from "@/redux/reducers/bankMasterReducer";
import { useDispatch } from "react-redux";
import {
  AddBankDetailsSchema,
  initialBankDetailsValues,
} from "@/utils/validation/masters/bank_master.validation";
import type {
  AddBankDetailsData,
  AccountTableData,
} from "@/utils/types/bank_master_types";
import type { MasterProps } from "@/utils/types/types";
import { FINANCE_URL } from "@/utils/api/urls";
// Imports //----------------------------------------------------------------

// Main Functions //
export const HeroBankMasters = () => {
  const [page, setPage] = useState<number>(1);
  const [isAddBankAccountOpen, setIsBankAccountOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fetchQuery, setFetchQuery] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handlePageChangeAccountList = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  function handleOpenAddBankAccount() {
    setIsBankAccountOpen(!isAddBankAccountOpen);
  }

  // Handle change Value for search fetch query
  function handleSearchFetchQueryChange(): void {
    setFetchQuery(!fetchQuery);
  }
  console.log(fetchQuery);

  // ----- FETCH DATA ------////
  const queryClient = useQueryClient();

  const fetchBankData = async (): Promise<MasterProps<AccountTableData>> => {
    const res = await axios({
      url: `${FINANCE_URL.BANK_MASTER_URL.get}&page=${page}&search=${searchQuery}`,
      method: "GET",
    });
    return res.data?.data as MasterProps<AccountTableData>;
  };

  const {
    data: accountListData,
    isError: bankAccountError,
    isLoading: bankAccountLoading,
  } = useQuery(["bank-list", page, fetchQuery], fetchBankData);

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
      url: `${FINANCE_URL.BANK_MASTER_URL.create}`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  // mutate Bank Details
  const { mutate } = useMutation<AddBankDetailsData, Error, AddBankDetailsData>(
    createBankDetails,
    {
      onSuccess: (data) => {
        console.log(data);
        handleOpenAddBankAccount();
        toast.success("Successfully Added Bank Details!");
      },
      onError: () => {
        alert("there was an error");
      },
      onSettled: () => {
        queryClient.invalidateQueries("bank-list");
      },
    }
  );

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
                  onSubmit={(values: AddBankDetailsData) => {
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
                          value={values.bank_name}
                          error={errors.bank_name}
                          touched={touched.bank_name}
                          label="Name of Bank *"
                          name="bank_name"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.ifsc_code}
                          error={errors.ifsc_code}
                          touched={touched.ifsc_code}
                          label="IFSC Code *"
                          name="ifsc_code"
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
                          value={values.micr_code}
                          error={errors.micr_code}
                          touched={touched.micr_code}
                          label="MICR Code"
                          name="micr_code"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branch_address}
                          error={errors.branch_address}
                          touched={touched.branch_address}
                          label="Bank Branch Address"
                          name="branch_address"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.contact_no}
                          error={errors.contact_no}
                          touched={touched.contact_no}
                          label="Contact Number"
                          name="contact_no"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branch_city}
                          error={errors.branch_city}
                          touched={touched.branch_city}
                          label="Bank Branch City"
                          name="branch_city"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branch_district}
                          error={errors.branch_district}
                          touched={touched.branch_district}
                          label="Bank Branch District"
                          name="branch_district"
                        />
                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.branch_state}
                          error={errors.branch_state}
                          touched={touched.branch_state}
                          label="Bank Branch State "
                          name="branch_state"
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
                          value={values.contact_person_name}
                          error={errors.contact_person_name}
                          touched={touched.contact_person_name}
                          name="contact_person_name"
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
            setSearchQuery={setSearchQuery}
            setFetchQuery={handleSearchFetchQueryChange}
          />
        )}
      </section>
    </>
  );
};