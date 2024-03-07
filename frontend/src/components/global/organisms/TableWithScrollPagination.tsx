import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Table, { ColumnProps } from "../molecules/Table";
import DebouncedSearch from "../atoms/DebouncedSearch";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import LoaderSkeleton from "../atoms/LoaderSkeleton";
import { FINANCE_URL } from "@/utils/api/urls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "../atoms/nonFormik/Select";

interface TableWithScrollPaginProp {
  footer?: React.ReactNode;
  columns: Array<ColumnProps>;
  api: string;
  numberOfRowsPerPage: number;
  value?: () => void;
  center?: boolean;
  scrollable?: boolean;
}

interface stateTypes<T> {
  page: number;
  pageCount: number;
  searchText: string;
  data: T[];
}

const TableWithScrollPagination = <T,>({
  footer,
  columns,
  api,
  numberOfRowsPerPage,
  center = false,
  scrollable = true,
}: TableWithScrollPaginProp) => {
  const [isSearching, setIsSearching] = useState(false);
  const [state, setState] = useState<stateTypes<T>>({
    page: 1,
    pageCount: 0,
    searchText: "",
    data: [],
  });
  const { page, pageCount, searchText, data } = state;

  const fetchData = async (): Promise<T[]> => {
    const res = await axios({
      url: `${api}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}&order=-1`,
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
  } = useQuery([page, searchText], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
  }

  useEffect(() => {
    setIsSearching(true);
    refetchData();
  }, [page, searchText]);

  // const handlePageChange = (direction: "prev" | "next") => {
  //   const newPageNumber = direction === "prev" ? page - 1 : page + 1;
  //   if (newPageNumber > 0 && newPageNumber <= pageCount) {
  //     setState((prev) => ({ ...prev, page: newPageNumber }));
  //   }
  // };

  const onSearchTextChange = (text: string) => {
    setState((prev) => ({ ...prev, searchText: text, page: 1 }));
  };

  const [startDate, setStartDate] = useState();

  return (
    <>
      <section className="border border-primary_green bg-white rounded-lg p-6 px-10">
        <div className="flex justify-between items-center mb-2">
          <div className="text-primary_green rounded-md px-2 pb-1 bg-primary_green text-sub_head font-semibold flex items-center">
            <Select
              label=""
              name="ulb_id"
              placeholder="ULB Name"
              className="w-48 text-primary_green bg-white outline-none"
              api={`${FINANCE_URL.ACCOUNTING_CODE_URL.get}`}
            />
            <label htmlFor="date-pick" className="border border-zinc-400 bg-white rounded-md h-[38px] px-2 flex justify-center items-center ml-2">
              {startDate ? startDate.toDateString() : "Date"}
            </label>
            <DatePicker
              id="date-pick"
              className="bg-white border-2 hidden"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </div>

          <DebouncedSearch onChange={onSearchTextChange} />
        </div>
        {isFetching || isSearching ? (
          <LoaderSkeleton />
        ) : (
          <Table
            columns={columns}
            data={data}
            center={center}
            pageNo={page}
            limit={numberOfRowsPerPage}
            scrollable={scrollable}
          />
        )}
        {/* {props.footerData && props.footerData.length > 0 && (
          <TotalCountTable footerData={props.footerData} />
        )} */}
        {footer}
        <aside className="flex items-center justify-end py-5 gap-5">
          <Button onClick={() => {}} buttontype="button" variant="primary">
            Approved
          </Button>
        </aside>
      </section>
    </>
  );
};

export default TableWithScrollPagination;
