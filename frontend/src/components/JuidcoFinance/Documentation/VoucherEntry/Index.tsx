"use client";

import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import VoucherList from "./VoucherList/Index";
import AddHeaderWidget from "@/components/Helpers/Widgets/AddHeaderWidget";
import { useQuery } from "react-query";
import { MasterProps } from "@/utils/types/types";
import { VendorDetailsData } from "@/utils/types/vendor_master_types";
import { FINANCE_URL } from "@/utils/api/urls";
import Loader from "@/components/Helpers/Basic/Loader";
export const HeroVoucherEntry = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fetchSearchQuery, setFetchSearchQuery] = useState<boolean>(false);

  const handleChangePage = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  function handleChangeSearchQuery() {
    setFetchSearchQuery(!fetchSearchQuery);
  }

  // ----- FETCH DATA ------////

  const fetchBankData = async (): Promise<MasterProps<VendorDetailsData>> => {
    const res = await axios({
      url: `${FINANCE_URL.VOUCHER_ENTRY_URL.get}&page=${page}&search=${searchQuery}`,
      method: "GET",
    });
    return res.data?.data as MasterProps<VendorDetailsData>;
  };

  const {
    data: vendorListData,
    isError: vendorError,
    isLoading: vendorLoading,
  } = useQuery(["vendor-list", page, fetchSearchQuery], fetchBankData);

  // if (vendorListData?.data) {
  //   dispatch(addBankDetails(accountListData?.data ?? []));
  // }

 

  if (vendorError) {
    throw new Error("some error occurred");
  }

  return (
    <>
      <section>
        <AddHeaderWidget title="Voucher Entry " />
      </section>

      <section className="mt-8">
        {vendorLoading ? (
          <Loader />
        ) : (
          <VoucherList
            data={vendorListData?.data ?? []}
            nextPage={() => handleChangePage("next")}
            prevPage={() => handleChangePage("prev")}
            page={page}
            setSearchQuery={setSearchQuery}
            fetchVendorSearchQuery={handleChangeSearchQuery}
          />
        )}
      </section>
    </>
  );
};
