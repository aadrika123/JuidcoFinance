import Button from "@/components/global/atoms/Button";
import { AccountingTableData } from "@/utils/types/types";
import axios from "@/lib/axiosConfig";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "react-query";
import { fc } from "@/utils/helper";
import RandomWorkingPopup from "@/components/global/molecules/general/RandomWorkingPopup";


interface GeneralLedgerDetailsComponentProps {
  generalLedgerId: number;
  onClose: () => void;
}

interface GeneralLedgerReport {
  id: number,
  code: string,
  description: string;
  balance: number,
  ledgers: AccountingTableData[],
  remissions?: AccountingTableData
}

const GeneralLedgerDetailsComponent: React.FC<GeneralLedgerDetailsComponentProps> = ({ generalLedgerId, onClose }: GeneralLedgerDetailsComponentProps) => {

  const componentRef = useRef(null);
  const printIt = useReactToPrint({
    content: () => componentRef.current,
  });

  const fetchData = async (): Promise<GeneralLedgerReport> => {
    const res = await axios({
      url: `/balance-trackings/get-general-ledger-report/${generalLedgerId}`,
      method: "GET",
    });

    console.log(res.data);
    return res.data?.data;
  };


  const {
    data: data,
    isError: dataError,
    isLoading: isLoading
  } = useQuery(["schedule-report", generalLedgerId], fetchData);

  if (dataError) {
    throw new Error("Fatal Error!");
  }


  const threeDigitCode = data?.code.substring(0, 3);

  console.log()

  return (
    <>

      <RandomWorkingPopup show={isLoading}/>

      <div className="m-4 p-10 border-2 rounded text-black">
        <div ref={componentRef} className="m-4">

        <div className="m-2 w-[100%] text-center" >General Ledger</div>

          <div className="w-[100%] text-center m-2"><span className="underline font-bold text-2xl">{data?.description} [Code No {threeDigitCode}]</span></div>


          <div className="hide-scrollbar overflow-x-auto overflow-y-auto">
            <table className="table table-md">
              <thead className=" text-white text-[1rem] sticky top-0">
                <tr className="bg-white text-center">
                  <th
                    className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                    colSpan={3} rowSpan={2}
                  >
                    <div className="text-center bg-primary_bg_gray p-1">
                      Major Head
                    </div>
                  </th>
                  <th
                    className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                    colSpan={2} rowSpan={2}
                  >
                    <div className="text-center bg-primary_bg_gray p-1">
                      <span>Minor Head</span>
                    </div>
                  </th>

                  <th
                    className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                    colSpan={2} rowSpan={2}
                  >
                    <div className="text-center bg-primary_bg_gray p-1">
                      <span>Detail Head</span>
                    </div>
                  </th>

                  <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray w-[40%]" rowSpan={2}>
                    <div className="text-center bg-primary_bg_gray p-1">
                      <span>Descriptions</span>
                    </div>
                  </th>

                  <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray" colSpan={2}>
                    <div className="text-center bg-primary_bg_gray p-1">
                      <span>Balances</span>
                    </div>
                  </th>
                  
                </tr>
                <tr>
                  <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray">
                    <div className="text-center bg-primary_bg_gray p-4">
                      <span>DR</span>
                    </div>
                  </th>
                  <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray">
                    <div className="text-center bg-primary_bg_gray p-4">
                      <span>CR</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {data?.ledgers.map((d, index: number) => (

                  <tr key={index} className={"border border-zinc-300 " + (
                    !d ? "" :
                      d.code_type == 1 ? "bg-primary_bg_indigo text-white bg-opacity-80" :
                        d.code_type == 2 ? "bg-primary_bg_indigo bg-opacity-25 text-slate-950" : "text-secondary"
                  )}>

                    {/* MAJOR HEAD */}
                    <td className="border border-l-2 border-zinc-300">
                      <div className="flex justify-center">{d?.major_head[0]}</div>
                    </td>
                    <td className="border border-zinc-300">
                      <div className="flex justify-center">{d?.major_head[1]}</div>
                    </td>
                    <td className="border border-zinc-300">
                      <div className="flex justify-center">{d?.major_head[2]}</div>
                    </td>

                    {/* MAJOR HEAD */}

                    {/* MINOR HEAD */}
                    <td className="border-l-2 border border-zinc-300">
                      <div className="flex justify-center">{d?.minor_head[0]}</div>
                    </td>
                    <td className="border-r-2 border-zinc-300">
                      <div className="flex justify-center">{d?.minor_head[1]}</div>
                    </td>
                    {/* MINOR HEAD */}

                    {/* DETAILS HEAD */}
                    <td className="border border-zinc-300">
                      <div className="flex justify-center">{d?.detail_code[0]}</div>
                    </td>
                    <td className="border-r-2 border-zinc-300">
                      <div className="flex justify-center">{d?.detail_code[1]}</div>
                    </td>
                    {/* DETAILS HEAD */}

                    {/* DESCRIPTION */}
                    <td className="border border-zinc-300 ">{d?.description}</td>
                    {/* DESCRIPTION */}

                    <td className="border border-zinc-300 ">{fc(d?.balance >= 0 ? d.balance : 0)}</td>
                    <td className="border border-zinc-300 ">{fc(d?.balance < 0 ? -d.balance : 0)}</td>
                    
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <div className="flex justify-between gap-3">
            <Button onClick={printIt} variant="primary">Print</Button>
            <Button onClick={onClose} variant="cancel">Close</Button>
          </div>
        </div>
      </div>

    </>
  );
};

export default GeneralLedgerDetailsComponent;
