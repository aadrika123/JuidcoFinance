/**
 * Author: Sanjiv Kumar
 * date: 02-09-2024
 * status: Done
 */

"use client";

import React, { useEffect, useState } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import TableWithScrollPagination from "@/components/global/organisms/TableWithScrollPagination";
import Checkboxes from "@/components/global/atoms/Checkbox";
import Button from "@/components/global/atoms/Button";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "@/lib/axiosConfig";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import Footer from "./Footer";

const HeroDailyCollSummary = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const userData = useSelector((state: any) => state.user.user?.userDetails);
  const [receiptData, setReceiptData] = useState<any>();
  const [receiptIds, setReceiptIds] = useState<any>([]);
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();

  useEffect(() => {
    setUser(userData);
  }, []);

  //////// Handling Viw Button
  const onViewButtonClick1 = (id: string) => {
    activateWorkingAnimation();
    router.push(`${pathName}/view/${id}?mode=view`);
  };

  const tButton = (id: string) => {
    return (
      <>
        <Button
          variant="primary"
          className="py-2 px-4"
          onClick={() => onViewButtonClick1(id)}
        >
          View
        </Button>
      </>
    );
  };

  ////////////////// CheckBox Button
  const sButton = (id: string) => {
    const handleCheckbox = (i: string) => {
      setReceiptIds((prev: any)=> {
        const updatedData: any = [...prev];
        if (updatedData.some((item: { id: number }) => item.id === Number(i))) {
          return updatedData.filter((item: any) => item.id !== i);
        } else {
          return [...prev, { id: Number(i) }];
        }
      })
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

  ///// Getting Selected Data and Balances From Table Component
  const handleGetBalance = (data: any) => {
    setReceiptData(data);
    setReceiptIds(data.data);
  };

  /////// Handle Approve Receipt
  const handleApprove = async (name: string) => {
    try {
      const res = await axios({
        url: FINANCE_URL.DAILY_COLL_SUMMARY.approve,
        method: "POST",
        data: {
          data: {
            checked_by_id: user.id,
            checked_by_print_name: name,
            ids: receiptIds,
          },
        },
      });
      if (!res.data.status) throw new Error("Something Went Wrong!!");

      res && toast.success("Approved Sucessfully!!");
    } catch (error) {
      toast.error("Something Went Wrong!!");
    }
  };

  const columns = [
    {
      name: "All",
      caption: "All",
      value: sButton,
    },
    { name: "id", caption: "Sr. No." },
    {
      name: "gledger",
      caption: "Department Name",
    },
    {
      name: "descri",
      caption: "Revenue Head Name",
    },
    {
      name: "revenue_accounted_type_name",
      caption: "Revenue Accounted Type",
    },
    {
      name: "amount",
      caption: "Amount"
    },
    {
      name: "bank_acc_no",
      caption: "Deposited With",
    },
    {
      name: "view",
      caption: "View",
      value: tButton,
    },
  ];


  const [newColumns, setNewColumns] = useState(columns);

  ////////////////// Filtering the column on behalf of User roles
  useEffect(()=> {
    (function(){
      if(user && !user?.role.includes("Accounts Department – Manager")){
        setNewColumns((prev) => {
          return prev.filter((item) => item.name !== "All")
        })
      }
    })();
  },[user])
  
  return (
    <>
      <Toaster />
      {workingAnimation}
      <HeaderWidget variant="" title="Daily Collection Summary" />
      <TableWithScrollPagination
        center
        columns={newColumns}
        api={FINANCE_URL.DAILY_COLL_SUMMARY.get || ""}
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

export default HeroDailyCollSummary;
