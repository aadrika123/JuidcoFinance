import Button from "@/components/global/atoms/Button";
import { fc } from "@/utils/helper";
import { AccountingTableData } from "@/utils/types/types";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface LedgerDetailsComponentProps {
  data: AccountingTableData;
  onClose: () => void;
}

const LedgerDetailsComponent: React.FC<LedgerDetailsComponentProps> = ({ data, onClose }: LedgerDetailsComponentProps) => {

  const componentRef = useRef(null);
  const printIt = useReactToPrint({
    content: () => componentRef.current,
  });


  return (
    <>

      <div className="m-4 p-10 border-2 rounded text-black">
        <div ref={componentRef} className="m-4">

          <style type="text/css" media="print">{"\
            @page {\ size: landscape;\ }\
          "}</style>

          <div className="m-2 w-[100%] text-center text-2xl" >Ledger</div>

          <div className="w-[100%] text-center m-2"><span className="underline">{data?.description}</span> Account</div>

          <div className="flex justify-evenly"><div>Dr.</div><div>Cr.</div></div>

          <table className="border-collapse w-[100%]" >
            <thead>
              <tr>
                <th className="border border-slate-300 px-2">Date</th>
                <th className="border border-slate-300 px-2">Code of Account</th>
                <th className="border border-slate-300 px-2">Particulars</th>
                <th className="border border-slate-300 px-2">Folio</th>
                <th className="border border-slate-300 px-2">Amount (Rs.)</th>
                <th className="border border-slate-300 px-2">Date</th>
                <th className="border border-slate-300 px-2">Code of Account</th>
                <th className="border border-slate-300 px-2">Particulars</th>
                <th className="border border-slate-300 px-2">Folio</th>
                <th className="border border-slate-300 px-2">Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-2"></td>
                <td className="border border-slate-300 px-2"><span className={data?.balance>=0?"invisible":"visible"}>{data?.code}</span></td>
                <td className="border border-slate-300 px-2"><span className={data?.balance>=0?"invisible":"visible"}>{data?.description}</span></td>
                <td className="border border-slate-300 px-2"></td>
                <td className="border border-slate-300 px-2"><span className={data?.balance>=0?"invisible":"visible"}>{fc(data?.balance < 0 ? -data.balance : 0)}</span></td>
                <td className="border border-slate-300 px-2"></td>
                <td className="border border-slate-300 px-2"><span className={data?.balance<0?"invisible":"visible"}>{data?.code}</span></td>
                <td className="border border-slate-300 px-2"><span className={data?.balance<0?"invisible":"visible"}>{data?.description}</span></td>
                <td className="border border-slate-300 px-2"></td>
                <td className="border border-slate-300 px-2"><span className={data?.balance<0?"invisible":"visible"}>{fc(data?.balance >= 0 ? data.balance : 0)}</span></td>

              </tr>
            </tbody>
          </table>
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

export default LedgerDetailsComponent;
