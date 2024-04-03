/**
 * Author: Bijoy Paitandi
 * date: 15-03-2024
 * status: Done
 */

"use client";

import React, { useEffect, useState } from "react";
import Checkboxes from "@/components/global/atoms/Checkbox";
import { FINANCE_URL } from "@/utils/api/urls";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import CollectionsTable from "./CollectionsTable";



export const HeroCollectionRegister = () => {
  const userData = useSelector((state: any) => state.user.user);
  const [user, setUser] = useState<any>();


  const [receiptData, setReceiptData] = useState<any>();
  const [receiptIds, setReceiptIds] = useState([]);



  useEffect(() => {
    setUser(userData);
  });


  ////////////////// CheckBox Button
  const sButton = (id: string) => {
    const handleCheckbox = (i: string) => {
      console.log(i);
    };
    return (
      <>
        <Checkboxes
          onChange={() => handleCheckbox(id)}
          className="checkbox checked:bg-primary_green"
          name="x"
        />
      </>
    );
  };


    ///// Getting Selected Data and Balances From Table Component
    const handleGetBalance = (data: any) => {
      setReceiptData(data);
      setReceiptIds(data.data);
    };
  
  


  /////// Handle Approve Receipt
  const handleApprove = async (name: string) => {
    try {
      const res = await axios({
        url: FINANCE_URL.RECEIPT_REGISTER.approve,
        method: "POST",
        data: {
          checked_by_id: user.id,
          checked_by_print_name: name,
          ids: receiptIds,
        },
      });
      if(!res.data.status)  throw new Error("Something Went Wrong!!");
      res && toast.success("Approved Sucessfully!!");
    } catch (error) {
      toast.error("Something Went Wrong!!");
    }
  };


  const columns = [
    {
      name: "All",
      caption: "All",
      width: "w-[10%]",
      value: sButton,
    },
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "receipt_date",
      caption: "Date of Receipt",
      width: "w-[25%]",
    },

    {
      name: "receipt_no",
      caption: "Receipt No with Book No",
      width: "w-[25%]",
    },
    {
      name: "paid_by",
      caption: "Paid By",
      width: "w-[25%]",
    },
    {
      name: "reference_number",
      caption: "Reference Number",
      width: "w-[25%]",
    },
    {
      name: "primary_acc_code",
      caption: "Primary Accounting Code",
      width: "w-[25%]",
    },
    {
      name: "total_amount",
      caption: "Amount",
      width: "w-[25%]",
    },
    {
      name: "remarks",
      caption: "Remarks",
      width: "w-[25%]",
    },
  ];



  return (
    <>
      <Toaster />

      <HeaderWidget
        variant={""}
        title={"Collection Register"}
      />

      <CollectionsTable
        center
        columns={columns}
        api={FINANCE_URL.RECEIPT_REGISTER.get || ""}
        numberOfRowsPerPage={10}
        footer={
          <Footer
            user={user}
            balances={receiptData?.balance}
            handleApprove={handleApprove}
            isThereData={receiptIds.length > 0}
          />
        }
        handleGet={handleGetBalance}
      />
    </>
  );
};