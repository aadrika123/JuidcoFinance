"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import Table, { ColumnProps } from "@/components/global/molecules/Table";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import NextPrevPagination from "@/components/global/molecules/NextPrevPagination";
import Select from "@/components/global/atoms/nonFormik/Select";
import { FINANCE_URL } from "@/utils/api/urls";
import Input from "@/components/global/atoms/Input";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 16-04-2024
 * | Created for- Showing the list
 * | Status: open
 */

interface TableWithFeaturesProps {
  columns: Array<ColumnProps>;
  api: string;
  numberOfRowsPerPage: number;
  value?: () => void;
  center?: boolean;
  scrollable?: boolean;
  handleGet?: (data: any) => void;
  handleApprove?: () => void;
}

interface stateTypes {
  page: number;
  pageCount: number;
  searchText: string;
  ulbId: number | string;
  bill_no: string;
}

const TableWithFeatures = <T,>({
  columns,
  api,
  numberOfRowsPerPage,
  center = false,
}: TableWithFeaturesProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [state, setState] = useState<stateTypes>({
    page: 1,
    pageCount: 0,
    searchText: "",
    ulbId: 1,
    bill_no: "",
  });
  const { page, pageCount, searchText, ulbId, bill_no } = state;

  const fetchData = async (): Promise<T[]> => {
    const res = await axios({
      url: `${api}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}&order=-1&ulbId=${ulbId}&bill_no=${bill_no}`,
      method: "GET",
    });

    let data = res.data?.data;
    if (data == null) {
      data = { totalPage: 0, data: [] };
    }

    // data = data.data.sort(sortByCreatedAtDesc);
    setState((prev) => ({
      ...prev,
      pageCount: data.totalPage,
      data: data.data,
    }));

    setIsSearching(false);
    return data.data;
  };

  const {
    isError: fetchingError,
    isLoading: isFetching,
    refetch: refetchData,
    data: data = [],
  } = useQuery([page, searchText, ulbId, bill_no], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
  }

  useEffect(() => {
    setIsSearching(true);
    refetchData();
  }, [page, searchText]);

  const handlePageChange = (direction: "prev" | "next") => {
    const newPageNumber = direction === "prev" ? page - 1 : page + 1;
    if (newPageNumber > 0 && newPageNumber <= pageCount) {
      setState({ ...state, page: newPageNumber });
    }
  };

  const onSearchTextChange = (text: string) => {
    setState({ ...state, searchText: text, page: 1 });
  };

  ////// Handl Selecting ULBs ///////////
  const handleUlb = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      ulbId: e.target.value,
    });
  };

  ////// Handl Selecting Date ///////////
  const handleBill = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, bill_no: e.target.value });
  };

  ///// Getting the first selected value
  const initUlbHandler = (value: number) => {
    setState({ ...state, ulbId: value });
  };

  return (
    <>
      <div className="flex justify-between items-end">
        <div className="text-primary_bg_indigo rounded-md px-2 pb-1 text-sub_head font-semibold flex items-center">
          <Select
            label="ULB"
            name="ulb_id"
            className="w-48 text-primary_bg_indigo border-[#4338ca] mr-4"
            api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
            onChange={handleUlb}
            initHandler={initUlbHandler}
          />
          <Input
            label="Bill number"
            name="bill-number"
            placeholder="Type here..."
            onChange={handleBill}
          />
        </div>
        <DebouncedSearch onChange={onSearchTextChange} />
      </div>

      <div className="mt-8">
        {isFetching || isSearching ? (
          <LoaderSkeleton />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              center={center}
              pageNo={page}
              limit={numberOfRowsPerPage}
            />
            <NextPrevPagination
              page={page}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TableWithFeatures;
