import TotalCountTable from "@/components/JuidcoFinance/Partials/molecules/TotalCountTable";
import Button from "@/components/global/atoms/Button";
import Input from "@/components/global/atoms/Input";
import React, { ChangeEvent, useState } from "react";

interface FooterProps {
  user: any;
  balances: any;
  handleApprove: (name: string) => void;
  isThereData: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
  const [printName, setPrintName] = useState("");
  const { user, balances, isThereData } = props;
  const tempUser = user?.role.includes("Accounts Department – Manager") && user;

  const footerData = [
    {
      key: "Opening Balance",
      value: balances?.opening_balance?.opening_balance || 0
    },
    {
      key: "Days Total",
      value: balances?.total_amount || 0,
    },
    {
      key: "Closing Total",
      value:
        balances?.total_amount + balances?.opening_balance?.opening_balance || 0,
    },
  ];

  //////// Handle Change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrintName(e.target.value);
  };

  return (
    <div>
      <TotalCountTable footerData={footerData} />
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
        {tempUser && isThereData && (
          <Button
            onClick={() => props.handleApprove(printName)}
            disabled={!printName || printName === ""}
            className={`${(!printName || printName === "") && "cursor-not-allowed"}`}
            buttontype="button"
            variant="primary"
          >
            Approved
          </Button>
        )}
      </aside>
    </div>
  );
};

export default Footer;
