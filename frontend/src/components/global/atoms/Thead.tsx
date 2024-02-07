import React, { ReactElement } from "react";

interface TheadProps {
  cellValue: string | ReactElement;
  key?: string | number;
  className?: string;
  center?: boolean;
  color?: string;
  scrollable?: boolean;
}

const Thead: React.FC<TheadProps> = (props) => {
  const { cellValue, key, className, center, color , scrollable} = props;

  return (
    <th
      key={`headCell-${key}`}
      className={` ${className} ${color} ${scrollable && "flex-1"}`}
    >
      <div
        className={`flex gap-2 font-medium text-center ${
          center && "justify-center"
        }`}
      >
        {cellValue}
      </div>
    </th>
  );
};

export default Thead;
