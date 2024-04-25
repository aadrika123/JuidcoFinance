"use client";

import React, { useState } from "react";
import { HeaderWidget } from "@/components/Helpers/Widgets/HeaderWidget";
import DebouncedSearchBox from "@/components/global/atoms/DebouncedSearchBox";
import Loader from "@/components/global/atoms/Loader";
import SimpleTable from "@/components/global/atoms/SimpleTable";
import PrevButton from "@/components/global/atoms/PrevButton";
import NextButton from "@/components/global/atoms/NextButton";
import axios from '@/lib/axiosConfig';
import { useQuery } from "react-query";
import Select from "@/components/global/atoms/nonFormik/Select";
import { FINANCE_URL } from "@/utils/api/urls";
import DateInputBox from "@/components/global/atoms/nonFormik/DatePicker";
import dayjs from "dayjs";
import ViewBill from "./ViewBill";
import Popup from "@/components/global/molecules/general/Popup";


export const BillsHome = () => {
  const numberOfRowsPerPage = 10;
  const api = "/bills/get-all";

  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<[]>([]);

  const [ulbID, setUlbID] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());

  const [viewBillID, setViewBillID] = useState<number>(0);


  const fetchData = async (): Promise<[]> => {
    const res = await axios({
      url: api,
      method: "GET",
      params:{
        ulb: ulbID,
        date: dayjs(date).format("YYYY-MM-DD"),
        search: searchText,
        limit: numberOfRowsPerPage,
        page: page,
      }
    });

    let data = res.data?.data;

    if (data == null) {
      data = { totalPage: 0, data: [] };
    }

    console.log(data);

    setPageCount(data.totalPage);
    setData(data?.data);
    return data?.data;
  };


  const {
    isError: fetchingError,
    isLoading: isFetching,
  } = useQuery([page, searchText, ulbID, date], fetchData, {cacheTime: 0});

  if (fetchingError) {
    console.log(fetchingError);
    // throw new Error("Fatal Error!");
  }

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    { name: "bill_no", caption: "Bill No.", width: "w-[20%]" },
    { name: "bill_date", caption: "Bill Date", width: "w-[20%]", type: "date" },
    { name: "party_name", caption: "Name of Party", width: "w-[20%]" },
    { name: "amount", caption: "Amount", width: "w-[15%]" }

  ];


  const handlePageChange = (direction: "prev" | "next") => {
    const newPageNumber = direction === "prev" ? page - 1 : page + 1;
    if (newPageNumber > 0 && newPageNumber <= pageCount) {
      setPage(newPageNumber);
    }
  };


  const onSearchTextChange = (text: string) => {
    setSearchText(text);
    setPage(1);
  }

  const onViewButtonClick = (id: number) => {
    console.log("Hi");
    setViewBillID(id);
  }


  const setUlb = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const ele = event.target;
    setUlbID(parseInt(ele.value));
  }


  const ulbInitHandler = (value: number) => {
    setUlbID(value);
  }

  
  const handleDateChange = (date: Date) => {
    setDate(date);
  }



  return (
    <>

    {viewBillID && (
        <Popup title="View Bill" zindex={10} width={60}>
          <ViewBill billID={viewBillID}/>
        </Popup>
      )}

      <HeaderWidget variant="add" title={"Bill Register"} />

      <section className="border rounded-lg border-zinc-300 p-6 px-10">


        <div className="flex justify-between">
          <div className="text-secondary text-sub_head font-semibold">
            <div className="flex gap-4">
            <div className="text-primary_green rounded-md px-2 pb-1 text-sub_head font-semibold flex items-center">
              <Select
                label=""
                name="ulb_id"
                className="w-48 text-primary_green bg-white outline-none"
                api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                onChange={setUlb}
                value={ulbID}
                initHandler={ulbInitHandler}
              />
            </div>

            <div className="text-primary_green rounded-md px-2 pb-1 text-sub_head font-semibold flex items-center">
            <DateInputBox name="bill_date" value={date} onChange={handleDateChange} />
            </div>
            
            </div>
            
          </div>
          <DebouncedSearchBox onChange={onSearchTextChange} />
        </div>



        <div className="mt-8">
          {isFetching ? (<Loader />) : (
            <>
              <SimpleTable columns={columns} data={data} onViewButtonClick={onViewButtonClick} />

              <div className="flex items-center justify-between mt-5 gap-5">
                <div>Showing {page} out of {pageCount} pages</div>
                <div className="flex items-center justify-end mt-5 gap-5">

                  {page > 1 && (
                    <PrevButton onClick={() => handlePageChange("prev")} />
                  )}

                  {page < pageCount && (
                    <NextButton onClick={() => handlePageChange("next")} />
                  )}

                </div>
              </div>
            </>
          )}

        </div>

      </section>
    </>
  );
};
