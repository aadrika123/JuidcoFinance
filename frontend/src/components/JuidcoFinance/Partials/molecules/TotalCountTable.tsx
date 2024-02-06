import Tdata from "@/components/global/atoms/Tdata";
import React from "react";

const TotalCountTable = () => {
  const data = [
    {
      key: "Total",
      value: 200,
    },
    {
      key: "Net Total",
      value: 300,
    },
  ];

  const row = data.map((item, index) => {
    return (
      <tr key={`row${index}`} className="flex border border-zinc-400 text-secondary">
        <Tdata className="flex-1" value={item.key} />
        <Tdata className="bg-[#F8FFF7] flex-1" value={item.value} />
        <Tdata className="flex-1" value="" />
      </tr>
    );
  });

  return (
    <table className="table table-md border-x-2 border-b-2 border-zinc-400">
      <tbody>{row}</tbody>
    </table>
  );
};

export default TotalCountTable;
