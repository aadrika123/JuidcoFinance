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
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/global/atoms/Button";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";

export const HeroCollectionRegister = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();
  const userData = useSelector((state: any) => state.user.user?.userDetails);
  const [user, setUser] = useState<any>();
  const [showPopup, setShowPopup] = useState({
    name: "",
    isOpen: false,
  });

  const [receiptData, setReceiptData] = useState<any>();
  const [receiptIds, setReceiptIds] = useState<any>([]);

  useEffect(() => {
    setUser(userData);
  });

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
        url: FINANCE_URL.COLLECTION_REGISTER.approve,
        method: "POST",
        data: {
          data: {
            checked_by_id: user.id,
            checked_by_print_name: showPopup.name,
            ulb_id: receiptData.ulbId,
            date: receiptData.date,
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

  ////// Handle Approve Confirmation
  const handleApproveConfirm = (name: string) => {
    setShowPopup((prev) => ({ ...prev, name, isOpen: !showPopup.isOpen }));
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
    {
      name: "view",
      caption: "View",
      width: "w-[10%]",
      value: tButton,
    },
  ];

  const [newColumns, setNewColumns] = useState(columns);

  ////////////////// Filtering the column on behalf of User roles
  useEffect(() => {
    (function () {
      if (user && !user?.role.includes("Accounts Department – Manager")) {
        setNewColumns((prev) => {
          return prev.filter((item) => item.name !== "All");
        });
      }
    })();
  }, [user]);

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
      <HeaderWidget variant={""} title={"Collection Register"} />

      <CollectionsTable
        center
        columns={newColumns}
        api={FINANCE_URL.COLLECTION_REGISTER.get || ""}
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
