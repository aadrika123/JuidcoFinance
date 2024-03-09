import React from "react";

const Table = () => {
  return (
    <div>
      <table className="table table-md">
        <thead>
          <tr>
            <th className="border w-[10%]">
              All
            </th>
            <th className="border w-[5%]">dksld jkj</th>
            <th className="border w-[10%]">sdf </th>
            <th className="border w-[10%]">sdf</th>
            <th className="border w-[10%]">dsf</th>
            <th className="border w-[15%]">sdf</th>
            <th className="border w-[10%]">sdf</th>
            <th className="border w-[25%]">sdf</th>
            <th className="border w-[5%]">dsf</th>
            <th className="border w-[10%]">dsf</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} className="border">
              All
            </td>
            <td className="border">dksld</td>
            <td className="border">sdf</td>
            <td className="border">sdf</td>
            <td className="border">dsf</td>
            <td className="border">sdf</td>
            <td className="border">sdf</td>
            <td className="border">sdf</td>
            <td className="border">dsf</td>
          </tr>
          <tr>
            <td colSpan={2} className="border">
              All
            </td>
            <td className="border">dksld</td>
            <td className="border">sdf</td>
            <td className="border">sdf</td>
            <td className="border">dsf</td>
            <td className="border">sdf</td>
            <td className="border">sdf</td>
            <td className="border">sdf</td>
            <td className="border">dsf</td>
          </tr>
          <tr className="opacity-0 w-[10%]">
            <td className="">All</td>
            <td className="">dksld</td>
            <td className="">sdf</td>
            <td className="">sdf</td>
            <td className="">dsf</td>
            <td className="">sdf</td>
            <td className="">sdf</td>
            <td className="">sdf</td>
            <td className="">dsf</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
