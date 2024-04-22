/**
 * Author: Sanjiv Kumar
 * date: 10-04-2024
 * status: open
 */

"use client";

import React, { useEffect, useState } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import TableWithFeatures from "./TableWithFeature";
import Button from "@/components/global/atoms/Button";
import toast, { Toaster } from "react-hot-toast";
import Checkboxes from "@/components/global/atoms/Checkbox";
import { useSelector } from "react-redux";
import axios from "@/lib/axiosConfig"
import Footer from "./Footer";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { ROLES } from "@/json/roles";

export const HeroCashBankRVoucher= () => {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const userData = useSelector((state: any) => state.user.user?.userDetails);
  const [receiptIds, setReceiptIds] = useState<any>([]);
  const [receiptData, setReceiptData] = useState<any>({})
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();
  const [showPopup, setShowPopup] = useState({
    name: "",
    isOpen: false,
  });

  useEffect(() => {
    setUser(userData);
  }, []);

  const onViewButtonClick = (id: string) => {
    activateWorkingAnimation();
    router.push(`${pathName}/view/${id}?mode=view`);
  };

    ////////////////// CheckBox Button
    const sButton = (id: string) => {
      const handleCheckbox = (i: string) => {
        setReceiptIds((prev: any) => {
          const updatedData: any = [...prev];
          if (updatedData.some((item: { id: number }) => item.id === Number(i))) {
            return updatedData.filter((item: any) => item.id !== i);
          } else {
            return [...prev, { id: Number(i) }];
          }
        });
      };
  
      return (
        <>
          <Checkboxes
            onChange={() => handleCheckbox(id)}
            className="checkbox checked:bg-primary_bg_indigo"
            name="x"
          />
        </>
      );
    };
  
  ////////// View Button
    const tButton = (id: string) => {
      return (
        <>
          <Button
            variant="primary"
            className="py-2 px-4"
            onClick={() => onViewButtonClick(id)}
          >
            View
          </Button>
        </>
      );
    };

    ///// Getting Selected Data and Balances From Table Component
  const handleGetData = (data: any) => {
    setReceiptData(data)
    setReceiptIds(data.data);
  };
  

  /////// Handle Approve Receipt
  const handleApprove = async () => {
    try {
      const res = await axios({
        url: FINANCE_URL.CASH_BANK_R_VOUCHER.approve,
        method: "POST",
        data: {
          data: {
            checked_by_id: user.id,
            checked_by_print_name: showPopup?.name,
            ulb_id: receiptData.ulbId,
            date: receiptData.date,
            ids: receiptIds,
          },
        },
      });
      if (!res.data.status) throw new Error("Something Went Wrong!!");

      res && toast.success("Approved Sucessfully!!");
      setReceiptData((prev: any) => ({...prev, isApproved: true}))
    } catch (error) {
      toast.error("Something Went Wrong!!");
    }
  };

  ////// Handle Approve Confirmation
  const handleApproveConfirm = (name: string) => {
    setShowPopup((prev) => ({ ...prev, name, isOpen: !showPopup.isOpen }));
  };


  const columns = [
    {
      name: "All",
      caption: "All",
      value: sButton,
    },
    { name: "id", caption: "Sr. No."},
    { name: "voucher_date", caption: "Voucher Date"},
    { name: "amount", caption: "Amount"},
    { name: "bank", caption: "Bank Account"},
    { name: "is_approved", caption: "Is Approved"},
    {
      name: "View",
      caption: "View",
      value: tButton
    },
  ];

  const [newColumns, setNewColumns] = useState(columns);

  ////////////////// Filtering the column on behalf of User roles
  useEffect(()=> {
    (function(){
      if(user && !user?.role.includes(ROLES.ACC_DEP_MANAGER)){
        setNewColumns((prev) => {
          return prev.filter((item) => item.name !== "All")
        })
      }
    })();
  },[user])

  return (
    <>
     <Toaster />
      {showPopup?.isOpen && (
        <ConfirmationPopup
          cancel={() =>
            setShowPopup((prev) => ({ ...prev, isOpen: !showPopup.isOpen }))
          }
          continue={handleApprove}
          message="By Clicking Selected Receipt will be approved and you can't able to approve any receipt of this date again."
        />
      )}
      {workingAnimation}
      <HeaderWidget variant="" title="Cash/Bank Receipt Voucher" />
      <TableWithFeatures
        center
        columns={newColumns}
        api={FINANCE_URL.CASH_BANK_R_VOUCHER.get || ""}
        depApi={FINANCE_URL.CASH_BANK_R_VOUCHER.getCheckedData || ""}
        numberOfRowsPerPage={10}
        footer={
          <Footer
            user={user}
            isApproved={receiptData?.isApproved}
            handleApprove={handleApproveConfirm}
            isThereData={receiptIds.length > 0}
          />
        }
        handleGet={handleGetData}
      />
    </>
  );
};
