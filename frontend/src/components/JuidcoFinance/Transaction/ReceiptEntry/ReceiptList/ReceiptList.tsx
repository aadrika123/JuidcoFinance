"use client"

import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import React, { useState } from "react";
import { useQuery} from "react-query";
import axios from "@/lib/axiosConfig";
import { useDispatch } from "react-redux";
import { ReceiptTableData } from "@/utils/types/receipt_entry_types";
import Loader from "@/components/Helpers/Basic/Loader";
import DebouncedSearchBox from "@/components/Helpers/DebouncedSearchBox";
import ReceiptTable from "@/components/Helpers/Tables/ReceiptTable";
import { addReceiptDetails } from "@/redux/reducers/ReceiptEntryReducer";



type ReceiptListProps = {
  title: string;
};

const ReceiptList: React.FC<ReceiptListProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  let searchText = "";
  
  const handlePageChangeAccountList = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  const nextPage = () => {
    handlePageChangeAccountList("next");
  }

  const prevPage = () => {
    handlePageChangeAccountList("prev")
  }

  // redux
  const dispatch = useDispatch();

  // redux

  // ----- FETCH DATA ------////



  const fetchData = async (): Promise<ReceiptTableData[]> => {

    // const res = await axios({
    //   url: `/api/finance/bank-list?limit=10&page=${page}`,
    //   method: "GET",
    // });
    
    // return res.data?.data?.data;

    // console.log(searchText);

    let data: ReceiptTableData[] = [];
    if(searchText.length > 0){
      data = [
        {
          id: 1,
          receiptNo: "383843",
          receiptDate: "9-3-2020",
          subLedger: "3443434",
          paidBy: "someone",
          amount: 909394,
          narration: "paid on time"
        },
    
        {
          id: 2,
          receiptNo: "383843",
          receiptDate: "9-3-2020",
          subLedger: "3443434",
          paidBy: "someone",
          amount: 909394,
          narration: "paid on time"
        },
      ];
    }else{
      data = [
        {
          id: 3,
          receiptNo: "383843",
          receiptDate: "9-3-2020",
          subLedger: "3443434",
          paidBy: "someone",
          amount: 909394,
          narration: "paid on time"
        },
    
        {
          id: 4,
          receiptNo: "383843",
          receiptDate: "9-3-2020",
          subLedger: "3443434",
          paidBy: "someone",
          amount: 909394,
          narration: "paid on time"
        },
      ];

    }
    
    
    
    return data;
  };

  
  const {
      data: receiptListData = [],
      isError: receiptError,
      isLoading: receiptsLoading,
      refetch: reloadData
    } = useQuery([], fetchData);
    
    if (receiptError) {
      throw new Error("some error occurred");
    }else{
      dispatch(addReceiptDetails(receiptListData));
  }

  const onSearchTextChange = (text: string) => {
    searchText = text;
    reloadData();
  }

  return (
    <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>{props?.title}</SubHeading>
        <DebouncedSearchBox debounceTime={1000} onChange={onSearchTextChange}/>
      </div>

      <div className="mt-8">
      {receiptsLoading ? (
          <Loader />
        ) : (
          <ReceiptTable />
        )}
        

        <div className="flex items-center justify-end mt-5 gap-5">
          {page > 1 && (
            <PrimaryButton onClick={prevPage} variant="primary">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                >
                  <path
                    d="M7.72461 0.999692L0.999246 7.83822L7.72461 14.6768"
                    stroke="white"
                    strokeWidth="1.97006"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Previous
            </PrimaryButton>
          )}

          <PrimaryButton onClick={nextPage} variant="primary">
            Next
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="16"
                viewBox="0 0 9 16"
                fill="none"
              >
                <path
                  d="M1 14.6771L7.64894 7.83853L1 1"
                  stroke="white"
                  strokeWidth="1.97006"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default ReceiptList;
