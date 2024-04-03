import React from "react";
import parse from 'html-react-parser';
import { MuncipalityTableData } from "../types";


interface TableDataProps {
  data: MuncipalityTableData[];
  searchCondition: RegExp | null;
}

const MunicipalityCodeTable: React.FC<TableDataProps> = (props) => {
  return (
    <>
      <div className="hide-scrollbar overflow-x-auto border-[2px] border-zinc-300 h-[550px] overflow-y-auto">
        <p className="p-4  text-zinc-700 text-center">
          Identification Codes for ULBs at Jharkhand{" "}
        </p>

        <table className="table table-md">
          <thead className="text-[1rem] text-secondary_black border border-t-2 border-zinc-300 sticky top-0">
            <tr className="">
              <th className="border border-zinc-300 p-0">
                <div className="font-medium bg-primary_bg_gray p-4">
                  <span>ULBs</span>
                </div>
              </th>
              <th className="border border-zinc-300 w-[20%] font-medium p-0">
                <div className="font-medium bg-primary_bg_gray p-4">
                  <span>DISTRICT</span>
                </div>
              </th>

              <th colSpan={2} className="border-2 border-zinc-300 font-medium p-0">
              <div className="font-medium bg-primary_bg_gray p-4">
                  <span>State Code</span>
                </div>
              </th>

              <th className="border  border-zinc-300 font-medium p-0" colSpan={2}>
              <div className="font-medium bg-primary_bg_gray p-4">
                  <span>District Code</span>
                </div>
              </th>

              <th colSpan={2} className="border   border-zinc-300 font-medium p-0">
              <div className="font-medium bg-primary_bg_gray p-4">
                  <span>Category</span>
                </div>
              </th>

              <th colSpan={2} className="border  border-zinc-300  font-medium p-0">
              <div className="font-medium bg-primary_bg_gray p-4">
                  <span>Code </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.data?.map((d, index: number) => (
              <tr key={index} className="border border-zinc-300 text-secondary">
                {/* ULB'S */}
                <td className="border border-zinc-300 ">{props.searchCondition? parse(d?.ulbs.replaceAll( props.searchCondition,'<span className="bg-[#FFCD00] text-white">$1</span>')): d?.ulbs}</td>

                {/* DISTRICT */}
                <td className="border border-zinc-300">{props.searchCondition? parse(d?.district.replaceAll( props.searchCondition,'<span className="bg-[#FFCD00] text-white">$1</span>')): d?.district}</td>

                {/* STATE CODE */}
                <td className="border border-zinc-300 ">
                  <div className="flex justify-center">{d?.state_code[0]}</div>
                </td>
                <td>
                  <div className="flex justify-center">{d?.state_code[1]}</div>
                </td>
                {/* STATE CODE */}

                {/* DISTRICT CODE */}
                <td className="border border-zinc-300 ">
                  <div className="flex justify-center">
                    {d?.district_code[0]}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">
                    {d?.district_code[1]}
                  </div>
                </td>
                {/* DISTRICT CODE */}

                {/* CATEGORY */}
                <td className="border border-zinc-300 ">
                  <div className="flex justify-center">{d?.category[0]}</div>
                </td>
                <td>
                  <div className="flex justify-center">{d?.category[1]}</div>
                </td>
                {/* CATEGORY */}

                {/* CODE */}
                <td className="border border-zinc-300 ">
                  <div className="flex justify-center">{d?.code[0]}</div>
                </td>
                <td>
                  <div className="flex justify-center">{d?.code[1]}</div>
                </td>
                {/* CODE */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MunicipalityCodeTable;
