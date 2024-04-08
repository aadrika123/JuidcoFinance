"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
// import Button from "../atoms/Button";

import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import { FINANCE_URL } from "@/utils/api/urls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "@/components/global/atoms/nonFormik/Select";
import Table, { ColumnProps } from "@/components/global/molecules/Table";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import Loader from "@/components/global/atoms/Loader";

interface TableWithScrollPaginProp {
  footer?: React.ReactNode;
  columns: Array<ColumnProps>;
  api: string;
  numberOfRowsPerPage: number;
  value?: () => void;
  center?: boolean;
  scrollable?: boolean;
  handleGet?: (data: any) => void;
  handleApprove?: () => void;
}

interface stateTypes<T> {
  page: number;
  count: number;
  searchText: string;
  data: T[];
  ulbId: number | string;
  moduleId: number | string;
  date: Date;
}

const CollectionsTable = <T,>({
  footer,
  columns,
  api,
  numberOfRowsPerPage,
  center = false,
  scrollable = true,
  ...rest
}: TableWithScrollPaginProp) => {
  const [isSearching, setIsSearching] = useState(false);
  const [state, setState] = useState<stateTypes<T>>({
    page: 1,
    count: 0,
    searchText: "",
    data: [],
    ulbId: "",
    moduleId: "",
    date: new Date(),
  });
  const { page, count, searchText, data, ulbId, date, moduleId } = state;
  const [tempFetch, setTempFetch] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const fetchData = async (): Promise<T[]> => {
    setTempFetch(true);
    const res = await axios({
      url: `${api}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}&order=-1&ulb=${ulbId}&module=${moduleId}&date=${date.toISOString().split("T")[0]}`,
      method: "GET",
    });

    // if (!res.data.status) throw new Error("Something Went Wrong!!");

    let data = res.data?.data;
    if (data == null) {
      data = { totalPage: 0, data: [] };
    }

    // data = data.data.sort(sortByCreatedAtDesc);
    if (page === 1) {
      setState((prev) => ({
        ...prev,
        count: data.count,
        data: data.data,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        count: data.count,
        data: [...prev.data, ...data.data],
      }));
    }
    
    const filteredData = data.data.map((item: any) => ({ id: item.id }));
    setFiltered(filteredData);
    rest.handleGet &&
      rest.handleGet({
        balance: data?.others,
        data: [...filtered, ...filteredData],
      });
    setTempFetch(false);
    setIsSearching(false);
    return data.data;
  };

  const {
    isError: fetchingError,
    isLoading: isFetching,
    refetch: refetchData,
  } = useQuery([page, searchText, ulbId, date, moduleId], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
  }

  useEffect(() => {
    setIsSearching(true);
    refetchData();
  }, [page, searchText, ulbId, date, moduleId]);

  const onSearchTextChange = (text: string) => {
    setState((prev) => ({ ...prev, searchText: text, page: 1 }));
  };

  ////////////// Handle Scroll ///////////
  const handleScroll = () => {
    const element = document.getElementById("table-with-pegination");
    if (element) {
      if (
        element.clientHeight + element.scrollTop + 2 >=
        element.scrollHeight
      ) {
        if (data.length < count) {
          setState((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      }
    }
  };

  ///////////// Listening Scroll /////////////////
  useEffect(() => {
    const element = document.getElementById("table-with-pegination");
    if (element) {
      element?.addEventListener("scroll", handleScroll);
    }

    return () => {
      element?.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, isSearching]);

  ////// Handl Selecting ULBs ///////////
  const handleUlb = (e: ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({ ...prev, ulbId: e.target.value, data: [] }));
  };

  const handleModule = (e: ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({ ...prev, moduleId: e.target.value, data: [] }));
  };

  ////// Handle Selecting Date ///////////
  const handleDate = (date: Date) => {
    setState((prev) => ({ ...prev, date: date, data: [] }));
  };

  return (
    <>
      <section className="border shadow-xl bg-white p-6 px-10">
        <div className="flex justify-between items-center mb-6">
          <div className="text-primary_green rounded-md px-2 pb-1 bg-primary_green text-sub_head font-semibold flex items-center">
            <Select
              label=""
              name="ulb_id"
              placeholder="ULB Name"
              className="w-40 text-primary_green bg-white outline-none"
              api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
              onChange={handleUlb}
            />

            <Select
              label=""
              name="module_id"
              placeholder="Module Name"
              className="w-48 text-primary_green bg-white outline-none mx-2"
              api={`${FINANCE_URL.REVENUE_MODULE.get}`}
              onChange={handleModule}
            />

            <label
              htmlFor="date-pick"
              className="border border-zinc-400 bg-white rounded-md h-[38px] px-2 flex justify-center items-center mt-1"
            >
              {date ? date.toDateString() : "Date"}
            </label>
            <DatePicker
              id="date-pick"
              className="bg-white border-2 hidden"
              selected={date}
              onChange={handleDate}
            />
          </div>

          <DebouncedSearch onChange={onSearchTextChange} />
        </div>

        {tempFetch && (isFetching || isSearching || data.length === 0) ? (
          <LoaderSkeleton />
        ) : (
          <Table
            columns={columns}
            data={data}
            center={center}
            limit={numberOfRowsPerPage}
            scrollable={scrollable}
          />
        )}

        {tempFetch && data.length != 0 && <Loader className="h-[20px]" />}
        {footer}
      </section>
    </>
  );
};

export default CollectionsTable;
