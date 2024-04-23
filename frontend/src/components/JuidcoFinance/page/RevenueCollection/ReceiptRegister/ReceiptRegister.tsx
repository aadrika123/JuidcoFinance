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
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import { ROLES } from "@/json/roles";

const ReceiptRegister = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const userData = useSelector((state: any) => state.user.user?.userDetails);
  const [receiptData, setReceiptData] = useState<any>();
  const [receiptIds, setReceiptIds] = useState<any>([]);
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();
  const [showPopup, setShowPopup] = useState({
    name:"",
    isOpen: false,
  });

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

  ///// Getting Selected Data and Balances From Table Component
  const handleGetBalance = (data: any) => {
    setReceiptData(data);
    setReceiptIds(data.data);
  };

  /////// Handle Approve Receipt
  const handleApprove = async () => {
    try {
      const res = await axios({
        url: FINANCE_URL.RECEIPT_REGISTER.approve,
        method: "POST",
        data: {
          data: {
            checked_by_id: user.id,
            checked_by_print_name: showPopup.name,
            ids: receiptIds,
            ulb_id: user?.ulb_id,
            date: receiptData.date,
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
    setShowPopup((prev)=> ({...prev, name, isOpen: !showPopup.isOpen}))
  }

  const columns = [
    {
      name: "All",
      caption: "All",
      value: sButton,
    },
    { name: "id", caption: "Sr. No." },
    {
      name: "receipt_no",
      caption: "Receipt Number",
    },
    {
      name: "receipt_date",
      caption: "Receipt Date",
    },
    {
      name: "receipt_mode",
      caption: "Mode of Receipt",
    },
    {
      name: "paid_by",
      caption: "Paid By",
    },
    {
      name: "cheque_or_draft_no",
      caption: "Cheque / Draft No",
    },
    {
      name: "deposit_date",
      caption: "Date of Deposit",
    },
    {
      name: "realisation_date",
      caption: "Date of Realisation",
    },
    {
      name: "wheather_returned",
      caption: "Wheather Re-turned",
    },
    {
      name: "view",
      caption: "View",
      value: tButton,
    },
  ];

  const [newColumns, setNewColumns] = useState(columns);

  ////////////////// Filtering the column on behalf of User roles
  useEffect(() => {
    (function () {
      if (user && !user?.role.includes(ROLES.ACC_DEP_MANAGER)) {
        setNewColumns((prev) => {
          return prev.filter((item) => item.name !== "All");
        });
      }
    })();
  }, [user]);

  return (
    <>
      <Toaster />
      {showPopup?.isOpen && <ConfirmationPopup
        cancel={() => setShowPopup((prev)=> ({...prev, isOpen: !showPopup.isOpen}))}
        continue={handleApprove}
        message="By Clicking Selected Receipt will be approved and you can't able to approve any receipt of this date again."
      />}
      {workingAnimation}
      <HeaderWidget
        variant={
          user?.role.includes(ROLES.ACC_DEP_ACCOUNTANT) ? "add" : ""
        }
        title={"Receipt Register Entry"}
      />
      <TableWithScrollPagination
        center
        columns={newColumns}
        api={FINANCE_URL.RECEIPT_REGISTER.get || ""}
        depApi={FINANCE_URL.RECEIPT_REGISTER.getCheckedData || ""}
        numberOfRowsPerPage={10}
        footer={
          <Footer
            user={user}
            receiptData={receiptData}
            handleApprove={handleApproveConfirm}
            isThereData={receiptIds.length > 0}
          />
        }
        handleGet={handleGetBalance}
      />
    </>
  );
};

export default ReceiptRegister;
