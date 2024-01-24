import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import React, { useState } from "react";
import { useQuery} from "react-query";
import axios from "@/lib/axiosConfig";
import ChequebooksTable from "@/components/Helpers/Tables/ChequebooksTable";
import { useDispatch } from "react-redux";
import { ChequebookTableData } from "@/utils/types/chequebook_master_types";
import { addChequebookDetails } from "@/redux/chequebookMasterReducer";
import Loader from "@/components/Helpers/Basic/Loader";
import DebouncedSearchBox from "@/components/Helpers/DebouncedSearchBox";


export type ChequebookTableProps = {
  id: number;
  vendor_type: string;
  vendor_no: string;
  name: string;
  tin_no: string;
  gst_no: string;
  is_authorized: boolean;
};

type ChequebookListProps = {
  title: string;
};

const ChequebookList: React.FC<ChequebookListProps> = (props) => {
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



  const fetchData = async (): Promise<ChequebookTableData[]> => {

    // const res = await axios({
    //   url: `/api/finance/bank-list?limit=10&page=${page}`,
    //   method: "GET",
    // });
    
    // return res.data?.data?.data;

    // console.log(searchText);

    let chequebookData: ChequebookTableData[] = [];
    if(searchText.length > 0){
      chequebookData = [
        {
          id: 2, 
          date: '3-4-2022',
          bank_branch: "bank branch, ranchi", 
          bank_name: "SBI",
          bank_account_number: "2284834848484",
          cheque_no_from: "3838383",
          cheque_no_to: "34343243",
          employee_name: "Rajesh Kumar",
          issuer_name: "SBI ranchi",
          ifsc_code: "3737",
          page_count: 10,
          remarks: "no remarks"
        },
    
        {
          id: 4, 
          date: '1-1-2021',
          bank_branch: "bank branch, jamshedpur", 
          bank_name: "ICICI bank",
          bank_account_number: "43432423",
          cheque_no_from: "244",
          cheque_no_to: "300",
          employee_name: "Suresh Kumar",
          issuer_name: "ICICI Delhi",
          ifsc_code: "3737",
          page_count: 10,
          remarks: "no remarks"
        },
      ];
    }else{
      chequebookData = [
        {
          id: 1, 
          date: '3-4-2022',
          bank_branch: "bank branch, ranchi", 
          bank_name: "SBI",
          bank_account_number: "2284834848484",
          cheque_no_from: "3838383",
          cheque_no_to: "34343243",
          employee_name: "Rajesh Kumar",
          issuer_name: "SBI ranchi",
          ifsc_code: "3737",
          page_count: 10,
          remarks: "no remarks"
        },
    
        {
          id: 2, 
          date: '1-1-2021',
          bank_branch: "bank branch, jamshedpur", 
          bank_name: "ICICI bank",
          bank_account_number: "43432423",
          cheque_no_from: "244",
          cheque_no_to: "300",
          employee_name: "Suresh Kumar",
          issuer_name: "ICICI Delhi",
          ifsc_code: "3737",
          page_count: 10,
          remarks: "no remarks"
        },
      ];

    }
    
    
    
    return chequebookData;
  };

  
  const {
      data: chequebookListData = [],
      isError: chequebookError,
      isLoading: chequebookLoading,
      refetch: reloadData
    } = useQuery([], fetchData);
    
    if (chequebookError) {
      throw new Error("some error occurred");
    }else{
      dispatch(addChequebookDetails(chequebookListData));
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
      {chequebookLoading ? (
          <Loader />
        ) : (
          <ChequebooksTable />
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

export default ChequebookList;
