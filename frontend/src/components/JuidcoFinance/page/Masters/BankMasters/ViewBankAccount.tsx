"use client";

import React, { useState, useRef, useEffect} from "react";
import { initialBankDetailsValues } from "@/utils/validation/masters/bank_master.validation";
import axios from "@/lib/axiosConfig";
import { AddBankDetailsData } from "@/utils/types/bank_master_types";
import { FINANCE_URL } from "@/utils/api/urls";
import goBack from "@/utils/helper";
import { useMutation, useQuery } from "react-query";
import { useQueryClient } from "react-query";
import Loader from "@/components/global/atoms/Loader";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import { ViewBankHeader } from "./molecules/ViewBankHeader";
import ToggleButton from "@/components/global/atoms/ToggleButton";
import BankAccountForm from "./molecules/BankAccountForm";
import Button from "@/components/global/atoms/Button";
import { useReactToPrint } from 'react-to-print';
import { PrintReadyBankComponent } from "./molecules/PrintReadyBankComponent";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";


const ViewBankAccount = ({ bankID }: { bankID: string }) => {
  const [bankAccountDetails, setBankAccountDetails] = useState<AddBankDetailsData>(initialBankDetailsValues);

  const [isDataLossPopupOpen, setDataLossPopupOpen] = useState<boolean>(false);
  const [isSuccessNotificationOpen, setSuccessNotificationOpen] = useState<boolean>(false);

  const [readOnly, setReadOnly] = useState<boolean>(true);

  const componentRef = useRef(null);
  const printIt = useReactToPrint({
    content: () => componentRef.current,
  });



  const queryClient = useQueryClient();

  let isDirty = false;
  const onDirty = (arg: boolean): boolean => {
    isDirty = arg;
    return isDirty;
  }


  const loadBankDetails = async (
  ): Promise<AddBankDetailsData> => {
    const res = await axios({
      url: `${FINANCE_URL.BANK_MASTER_URL.getById}/${bankID}`,
      method: "GET",
    });

    const data = res.data.data;

    console.log(data);

    // replace nulls with empty string "", ( formik does not reset the fields that have null as initial value)
    Object.keys(data).forEach(key => {
      const val = data[key as keyof typeof data];
      if (val == null) {
        data[key] = "";
      }
    });

    const new_data = {
      ...data,
      bank_id: data.bank.id,
      bank: data.bank.name,
      ulb_id: data.ulb.id,
      ulb: data.ulb.ulbs,
      bank_type_id: data.bank_type.id,
      bank_type: data.bank_type.name,
    };


    setBankAccountDetails(new_data);
    return new_data;
  };


  const {
    isError: fetchingError,
    isLoading: isFetching,
    refetch: reloadData,
  } = useQuery(["bank-details", bankID], loadBankDetails);

  if (fetchingError) {
    console.log(fetchingError);
  }


  const updateBankDetails = async (values: AddBankDetailsData) => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.BANK_MASTER_URL.update}`,
        method: "POST",
        data: {
          id: bankAccountDetails?.id,
          ...values,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate, isLoading: isSaving } = useMutation(updateBankDetails, {
    onSuccess: () => {
      setSuccessNotificationOpen(true);

      setTimeout(() => {
        setSuccessNotificationOpen(false);
        goBack();
      }, 2000);
    },

    onError: (error) => {
      console.log(error);
      alert("there was an error updating");
    },

    onSettled: () => {
      queryClient.invalidateQueries("bank-list");
    },
  });



  const handleBack = () => {
    if (isDirty) {
      setDataLossPopupOpen(true);
    } else {
      goBack();
    }
  }

  const onSubmit = (values: AddBankDetailsData) => {
    values.id = parseInt(bankID);
    console.log(values)
    mutate(values);
  }

  const bankAccountForm = new BankAccountForm({
    initialBankDetailsValues: bankAccountDetails,
    onSubmit: onSubmit,
    onBack: handleBack,
    onDirty: onDirty,
    readOnly: readOnly
  });


  const enablEditingMode = (editing: boolean) => {
    if (!editing) {
      bankAccountForm.resetForm();
    }
    setReadOnly(!editing)
  }

  const buttons = () => {
    return (
      <>
        <ToggleButton name="Edit" onToggle={enablEditingMode} />
        <Button onClick={printIt} variant="primary">Print</Button>
      </>
    );
  }


  
  useEffect(() => {
    reloadData();
  });



  return (
    <>
      <div style={{ display: "none" }}>
      {/* <div> */}
        <div ref={componentRef}>
          <PrintReadyBankComponent bank={bankAccountDetails} />
        </div>
      </div>

        <RandomWorkingPopup show={isSaving}/>


      {isDataLossPopupOpen && (
        <LosingDataConfirmPopup cancel={() => setDataLossPopupOpen(false)} continue={goBack} />
      )}

      {isSuccessNotificationOpen && (
        <SuccesfullConfirmPopup message="Updated Successfully" />
      )}



      <ViewBankHeader title="View/Edit Bank Account" buttons={buttons}   />
      
      < section className="border bg-white rounded-lg border-primary_bg_indigo p-6 px-10">

        {isFetching ? (
          <Loader />
        ) : (
            bankAccountForm.render()         
        )}

      </section>
    </>
  );
};

export default ViewBankAccount;
