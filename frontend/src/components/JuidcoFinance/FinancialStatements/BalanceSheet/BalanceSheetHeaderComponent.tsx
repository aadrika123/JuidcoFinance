import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import Button from "@/components/global/atoms/Button";

interface BalanceSheetHeaderComponentProps{
  onPrintButtonClick: () => void;
}



const BalanceSheetHeaderComponent: React.FC<BalanceSheetHeaderComponentProps> = (props: BalanceSheetHeaderComponentProps) => {
  return (
    <>
      <div className="overflow-x-auto flex justify-between p-4 border shadow-lg mb-4">
        <div className="flex items-cente">
          <SubHeading className="text-2xl">Balance Sheet</SubHeading>
        </div>

        <div>
          <Button onClick={props.onPrintButtonClick} variant="primary">
            Print
          </Button>
        </div>

      </div>
    </>
  );
};

export default BalanceSheetHeaderComponent;
