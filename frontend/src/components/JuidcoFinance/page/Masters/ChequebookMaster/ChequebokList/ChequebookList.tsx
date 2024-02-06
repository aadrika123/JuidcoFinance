import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ChequebooksTable from "@/components/Helpers/Tables/ChequebooksTable";
import { useDispatch } from "react-redux";
import { ChequebookTableData } from "@/utils/types/chequebook_master_types";
import { addChequebookDetails } from "@/redux/reducers/chequebookMasterReducer";
import Loader from "@/components/Helpers/Basic/Loader";
import DebouncedSearchBox from "@/components/Helpers/DebouncedSearchBox";
import APIs from "@/json/apis.json";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 24-01-2024
 * | Created for- Chequebook Entry
 * | Status: closed
 */

type ChequebookListProps = {
  title: string;
};

const ChequebookList: React.FC<ChequebookListProps> = (props) => {
  const numberOfRowsPerPage = 5;
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");

  // redux
  const dispatch = useDispatch();

  // redux

  // ----- FETCH DATA ------////

  const fetchData = async (): Promise<ChequebookTableData[]> => {
    const res = await axios({
      url: `${APIs.chequebook_master$get}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}`,
      method: "GET",
    });

    let data = res.data?.data;

    if (data == null) {
      data = { totalPage: 0, data: [] };
    }
    setPageCount(data.totalPage);
    return data?.data;
  };

  const {
    data: chequebookListData = [],
    isError: chequebookError,
    isLoading: chequebookLoading,
  } = useQuery([page, searchText], fetchData);

  if (chequebookError) {
    throw new Error("Fatal Error!");
  } else {
    dispatch(addChequebookDetails(chequebookListData));
  }

  const handlePageChange = (direction: "prev" | "next") => {
    const newPageNumber = direction === "prev" ? page - 1 : page + 1;
    if (newPageNumber > 0 && newPageNumber <= pageCount) {
      setPage(newPageNumber);
    }
  };

  const onSearchTextChange = (text: string) => {
    setSearchText(text);
    setPage(1);
  };

  return (
    <>
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>{props?.title}</SubHeading>
          <DebouncedSearchBox
            debounceTime={1000}
            onChange={onSearchTextChange}
          />
        </div>

        <div className="mt-8">
          {chequebookLoading ? <Loader /> : <ChequebooksTable />}

          <div className="flex items-center justify-end mt-5 gap-5">
            {page > 1 && (
              <PrimaryButton
                onClick={() => handlePageChange("prev")}
                variant="primary"
              >
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

            {page < pageCount && (
              <PrimaryButton
                onClick={() => handlePageChange("next")}
                variant="primary"
              >
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
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ChequebookList;
