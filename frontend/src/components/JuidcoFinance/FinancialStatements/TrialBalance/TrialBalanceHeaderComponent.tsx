import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import Button from "@/components/global/atoms/Button";

interface TrialBalanceHeaderComponentProps{
  onPrintButtonClick: () => void;
}


const TrialBalanceHeaderComponent = (props: TrialBalanceHeaderComponentProps) => {
  return (
    <>
      <div className="overflow-x-auto flex justify-between p-4 border shadow-lg mb-4">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Trial Balance</SubHeading>
         
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

export default TrialBalanceHeaderComponent;
