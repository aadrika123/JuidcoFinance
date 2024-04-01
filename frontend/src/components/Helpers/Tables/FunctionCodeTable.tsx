import { FunctionTableData } from "@/utils/types/types";
import React from "react";
import {motion} from "framer-motion";
import parse from 'html-react-parser';



interface FunctionCodeProps {
  data: FunctionTableData[];
  searchCondition: RegExp | null;
}
const FunctionCodeTable: React.FC<FunctionCodeProps> = (props) => {

  return (
    <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

      <div className="hide-scrollbar overflow-x-auto h-[550px] overflow-y-auto border">
        <table className="table table-md">
          <thead className=" text-secondary_black text-[1rem] border border-t-2 border-zinc-300 ">
            <tr className="sticky top-0 text-center">
              <th
                className="border w-[15%] border-zinc-300 bg-primary_bg_gray"
                colSpan={2}
              >
                <div className="flex gap-2 font-medium ">
                  <span>Group</span>
                </div>
              </th>
              <th
                className="border  w-[15%] border-zinc-300 bg-primary_bg_gray font-medium"
                colSpan={2}
              >
                <div className="flex gap-2">
                  <span>Description Code</span>
                </div>
              </th>

              <th
                className="border  w-[15%] bg-primary_bg_gray text-secondary_black border-zinc-300 font-medium"
                colSpan={2}
              >
                <div className="flex gap-2">
                  <span>Code Center</span>
                </div>
              </th>

              <th className="border w-[55%] bg-primary_bg_gray text-secondary_black border-zinc-300 font-medium">
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
                  className="border border-zinc-300 text-secondary"
                >

                  {/* Group  */}
                  <td className="border border-l-2 border-zinc-300 w-[8.5%]">
                    <div className="flex justify-center">{d?.group[0]}</div>
                  </td>
                  <td className="border border-zinc-300 w-[8.5%]">
                    <div className="flex justify-center">{d?.group[1]}</div>
                  </td>

                  {/* Group */}

                  {/* Description Code  */}
                  <td className="border-l-2 border border-zinc-300 w-[8.6%]">
                    <div className="flex justify-center">
                      {d?.description_code[0]}
                    </div>
                  </td>
                  <td className="border-r-2 border-zinc-300 w-[8.6%]">
                    <div className="flex justify-center">
                      {d?.description_code[1]}
                    </div>
                  </td>
                  {/* Description Code  */}

                  {/* Code Center */}
                  <td className="border border-zinc-300  w-[8.5%]">
                    <div className="flex justify-center">
                      {d.cost_center[0]}
                    </div>
                  </td>
                  <td className="border-r-2 border-zinc-300 w-[8.5%]">
                    <div className="flex justify-center">
                      {d?.cost_center[1]}
                    </div>
                  </td>
                  {/* Code Center */}

                  {/* DESCRIPTION */}
                  <td className="border border-zinc-300 ">{props.searchCondition? parse(d?.description.replaceAll( props.searchCondition,'<span className="bg-[#FFCD00] text-white">$1</span>')): d?.description}</td>
                  {/* DESCRIPTION */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </motion.div>

    </>
  );
};

export default FunctionCodeTable;
