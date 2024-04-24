import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import Button from "@/components/global/atoms/Button";

interface IncomeStatementHeaderComponentProps{
  onPrintButtonClick: () => void;
}

const IncomeStatementHeaderComponent: React.FC<IncomeStatementHeaderComponentProps> = (props: IncomeStatementHeaderComponentProps) => {
  return (
    <>
      <div className="overflow-x-auto flex justify-between p-4 border shadow-lg mb-4">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Income Statement</SubHeading>
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

export default IncomeStatementHeaderComponent;
