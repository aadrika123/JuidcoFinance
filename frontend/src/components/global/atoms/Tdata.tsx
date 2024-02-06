"use client";

import React, { ReactNode } from "react";

interface TdataProps {
  value: ReactNode;
  key?: string | number;
  className?: string;
  colSpan?: number;
  scrollable?: boolean;
}

const Tdata: React.FC<TdataProps> = (props) => {
  const { className, key, value, scrollable, ...rest } = props;
  return (
    <td
      {...rest}
      key={`cell-${key}`}
      className={`border border-zinc-400 ${className} ${scrollable && "flex-1 text-center"}`}
    >
      <div className="flex justify-center">{value}</div>
    </td>
  );
};

export default Tdata;
