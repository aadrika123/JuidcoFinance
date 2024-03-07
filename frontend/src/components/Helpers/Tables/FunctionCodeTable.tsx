import { FunctionTableData } from "@/utils/types/types";
import React from "react";

interface FunctionCodeProps {
  data: FunctionTableData[];
}
const FunctionCodeTable: React.FC<FunctionCodeProps> = (props) => {

  return (
    <>
      <div className="hide-scrollbar overflow-x-auto h-[550px] overflow-y-auto border">
        <table className="table table-md">
          <thead className=" text-white text-[1rem] border border-t-2 border-zinc-400 ">
            <tr className="sticky top-0 text-center">
              <th
                className="border w-[15%] border-zinc-400 bg-[#BFD859]"
                colSpan={2}
              >
                <div className="flex gap-2 font-medium ">
                  <span>Group</span>
                </div>
              </th>
              <th
                className="border  w-[15%] border-zinc-400 bg-[#83D7B7] font-medium"
                colSpan={2}
              >
                <div className="flex gap-2">
                  <span>Description Code</span>
                </div>
              </th>

              <th
                className="border  w-[15%] bg-[#1BCC8A] text-white border-zinc-400 font-medium"
                colSpan={2}
              >
                <div className="flex gap-2">
                  <span>Code Center</span>
                </div>
              </th>

              <th className="border w-[55%] bg-primary_green text-white border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Descriptions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.data?.map((d, index: number) => {
              return (
                <tr
                  key={index}
                  className="border border-zinc-400 text-secondary"
                >

                  {/* Group  */}
                  <td className="border border-l-2 border-zinc-400 w-[8.5%]">
                    <div className="flex justify-center">{d?.group[0]}</div>
                  </td>
                  <td className="border border-zinc-400 w-[8.5%]">
                    <div className="flex justify-center">{d?.group[1]}</div>
                  </td>

                  {/* Group */}

                  {/* Description Code  */}
                  <td className="border-l-2 border border-zinc-400 w-[8.6%]">
                    <div className="flex justify-center">
                      {d?.description_code[0]}
                    </div>
                  </td>
                  <td className="border-r-2 border-zinc-400 w-[8.6%]">
                    <div className="flex justify-center">
                      {d?.description_code[1]}
                    </div>
                  </td>
                  {/* Description Code  */}

                  {/* Code Center */}
                  <td className="border border-zinc-400  w-[8.5%]">
                    <div className="flex justify-center">
                      {d.cost_center[0]}
                    </div>
                  </td>
                  <td className="border-r-2 border-zinc-400 w-[8.5%]">
                    <div className="flex justify-center">
                      {d?.cost_center[1]}
                    </div>
                  </td>
                  {/* Code Center */}

                  {/* DESCRIPTION */}
                  <td className="border border-zinc-400 min-w-[55%]">{d?.description}</td>
                  {/* DESCRIPTION */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FunctionCodeTable;
