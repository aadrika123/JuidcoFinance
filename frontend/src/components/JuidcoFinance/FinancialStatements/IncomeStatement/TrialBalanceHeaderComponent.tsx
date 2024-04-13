import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";


const IncomeStatementHeaderComponent: React.FC = () => {
  return (
    <>
      <div className="overflow-x-auto flex justify-between px-4 border shadow-lg mb-4">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Trial Balance</SubHeading>
         
        </div>
      </div>
    </>
  );
};

export default IncomeStatementHeaderComponent;
