import Button from "@/components/global/atoms/Button";
import axios from "@/lib/axiosConfig";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "react-query";
import { fc } from "@/utils/helper";
import RandomWorkingAnimation from "@/components/global/molecules/general/RandomWorkingAnimation";
import { AccountingTableData } from "../types";

interface ScheduleDetailsComponentProps {
  scheduleId: number;
  ulbId: number;
  year: number;
  onClose: () => void;
}

interface YearlyData {
  year: string;
  general_ledgers: AccountingTableData[];
  remissions?: AccountingTableData;
}

interface ScheduleReport {
  id: number;
  ulb: string;
  code: string;
  description: string;
  balance: number;
  prev_balance: number;
  current_year: YearlyData;
  prev_year: YearlyData;
}

const ScheduleDetailsComponent: React.FC<ScheduleDetailsComponentProps> = ({
  scheduleId,
  ulbId, 
  year,
  onClose,
}: ScheduleDetailsComponentProps) => {
  const componentRef = useRef(null);
  const printIt = useReactToPrint({
    content: () => componentRef.current,
  });

  const fetchData = async (): Promise<ScheduleReport> => {
    const res = await axios({
      url: `/balance-trackings/get-schedule-report/${scheduleId}?year=${year}&ulb=${ulbId}`,
      method: "GET",
    });

    console.log(res.data?.data);

    if (res.data.status) {
      return res.data?.data;
    }
    throw "Something Went Wrong!!";
  };

  const {
    data: data,
    isError: dataError,
    isLoading: isLoading,
  } = useQuery(["schedule-report", scheduleId], fetchData, {
    cacheTime: 0
  });

  if (dataError) {
    throw new Error("Fatal Error!");
  }

  const threeDigitCode = data?.code.substring(0, 3);

  return (
    <>
      <RandomWorkingAnimation show={isLoading} />

      {!isLoading && (
        <div className="m-4 p-10 border-2 rounded text-black">
          <div ref={componentRef} className="m-4">
            <div className="w-[100%] text-center m-2">
              <span className="underline font-bold">
                {data?.description} [Code No {data?.code.substring(0, 3)}]
              </span>
              <br/>
              <span>({data?.ulb})</span>
            </div>

            <table
              width="100%"
              className="border-collapse border border-slate-400"
            >
              <thead>
                <tr>
                  <th className="border border-slate-300">Minor Code No</th>
                  <th className="border border-slate-300">Particulars</th>
                  <th className="border border-slate-300">
                    Current Year ({data?.current_year?.year})
                  </th>
                  <th className="border border-slate-300">
                    Prev Year ({data?.prev_year?.year})
                  </th>
                </tr>
                <tr>
                  <th className="border border-slate-300">1</th>
                  <th className="border border-slate-300">2</th>
                  <th className="border border-slate-300">3</th>
                  <th className="border border-slate-300">4</th>
                </tr>
              </thead>

              <tbody>
                {data?.current_year?.general_ledgers?.map((d, i) => (
                  <tr key={d.code}>
                    <td className="border border-slate-300 px-4">
                      {threeDigitCode + "-" + d.code.substring(3, 5)}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {d.description}
                    </td>
                    <td className="border border-slate-300 px-4 text-right">
                      {fc(d.balance)}
                    </td>
                    <td className="border border-slate-300 px-4 text-right">
                      {fc(data?.prev_year?.general_ledgers[i]?.balance)}
                      {/* {typeof data.prev_year.general_ledgers[i]} */}
                    </td>
                  </tr>
                ))}

                {data?.balance && (
                  <tr>
                    <td className="border border-slate-300"></td>
                    <td className="border border-slate-300 px-4 font-bold">
                      Subtotal
                    </td>
                    <td className="border border-slate-300 px-4 text-right">
                      {fc(data.balance)}
                    </td>
                    <td className="border border-slate-300 px-4 text-right">
                      {fc(data.prev_balance)}
                    </td>
                  </tr>
                )}

                {data?.current_year?.remissions &&
                  data?.prev_year?.remissions && (
                    <>
                      <tr>
                        <td className="border border-slate-300 px-4">
                          {threeDigitCode +
                            "-" +
                            data.current_year.remissions.code.substring(3, 5)}
                        </td>
                        <td className="border border-slate-300 px-4">
                          Less
                          <br />
                          {data.current_year.remissions.description}
                        </td>
                        <td className="border border-slate-300 px-4 text-right">
                          {fc(data.current_year.remissions.balance)}
                        </td>
                        <td className="border border-slate-300 px-4 text-right">
                          {fc(data.prev_year.remissions.balance)}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-slate-300 px-4"></td>
                        <td className="border border-slate-300 px-4">
                          Subtotal
                        </td>
                        <td className="border border-slate-300 px-4 text-right">
                          {fc(data.current_year.remissions.balance)}
                        </td>
                        <td className="border border-slate-300 px-4 text-right">
                          {fc(data.prev_year.remissions.balance)}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-slate-300 px-4"></td>
                        <td className="border border-slate-300 px-4 font-bold">
                          Total {data?.description}
                        </td>
                        <td className="border border-slate-300 px-4 text-right">
                          {fc(
                            data.balance - data.current_year.remissions.balance
                          )}
                        </td>
                        <td className="border border-slate-300 px-4 text-right">
                          {fc(
                            data.prev_balance -
                              data.prev_year.remissions.balance
                          )}
                        </td>
                      </tr>
                    </>
                  )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            <div className="flex justify-between gap-3">
              <Button onClick={printIt} variant="primary">
                Print
              </Button>
              <Button onClick={onClose} variant="cancel">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleDetailsComponent;
