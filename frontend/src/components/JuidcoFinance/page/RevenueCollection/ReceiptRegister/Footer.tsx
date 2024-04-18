import TotalCountTable from "@/components/JuidcoFinance/Partials/molecules/TotalCountTable";
import Button from "@/components/global/atoms/Button";
import Input from "@/components/global/atoms/Input";
import { FINANCE_URL } from "@/utils/api/urls";
import React, { ChangeEvent, useState } from "react";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { ROLES } from "@/json/roles";

interface FooterProps {
  user: any;
  receiptData: any;
  handleApprove: (name: string) => void;
  isThereData: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
  const [printName, setPrintName] = useState("");
  const { user, receiptData, isThereData } = props;

  const [openingBal, setOpeningBal] = useState(
    receiptData?.balance?.opening_balance?.opening_balance
  );

  const tempUser = user?.role.includes(ROLES.ACC_DEP_MANAGER) && user;

  const footerData = [
    {
      key: "Opening Balance",
      value: user?.role.includes(ROLES.ACC_DEP_ACCOUNTANT) ? (
        <Input
          label=""
          value={
            openingBal || receiptData?.balance?.opening_balance?.opening_balance
          }
          name="opening_balance"
          type="number"
          className="bg-white"
          onChange={(e) => setOpeningBal(e.target.value)}
        />
      ) : (
        receiptData?.balance?.opening_balance?.opening_balance
      ),
    },
    {
      key: "Days Total",
      value: receiptData?.balance?.total_amount || 0,
    },
    {
      key: "Closing Total",
      value:
        receiptData?.balance?.total_amount +
          receiptData?.balance?.opening_balance?.opening_balance || 0,
    },
  ];

  //////// Handle Change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrintName(e.target.value);
  };

  ////// Handle Add and Update Opening Balance
  const handleOpeningBal = async () => {
    let res: any = "";
    try {
      !receiptData?.balance?.opening_balance?.opening_balance
        ? (res = await axios({
            url: FINANCE_URL.OPENING_BALANCE.create,
            method: "POST",
            data: {
              data: {
                opening_balance: Number(openingBal),
              },
            },
          }))
        : (res = await axios({
            url: FINANCE_URL.OPENING_BALANCE.update,
            method: "POST",
            data: {
              data: {
                id: receiptData?.balance?.opening_balance?.id,
                opening_balance: Number(openingBal),
              },
            },
          }));

      if (!res.data.status) throw new Error("Something Went Wrong!!");

      toast.success("Done!!");
    } catch (error: any) {
      alert("Someting Went Wrong!!");
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster />
      <TotalCountTable footerData={footerData} />
      {!receiptData?.isApproved ? (
        <>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {isThereData && tempUser && (
              <div className="flex flex-col">
                <h2 className="mt-6 text-secondary">Checked By</h2>
                <Input
                  readonly={true}
                  value={tempUser?.name}
                  label=""
                  name="checked_by"
                  placeholder="Enter Name"
                />
                <Input
                  readonly={true}
                  label=""
                  value={tempUser?.role}
                  name="designation"
                  placeholder="Enter Designation"
                />
                <Input
                  readonly={tempUser ? false : true}
                  value={tempUser?.print_name || printName}
                  label=""
                  onChange={handleChange}
                  name="checked_by_print_name"
                  placeholder="Enter Print Name"
                />
              </div>
            )}
          </div>
          <aside className="flex items-center justify-end py-5 gap-5">
            {tempUser ? (
              <Button
                onClick={() => props.handleApprove(printName)}
                disabled={!printName || printName === ""}
                className={`${(!printName || printName === "") && "cursor-not-allowed"}`}
                buttontype="button"
                variant="primary"
              >
                Approved
              </Button>
            ) : (
              openingBal && (
                <Button
                  onClick={handleOpeningBal}
                  buttontype="button"
                  variant="primary"
                >
                  {!receiptData?.balance?.opening_balance?.opening_balance
                    ? "Add Opening Balance"
                    : "Updated Opening Balance"}
                </Button>
              )
            )}
          </aside>
        </>
      ) : (
        <span>You Already Approved it. Now You can not approve it again.</span>
      )}
    </div>
  );
};

export default Footer;
