import Image from "next/image";
import React from "react";
import home from "@/assets/svg/list.svg";

type SpanProps = {
  label?: string;
  content?: string;
  className?: string;
};

/////////// BoldSpan Component
export const BoldSpan: React.FC<SpanProps> = (props) => {
  const { label, content, className } = props;
  return (
    <span className={`mb-2 text-secondary ${className} `}>
      {label && <b>{label}&nbsp;</b>}
      {content}
    </span>
  );
};

const BoxContainer = () => {
  return (
    <div className="flex items-center gap-2 mt-4">
      <div className="bg-gray-100 border flex flex-col p-4 h-52 w-1/3 items-center justify-center rounded">
        <BoldSpan className="text-secondary_black mb-4" label="BL-002356" />
        <BoldSpan label="28-03-2024" />
        <BoldSpan content="Bill Date" />
        <div className="flex items-center mb-2">
          <Image src={home} alt="calender" />
          <BoldSpan
            className="mt-2 ml-1 text-red-700"
            content="13 days passed"
          />
        </div>
      </div>
      <div className="bg-gray-100 border flex flex-col py-4 px-8 items-center justify-center h-52 w-full rounded">
        <div className="flex items-center mb-2">
          <Image src={home} alt="calender" />
          <BoldSpan
            className="mt-2 ml-1 text-secondary_black"
            label="Bill Details"
          />
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <BoldSpan label="Bill No:" content="BL-002356" />
            <BoldSpan label="ULB Name:" content="RMC" />
            <BoldSpan label="Bill Date:" content="28-03-2024" />
          </div>
          <div className="flex flex-col">
            <BoldSpan label="Name Of Pary:" content="ASHLEY" />
            <BoldSpan label="Bill Amount:" content="766783" />
            <BoldSpan label="Remarks:" content="ABC" />
          </div>
        </div>
        <BoldSpan className="mt-2 text-indigo-500" label="View Full Details" />
      </div>
    </div>
  );
};

export default BoxContainer;
