"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import Table, { ColumnProps } from "@/components/global/molecules/Table";
import NextPrevPagination from "@/components/global/molecules/NextPrevPagination";
import DatePicker from "react-datepicker";
import { FINANCE_URL } from "@/utils/api/urls";
import Select from "@/components/global/atoms/nonFormik/Select";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 10-04-2024
 * | Created for- Reusable Record List With Search
 * | Status: open
 */

interface TableWithFeaturesProps {
  footer: React.ReactNode;
  columns: Array<ColumnProps>;
  api: string;
  depApi: string;
  numberOfRowsPerPage: number;
  value?: () => void;
  center?: boolean;
  scrollable?: boolean;
  handleGet?: (data: any) => void;
  handleApprove?: () => void;
}

interface stateTypes<T> {
  page: number;
  pageCount: number;
  searchText: string;
  data: T[];
  ulbId: number | string;
  date: Date;
  filtered: T[];
}

const TableWithFeatures = <T,>({
  footer,
  columns,
  api,
  depApi,
  numberOfRowsPerPage,
  center = false,
  ...rest
}: TableWithFeaturesProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [state, setState] = useState<stateTypes<T>>({
    page: 1,
    pageCount: 0,
    searchText: "",
    data: [],
    ulbId: 1,
    date: new Date(),
    filtered: [],
  });
  const { page, pageCount, searchText, data, ulbId, date } = state;

  const fetchData = async (): Promise<T[]> => {
    const res = await axios({
      url: `${api}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}&order=-1&ulb=${ulbId}&date=${date.toISOString().split("T")[0]}`,
      method: "GET",
    });

    const res1 = await axios({
      url: `${depApi}/${ulbId}/${date.toISOString().split("T")[0]}`,
      method: "GET",
    });

    let data = res.data?.data;
    if (data == null) {
      data = { totalPage: 0, data: [] };
    }

    const filteredData = data.data.map((item: any) => ({ id: item.id }));
    setState((prev) => ({
      ...prev,
      pageCount: data.totalPage,
      data: data.data,
      filtered: filteredData,
    }));

    rest.handleGet &&
      rest.handleGet({
        isApproved: res1.data.data ? true : false,
        data: [...state.filtered, ...filteredData],
      });

    setIsSearching(false);
    return data.data;
  };

  const {
    isError: fetchingError,
    isFetching: isFetching,
    refetch: refetchData,
  } = useQuery([page, searchText, ulbId, date], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
  }

  useEffect(() => {
    setIsSearching(true);
    refetchData();
  }, [page, searchText, ulbId, date]);

  const onSearchTextChange = (text: string) => {
    setState((prev) => ({ ...prev, searchText: text, page: 1 }));
  };

  const handlePageChange = (direction: "prev" | "next") => {
    const newPageNumber = direction === "prev" ? page - 1 : page + 1;
    if (newPageNumber > 0 && newPageNumber <= pageCount) {
      setState((prev) => ({ ...prev, page: newPageNumber }));
    }
  };

  ////// Handl Selecting ULBs ///////////
  const handleUlb = (e: ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({
      ...prev,
      ulbId: e.target.value,
      data: [],
      filtered: [],
    }));
  };

  ////// Handl Selecting Date ///////////
  const handleDate = (date: Date) => {
    setState((prev) => ({ ...prev, date: date, data: [], filtered: [] }));
  };

   ///// Getting the first selected value
   const initUlbHandler = (value: number) =>{
    setState({...state, ulbId: value})
  }

  return (
    <>
      <section className="border bg-white shadow-xl p-6 px-10">
        <div className="flex justify-between items-center">
          <div className="text-primary_bg_indigo rounded-md px-2 pb-1 text-sub_head font-semibold flex items-center">
            <Select
              label=""
              name="ulb_id"
              className="w-48 text-primary_bg_indigo border-[#4338ca]"
              api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
              onChange={handleUlb}
              initHandler={initUlbHandler}
            />
            <label
              htmlFor="date-pick"
              className="border border-primary_bg_indigo bg-white rounded-md h-[38px] px-2 flex justify-center items-center ml-2 mt-1 cursor-pointer"
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

        <div className="mt-8">
          {(isFetching || isSearching) && data.length === 0 ? (
            <LoaderSkeleton />
          ) : (
            <Table
              columns={columns}
              data={data}
              center={center}
              limit={numberOfRowsPerPage}
              pageNo={page}
              // scrollable={scrollable}
            />
          )}
          <NextPrevPagination
            page={page}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />

          {footer}
        </div>
      </section>
    </>
  );
};

export default TableWithFeatures;
