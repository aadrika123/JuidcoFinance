"use client";

import React, { useState } from "react";
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

const ViewBankAccount = ({ bankID }: { bankID: string }) => {
  const [bankAccountDetails, setBankAccountDetails] = useState<AddBankDetailsData>(initialBankDetailsValues);

  const [isDataLossPopupOpen, setDataLossPopupOpen] = useState<boolean>(false);
  const [isSuccessNotificationOpen, setSuccessNotificationOpen] = useState<boolean>(false);

  const [readOnly, setReadOnly] = useState<boolean>(true);



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
      ulb_id: data.ulb.id,
      bank_type_id: data.bank_type.id
    };

    
    setBankAccountDetails(new_data);
    return new_data;
  };


  const {
    isError: fetchingError,
    isLoading: isFetching,
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

  const { mutate } = useMutation(updateBankDetails, {
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
    if(!editing){
      bankAccountForm.resetForm();
    }
    setReadOnly(!editing)
  }

  const buttons = () => {
    return (
      <>
        <ToggleButton name="Edit" onToggle={enablEditingMode}/>
      </>
    );
  }

  return (
    <>

      {isDataLossPopupOpen && (
        <LosingDataConfirmPopup cancel={() => setDataLossPopupOpen(false)} continue={goBack} />
      )}

      {isSuccessNotificationOpen && (
        <SuccesfullConfirmPopup message="Updated Successfully" />
      )}



      <ViewBankHeader title="View/Edit Bank Account" buttons={buttons}/>
        < section className="border bg-white rounded-lg border-primary_green p-6 px-10">

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
