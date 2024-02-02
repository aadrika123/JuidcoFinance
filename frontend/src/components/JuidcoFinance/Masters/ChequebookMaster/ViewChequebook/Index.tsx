"use client"
import React from "react";
import axios from "axios";
import { Formik } from "formik";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "@/components/Helpers/Basic/Loader";
import { ChequebookData } from "@/utils/types/chequebook_master_types";
import DropDownListBox from "@/components/Helpers/DropDownListBox";
import InputBox from "@/components/Helpers/InputBox";
import * as Yup from "yup";
import DateInputBox from "@/components/Helpers/DateInputBox";
import Joi from "joi";
import Routes from "@/json/routes.json";
import toast, { Toaster } from "react-hot-toast";
import APIs from "@/json/apis.json";


/**
 * | Author- Bijoy Paitandi
 * | Created On- 25-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

export interface UpdateChequebookDetailsData {
  id: number,
  date: Date;
  issuer_name: string
  bank_name: string;
  bank_account_no: string;
  cheque_no_from: string;
  employee_id: number;
  bank_branch: string;
  page_count: number;
  cheque_no_to: string;
}

export const HeroViewChequebook = ({chequebookID}: {chequebookID:string}) => {
  

  // validate
  const { error } = Joi.object({
    id: Joi.number().required()
  }).validate({'id': chequebookID});

  if (error){
    window.alert(error.message);
    window.open(Routes.chequebook_master, "_self");
    return;
  }


   // ----- FETCH DATA ------////
   const fetchData = async (): Promise<ChequebookData> => {
    const res = await axios({
      url: `${APIs.chequebook_master$get}/${chequebookID}`,
      method: "GET",
    });
    
    const data = res.data.data;

    if(!data){
      window.alert("The chequebook record not found");
      window.open(Routes.chequebook_master, "_self");
    }

    return data;
  };

  
  const {
    data: chequebookData,
    isError: chequebookDataError,
    isLoading: chequebookDataLoading,
  } = useQuery([chequebookID], fetchData);

  if (chequebookDataError) {
    console.log(chequebookDataError);
    window.alert("some error occurred");
  }  

  // ----- FORMIK & YUP FORM VAIDATION ---------- //
  const AddCheckbookDetailsSchema = Yup.object().shape({
    id: Yup.number().required().notOneOf([-1]),
    date: Yup.date().required("Issue date is required."),
    issuer_name: Yup.string().required("Issuer name is required."),
    bank_name: Yup.string().required("Bank Name is required"),
    bank_account_no: Yup.string().required("Bank Account No is required."),
    cheque_no_from: Yup.string().required("Serial number of first check leaf"),
    employee_id: Yup.number().required("Please select the employee").notOneOf([-1], "Please select an employee"),
    bank_branch: Yup.string().required("Bank branch is required."),
    page_count: Yup.number().required("Page count is required.").notOneOf([0], "Invalid page count"),
    cheque_no_to: Yup.string().required("Serial number of the last check leaf is required")
  });

  const initialChequebookDetails = chequebookData?{
    id: chequebookData.id,
    date: new Date(chequebookData?.date),
    issuer_name: chequebookData?.issuer_name,
    bank_name: chequebookData?.bank_name,
    bank_account_no: chequebookData?.bank_account_no,
    cheque_no_from: chequebookData?.cheque_no_from,
    employee_id: chequebookData?.employee.id,
    bank_branch: chequebookData?.bank_branch,
    page_count: chequebookData?.page_count,
    cheque_no_to: chequebookData?.cheque_no_to,
  }:{
    id: -1,
    date: new Date(),
    issuer_name: "",
    bank_name: "",
    bank_account_no: "",
    cheque_no_from: "",
    employee_id: -1,
    bank_branch: "",
    page_count: 0,
    cheque_no_to: "",
  };


  const queryClient = useQueryClient();

    // Add Chequebook Details
    const updateChequebookDetails = async (
      values: UpdateChequebookDetailsData
    ): Promise<UpdateChequebookDetailsData> => {
      const res = await axios({
        url: `${APIs.chequebook_master$update}`,
        method: "POST",
        data: values,
      });
      return res.data;
    };

    const { mutate } = useMutation(updateChequebookDetails, {
      onSuccess: (data) => {
        console.log(data);
        
        toast.success("Successfully Updated Chequebook Details!");
      },
      onError: () => {
        alert("There was an error, Please check your internet connection.");
      },
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    });

  return (
    <>
    <Toaster />
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>View / Edit Chequebook</SubHeading>
        
      </div>

      
      <section className="mt-8">
        {chequebookDataLoading ? (
          <Loader />
        ) : (
          <Formik
                  enableReinitialize={true}
                  initialValues={initialChequebookDetails}
                  validationSchema={AddCheckbookDetailsSchema}
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
                    resetForm,
                    dirty
                  }) => (
                    <form onSubmit={handleSubmit}>

                      <input type="hidden" name="id" value={values.id} />
                      
                      <div className="grid grid-cols-2 gap-x-6 gap-4 ">
                        
                        <DateInputBox
                          label="Issue Date"
                          name="date"
                          error={errors.date}
                          touched={touched.date}
                          value={values.date}
                        />
                        
                        <InputBox
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

                        <InputBox
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          placeholder="Example: Bank of Baroda"
                          value={values.bank_name}
                          touched={touched.bank_name}
                          error={errors.bank_name}
                          label="Name of the bank"
                          name="bank_name"
                        />

                        <DropDownListBox
                          api={APIs.chequebook_master$employee_list}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Please select an employee"
                          value={values.employee_id}
                          error={errors.employee_id}
                          touched={touched.employee_id}
                          label="Employee Name"
                          name="employee_id"
                        />

                        <InputBox
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
                        <InputBox
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
                        <InputBox
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
                        <InputBox
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
                        <InputBox
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
                        <PrimaryButton buttonType="button" onClick={() => window.alert("coming soon")}variant="cancel">
                          Print
                        </PrimaryButton>

                        {dirty && (       
                          <>
                          <PrimaryButton buttonType="button" onClick={resetForm} variant="cancel">
                            Reset
                          </PrimaryButton>
                          <PrimaryButton buttonType="submit" variant="primary">
                              Save
                            </PrimaryButton>
                          </>                   
                        )}
                        </div>
                        
                      
                    </form>
                  )}
              </Formik>

        )}
      </section>
      <div className="mt-8">
        
        
      </div>
    </section>
      
    </>
  );
};
