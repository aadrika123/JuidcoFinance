"use client";
import React, { ReactElement, ReactNode, useState } from "react";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import TotalCountTable from "../molecules/TotalCountTable";
import Button from "@/components/global/atoms/Button";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/reducers/PopupReducers";
import Table from "@/components/Helpers/Tables/Table";

export interface ColumnProps {
  name: string;
  caption: string | ReactElement;
  value?: (id: string) => ReactNode;
  color?: string;
}

interface TableHOCProps<T> {
  columns: Array<ColumnProps>;
  data?: T[];
  center?: boolean;
  scrollable?: boolean;
  height?: string;
  title: string;
}

  const TableWithCount: React.FC<TableHOCProps<unknown>> = (props) => {
    const [data, setData] = useState<[]>([]);
    const dispatch = useDispatch()

    const fetchData = async (): Promise<[]> => {
      const res = await axios({
        url: `/bank-master/get-all?limit=10&page=1`,
        method: "GET",
      });

      let data = res.data?.data;

      if (data == null) {
        data = { totalPage: 0, data: [] };
      }

      setData(data.data);
      return data?.data;
    };

    const { isError: fetchingError } = useQuery([], fetchData);

    if (fetchingError) {
      console.log(fetchingError);
    }

    const handleClick = () => {
      dispatch(openPopup());
    }

    return (
      <>
        <section className="border rounded-lg border-zinc-300 p-6 px-10">
          <div className="flex justify-between items-center mb-2">
            <div className="text-secondary text-sub_head font-semibold">
              {props.title}
            </div>
            <Button onClick={handleClick} buttontype="button" variant="primary">Add New Entry</Button>
          </div>
          <Table {...props} data={data} />
          <TotalCountTable />
        </section>
      </>
    );
  };

  export default TableWithCount

