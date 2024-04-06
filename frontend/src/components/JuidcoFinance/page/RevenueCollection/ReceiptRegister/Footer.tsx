import TotalCountTable from "@/components/JuidcoFinance/Partials/molecules/TotalCountTable";
import Button from "@/components/global/atoms/Button";
import Input from "@/components/global/atoms/Input";
import { FINANCE_URL } from "@/utils/api/urls";
import React, { ChangeEvent, useState } from "react";
import axios from "@/lib/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

interface FooterProps {
  user: any;
  balances: any;
  handleApprove: (name: string) => void;
  isThereData: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
  const [printName, setPrintName] = useState("");
  const { user, balances, isThereData } = props;

  const [openingBal, setOpeningBal] = useState(
    balances?.opening_balance?.opening_balance
  );
  const isEditable = user?.role.includes("Accounts Department – Manager")
    ? false
    : true;

  const tempUser = user?.role.includes("Accounts Department – Accountant")
    ? {
        name: "Sanjiv Kumar",
        role:  "Accounts Department – Manager" ,
        print_name: "Sanjiv Kumar",
      }
    : user;

  const footerData = [
    {
      key: "Opening Balance",
      value: user?.role.includes("Accounts Department – Accountant") ? (
        <Input
          label=""
          value={openingBal || balances?.opening_balance?.opening_balance}
          name="opening_balance"
          type="number"
          className="bg-white"
          onChange={(e) => setOpeningBal(e.target.value)}
        />
      ) : (
        balances?.opening_balance?.opening_balance
      ),
    },
    {
      key: "Days Total",
      value: balances?.total_amount || 0,
    },
    {
      key: "Closing Total",
      value:
        balances?.total_amount + balances?.opening_balance?.opening_balance ||
        0,
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
      !balances?.opening_balance?.opening_balance
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
                id: balances?.opening_balance?.id,
                opening_balance: Number(openingBal),
              },
            },
          }));

      if (!res.data.status) throw new Error("Something Went Wrong!!");

      toast.success("Done!!");
      setOpeningBal(null);
    } catch (error: any) {
      alert("Someting Went Wrong!!");
      console.log(error);
    }
  };
  return (
    <div>
      <Toaster />
      <TotalCountTable footerData={footerData} />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* <div className="flex flex-col">
            <h2 className="mt-6 text-secondary">Entered By</h2>
            <Input
              readonly={true}
              label=""
              name="entered_by"
              placeholder="Enter Name"
            />
            <Input
              readonly={true}
              label=""
              name="designation"
              placeholder="Enter Designation"
            />
            <Input
              readonly={true}
              label=""
              name="entered_by_print_name"
              placeholder="Enter Print Name"
            />
          </div> */}
        {isThereData && (
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
              readonly={isEditable}
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
        {!isEditable ? (
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
              {!balances?.opening_balance?.opening_balance
                ? "Add Opening Balance"
                : "Updated Opening Balance"}
            </Button>
          )
        )}
      </aside>
    </div>
  );
};

export default Footer;
