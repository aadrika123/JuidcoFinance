import Button from "@/components/global/atoms/Button";
import { homeButtons } from "@/json/homeButtons.json";
import React from "react";

const AllHomeButtons = () => {
  return (
    <div className="flex items-center gap-2 mb-1 overflow-x-auto hide-scrollbar">
      {homeButtons.map((item, index) => (
        <React.Fragment key={index}>
          <Button
            variant="primary"
            className={`bg-white text-primary_bg_indigo border border-primary_bg_indigo rounded-none p-1 px-2 text-nowrap ${index === 0 && 'active'}`}
          >
            {item.name}
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AllHomeButtons;
