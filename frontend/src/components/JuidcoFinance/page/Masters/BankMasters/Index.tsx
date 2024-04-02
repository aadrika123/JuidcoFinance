"use client";

// Imports //
import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import AddBankHeader from "./molecules/AddBankHeader";
import { useMutation, useQueryClient } from "react-query";
import { Toaster } from "react-hot-toast";
import { initialBankDetailsValues } from "@/utils/validation/masters/bank_master.validation";
import type {
  AddBankDetailsData,
} from "@/utils/types/bank_master_types";
import { FINANCE_URL } from "@/utils/api/urls";
import TableWithFeatures from "@/components/global/organisms/TableWithFeatures";
import ViewIconButton from "@/components/global/atoms/ViewIconButton";
import { usePathname, useRouter } from "next/navigation";
import LosingDataConfirmPopup from "@/components/global/molecules/general/LosingDataConfirmPopup";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import Popup from "@/components/global/molecules/general/Popup";
import BankAccountForm from "./molecules/BankAccountForm";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";

// Imports //----------------------------------------------------------------

// Main Functions //
export const HeroBankMasters = () => {
  const pathName = usePathname();
  const router = useRouter();


  const [isAddBankAccountOpen, setIsBankAccountOpen] = useState<boolean>(false);
  const [isDataLossPopupOpen, setDataLossPopupOpen] = useState<boolean>(false);
  const [isSuccessNotificationOpen, setSuccessNotificationOpen] = useState<boolean>(false);
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();


  let isDirty = false;
  const onDirty = (arg: boolean): boolean => {
    isDirty = arg;
    return isDirty;
  }

  function handleOpenAddBankAccount() {
    if (isDirty) {
      showDataLossWarningPopup();
    } else {
      setIsBankAccountOpen(!isAddBankAccountOpen);
    }
  }

  function showDataLossWarningPopup() {
    setDataLossPopupOpen(true);
  }


  function closePopups() {
    setDataLossPopupOpen(false);
    setIsBankAccountOpen(false);
  }


  // ----- FETCH DATA ------////
  const queryClient = useQueryClient();

  // Add Bank Details
  const createBankDetails = async (
    values: AddBankDetailsData
  ): Promise<AddBankDetailsData> => {
    const res = await axios({
      url: `${FINANCE_URL.BANK_MASTER_URL.create}`,
      method: "POST",
      data: {
        data: values
      },
    });

    return res.data;
  };

  // mutate Bank Details
  const { mutate, isLoading: isSaving } = useMutation<AddBankDetailsData, Error, AddBankDetailsData>(
    createBankDetails,
    {
      onSuccess: () => {
        setIsBankAccountOpen(false);
        setSuccessNotificationOpen(true);

        setTimeout(() => {
          setIsBankAccountOpen(false);
          setSuccessNotificationOpen(false);
        }, 1000);
      },
      onError: () => {
        alert("there was an error");
      },
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    }
  );

  const onViewButtonClick = (id: string) => {
    activateWorkingAnimation();
    router.push(`${pathName}/${id}`);
  };



  const onSubmit = (values: AddBankDetailsData) => {
    console.log(values)
    mutate(values);
  }


  const tButton = (id: string) => {
    return (
      <>
        <ViewIconButton variant="view" onClick={() => onViewButtonClick(id)} />
      </>
    );
  }


  const columns = [
    { name: 'id', caption: "Sr. No.", width: "w-[5%]" },
    { name: 'bank', caption: "Bank Name", width: "w-[5%]" },
    { name: 'ifsc_code', caption: "IFSC Code", width: "w-[10%]" },
    { name: 'branch', caption: "Branch Name", width: "w-[5%]" },
    {
      name: "View / Edit",
      caption: <span>View / Edit</span>,
      value: tButton,
      width: "w-[10%]",
    }
  ]

  const bankAccountForm = new BankAccountForm({
    initialBankDetailsValues: initialBankDetailsValues,
    onSubmit: onSubmit,
    onBack: handleOpenAddBankAccount,
    onDirty: onDirty,
    readOnly: false
  });

  return (
    <>
      <Toaster />

      {workingAnimation}

      {isDataLossPopupOpen && (
        <LosingDataConfirmPopup cancel={() => setDataLossPopupOpen(false)} continue={() => closePopups()} />
      )}

      {isSuccessNotificationOpen && (
        <SuccesfullConfirmPopup message="Recorded Successfully"/>
      )}

      <RandomWorkingPopup show={isSaving} />

      {isAddBankAccountOpen && (
        <Popup title="Add New Bank Account" zindex={10} width={80}>{bankAccountForm.render()}</Popup>
      )}

      <section>
        <AddBankHeader openModal={handleOpenAddBankAccount} />
      </section>

      <section className="mt-8">
        <TableWithFeatures
          title=""
          center
          columns={columns}
          api={FINANCE_URL.BANK_MASTER_URL.get || ""}
          numberOfRowsPerPage={10}
        />
      </section>
    </>
  );
};
