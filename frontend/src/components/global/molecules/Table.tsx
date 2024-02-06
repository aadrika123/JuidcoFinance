"use client";

import dayjs from "dayjs";
import React, { ReactElement, ReactNode } from "react";
import Thead from "../atoms/Thead";
import Tdata from "../atoms/Tdata";
import Trow from "../atoms/Trow";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-02-2024
 * | Created for- Table
 * | Status- done
 */

export interface ColumnProps {
  name: string;
  caption: string | ReactElement;
  value?: (id: string) => ReactNode;
  color?: string;
}

interface SimpleTableProps<T> {
  columns: Array<ColumnProps>;
  data?: T[];
  center?: boolean;
  scrollable?: boolean;
  height?: string;
}

type ObjectContent ={
  id: number;
  type?: string;
  name?: string;
}

const Table = <T,>({
  columns,
  data,
  center = false,
  scrollable = false,
  height = "h-96",
}: SimpleTableProps<T>) => {
  const headers = columns.map((column, index) => {
    return (
      <Thead
        scrollable
        color={column.color}
        center={center}
        cellValue={column.caption}
        key={index}
      />
    );
  });

  const rows = !data?.length ? (
    <Trow scrollable>
      <Tdata scrollable value="No data" colSpan={columns.length} />
    </Trow>
  ) : (
    data?.map((row, index) => {

      return (
        <Trow
          key={index}
          scrollable
          className={`border border-zinc-400 text-secondary`}
        >
          {columns.map((column, index2) => {
            const value = row[column.name as keyof typeof row];
            const value1: ReactNode | string =
              value instanceof Date
                ? dayjs(value).format("DD MMM YYYY")
                : typeof value === 'object' ? (value as ObjectContent).type || (value as ObjectContent).name
                : column.value
                ? column.value(row["id" as keyof typeof row] as string)
                : (value as string);

            return <Tdata scrollable key={index2} value={value1} />;
          })}
        </Trow>
      );
    })
  );

  return (
    <>
      <div className="overflow-x-auto border-[2px] border-zinc-400">
        <table className={`table table-md`}>
          <thead className="text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400">
            <Trow scrollable>{headers}</Trow>
          </thead>
          <tbody
            className={`${scrollable && `block overflow-y-auto ${height}`}`}
          >
            {rows}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
