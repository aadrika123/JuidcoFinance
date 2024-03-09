import React, { ReactNode } from "react";

interface ViewBankHeaderProps {
  title: string;
  buttons: () => ReactNode
}

export function ViewBankHeader(props: ViewBankHeaderProps) {

  return (
    <div className="overflow-x-auto flex justify-between pb-[2rem]">
      <div className="flex items-center">
        <h2
          className={`text-secondary text-sub_head font-semibold text-2xl`}
        >
          {props.title}
        </h2>
      </div>
      <div className="flex items-center">
        {props.buttons()}
      </div>

    </div>
  );
}
