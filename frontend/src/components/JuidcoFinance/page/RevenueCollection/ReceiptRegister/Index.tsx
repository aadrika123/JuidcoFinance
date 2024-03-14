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
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";
import axios from "@/lib/axiosConfig";

export const HeroReceiptRegister = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const userData = useSelector((state: any) => state.user.user);
  const [receiptData, setReceiptData] = useState<any>();
  const [receiptIds, setReceiptIds] = useState([]);

  useEffect(() => {
    setUser(userData);
  }, []);

  //////// Handling Viw Button
  const onViewButtonClick1 = (id: string) => {
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
      const updatedData: any = [...receiptData.data];
      if (updatedData.some((item: { id: number }) => item.id === Number(i))) {
        updatedData.filter((item: any) => item.id !== i);
      } else {
        updatedData.push({ id: Number(i) });
      }
      setReceiptIds(updatedData);
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
      name: "receipt_no",
      caption: "Receipt Number",
      width: "w-[25%]",
    },
    {
      name: "receipt_date",
      caption: "Receipt Date",
      width: "w-[25%]",
    },
    {
      name: "receipt_mode",
      caption: "Mode of Receipt",
      width: "w-[25%]",
    },
    {
      name: "paid_by",
      caption: "Paid By",
      width: "w-[25%]",
    },
    {
      name: "cheque_or_draft_no",
      caption: "Cheque / Draft No",
      width: "w-[25%]",
    },
    {
      name: "deposit_date",
      caption: "Date of Deposit",
      width: "w-[25%]",
    },
    {
      name: "realisation_date",
      caption: "Date of Realisation",
      width: "w-[25%]",
    },
    {
      name: "wheather_returned",
      caption: "Wheather Re-turned",
      width: "w-[25%]",
    },
    {
      name: "view",
      caption: "View",
      width: "w-[10%]",
      value: tButton,
    },
  ];
  return (
    <>
      <Toaster />
      <HeaderWidget
        variant={
          user?.designation?.udhd.name === "ULB" &&
          user?.designation?.name === "Accounts Department – Accountant"
            ? "add"
            : ""
        }
        title={"Receipt Register Entry"}
      />
      <TableWithScrollPagination
        center
        columns={columns}
        api={FINANCE_URL.RECEIPT_REGISTER.get || ""}
        numberOfRowsPerPage={10}
        footer={
          <Footer
            user={user}
            balances={receiptData?.balance}
            handleApprove={handleApprove}
            isThereData={receiptIds.length>0}
          />
        }
        handleGet={handleGetBalance}
      />
    </>
  );
};
