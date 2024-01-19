import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";

interface AddBankProps {
  openModal: () => void;
}

const AddBankHeader: React.FC<AddBankProps> = (props) => {
  return (
    <>
      <div className="overflow-x-auto flex justify-between">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Bank Account</SubHeading>
          <span className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
            >
              <path
                d="M9.5 0L0 5V7H19V5M14 9V16H17V9M0 21H19V18H0M8 9V16H11V9M2 9V16H5V9H2Z"
                fill="#4F4F55"
              />
            </svg>
          </span>
        </div>
        <div className="flex">
          <PrimaryButton
            onClick={props.openModal}
            variant="primary"
            className="rounded-3xl"
          >
            + Add Bank
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
            >
              <path
                d="M9.5 0L0 5V7H19V5M14 9V16H17V9M0 21H19V18H0M8 9V16H11V9M2 9V16H5V9H2Z"
                fill="white"
              />
            </svg>
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default AddBankHeader;
