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
import toast from "react-hot-toast";
import Checkboxes from "@/components/global/atoms/Checkbox";
import { useSelector } from "react-redux";
import axios from "@/lib/axiosConfig"
import Footer from "./Footer";

export const HeroCashBankRVoucher= () => {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const userData = useSelector((state: any) => state.user.user?.userDetails);
  const [receiptIds, setReceiptIds] = useState<any>([]);
  useEffect(() => {
    setUser(userData);
  }, []);

  const onViewButtonClick = (id: string) => {
    router.push(`${pathName}/view/${id}?mode=view`);
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
  const handleGetData = (data: []) => {
    setReceiptIds([...data]);
  };

  console.log("hhiiii", receiptIds)
  

  /////// Handle Approve Receipt
  const handleApprove = async (name: string) => {
    try {
      const res = await axios({
        url: FINANCE_URL.RECEIPT_REGISTER.approve,
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
    { name: "id", caption: "Sr. No."},
    { name: "vendor", caption: "Vendor Name"},
    { name: "bill_no", caption: "Bill Number"},
    { name: "department", caption: "Department"},
    { name: "is_authorized", caption: "Is Authorized "},
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
      if(user && !user?.role.includes("Accounts Department – Manager")){
        setNewColumns((prev) => {
          return prev.filter((item) => item.name !== "All")
        })
      }
    })();
  },[user])

  return (
    <>
      <HeaderWidget variant="" title="Cash/Bank Receipt Voucher" />
      <TableWithFeatures
        center
        columns={newColumns}
        api={FINANCE_URL.BILL_PAYMENT_ENTRY_URL.get || ""}
        numberOfRowsPerPage={10}
        footer={
          <Footer
            user={user}
            handleApprove={handleApprove}
            isThereData={receiptIds.length > 0}
          />
        }
        handleGet={handleGetData}
      />
    </>
  );
};
