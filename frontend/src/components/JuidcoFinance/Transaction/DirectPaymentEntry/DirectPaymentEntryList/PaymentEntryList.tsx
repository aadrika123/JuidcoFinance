import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { PaymentTableData } from "@/utils/types/direct_payment_entry_types";
import Loader from "@/components/Helpers/Basic/Loader";
import DebouncedSearchBox from "@/components/Helpers/DebouncedSearchBox";
import PaymentEntryTable from "@/components/Helpers/Tables/PaymentEntryTable";
import { addPaymentDetails } from "@/redux/paymentEntryReducer";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { MasterProps } from "@/utils/types/types";

type PaymentListProps = {
  title: string;
};

const PaymentList: React.FC<PaymentListProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  let searchText = "";

  const handlePageChangeAccountList = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  const nextPage = () => {
    handlePageChangeAccountList("next");
  };

  const prevPage = () => {
    handlePageChangeAccountList("prev");
  };

  // redux
  const dispatch = useDispatch();

  // redux

  // ----- FETCH DATA ------////

  const fetchData = async (): Promise<MasterProps<PaymentTableData>> => {
    const res = await axios({
      url: `${FINANCE_URL.DIRECT_PAYMENT_ENTRY_URL.get}&page=${page}`,
      method: "GET",
    });
    return res?.data?.data as MasterProps<PaymentTableData>;
  };

  const {
    data: paymentListData,
    isError: paymentError,
    isLoading: paymentsLoading,
    refetch: reloadData,
  } = useQuery([page], fetchData);

  if (paymentError) {
    throw new Error("some error occurred");
  } else {
    dispatch(addPaymentDetails(paymentListData?.data ?? []));
  }

  const onSearchTextChange = (text: string) => {
    searchText = text;
    reloadData();
  };

  return (
    <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>{props?.title}</SubHeading>
        <DebouncedSearchBox debounceTime={1000} onChange={onSearchTextChange} />
      </div>

      <div className="mt-8">
        {paymentsLoading ? <Loader /> : <PaymentEntryTable />}

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

export default PaymentList;
