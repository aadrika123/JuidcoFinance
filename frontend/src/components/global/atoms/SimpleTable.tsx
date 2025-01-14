import dayjs from "dayjs";
import React, { ReactElement } from "react";
import ViewIconButton from "./ViewIconButton";

export interface ColumnProps {
  name: string;
  caption: string | ReactElement;
  nested?: boolean;
  member?: string;
}

interface SimpleTableProps<T>{
  columns: Array<ColumnProps>;
  data?: T[];
  onViewButtonClick: (id: T[keyof T]) => void;
}


const SimpleTable = <T, >({columns, data, onViewButtonClick}: SimpleTableProps<T>) => {

  const headers = columns.map((column, index) => {
    return (
      <th key={`headCell-${index}`} className="border border-zinc-400">
        <div className="flex gap-2 font-medium text-center">
          {column.caption}
        </div>
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns.length} className="text-center">
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr key={`row-${index}`} className="border border-zinc-400 text-secondary">
          {columns.map((column, index2) => {

            let value;
            if(column.nested){
              const ob = row[column.name as keyof typeof row] as object;
              if(column.member){
                value = ob[column.member as keyof typeof ob];
              }
            }else{
              value = row[column.name as keyof typeof row];
            }

            
            if(value instanceof Date){
              const value1 = dayjs(value).format("DD MMM YYYY");
              return <td key={`cell-${index2}`}>{value1}</td>;
            }
            else{
              const value1 = value as string;
              return (
              <td key={`cell-${index2}`} className="border border-zinc-400">
                <div className="flex justify-center">
                  {value1}
                </div>
              </td>
              );
            }
                
          })}
          <td>
            <div className="flex justify-center">
            <ViewIconButton onClick={() => onViewButtonClick(row['id' as keyof typeof row])} variant="view"/>
            </div>
          </td>
        </tr>
      );
    })
  );

    return (
        <>
        <div className="overflow-x-auto border-[2px] border-zinc-400">
        <table className="table table-md">
          
        <thead className="  text-[1rem] bg-primary_bg_indigo text-white border border-t-2 border-zinc-400 ">
          <tr>
          
          {headers}
          
            <th className="border  border-zinc-400  font-medium">
                <div className="flex gap-2">
                  <span>View / Edit / Print </span>
                </div>
            </th>

        </tr>
      </thead>

      <tbody>
        {rows}
      </tbody>

      </table>
      </div>
        
        </>
    );
}

export default SimpleTable;