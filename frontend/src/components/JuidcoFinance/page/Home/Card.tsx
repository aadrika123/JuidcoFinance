import React from "react";

type HomeCardProps = {
  title: string;
  color: "green" | "blue";
};

type RactangleCardProps = {
  title: string;
};

const HomeCard: React.FC<HomeCardProps> = (props) => {
  return (
    <div className="bg-white shadow-lg border">
      <div className="flex items-center border-b p-3">
        <div
          className={`h-9 w-9 rounded-full flex items-center justify-center  ${props.color === "green" ? "bg-[#B7FBD4]" : " bg-[#EEF2FF]"}`}
        >
          {props.color === "green" ? (
            <img src="/icons/svg/money.svg" alt="money-icon" />
          ) : (
            <img src="/icons/svg/cash.svg" alt="cash-icon" />
          )}
        </div>
        <h2 className="text-secondary_black text-sm font-semibold mx-4">
          {props.title}
        </h2>
        <div
          className={`h-9 w-6 rounded-lg font-bold flex items-center justify-center ${props.color === "green" ? "text-[#10904D] bg-[#B7FBD4]" : "text-primary_bg_indigo bg-[#EEF2FF]"} `}
        >
          0
        </div>
      </div>
    </div>
  );
};

export const RactangleCard: React.FC<RactangleCardProps> = (props) => {
  return (
    <div className="bg-white p-3 border shadow-lg flex items-center justify-between">
      <h3 className="text-secondary_black text-sm mr-28">{props?.title}</h3>
      <div className="bg-[#EEF2FF] rounded-full h-9 w-9 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            d="M10.4166 7.29297L15.625 12.5013L10.4166 17.7096"
            stroke="#7145B6"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default HomeCard;
