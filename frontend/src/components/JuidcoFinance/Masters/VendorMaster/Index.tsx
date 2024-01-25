"use client";

import React, { useState } from "react";
import axios from "@/lib/axiosConfig";
import VendorList from "./VendorList/VendorList";
import AddVendorHeader from "./AddVendorWidget/AddVendorWidget";
import { useDispatch } from "react-redux";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { MasterProps } from "@/utils/types/types";
import toast from "react-hot-toast";
import { VendorDetailsData } from "@/utils/types/vendor_master_types";
import { FINANCE_URL } from "@/utils/api/urls";
export const HeroVendorMaster = () => {
  const [page, setPage] = useState<number>(1);

  const handleChangePage = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  // redux
  const dispatch = useDispatch();

  // redux

  // ----- FETCH DATA ------////

  const queryClient = useQueryClient();

  const fetchBankData = async (): Promise<MasterProps<VendorDetailsData>> => {
    const res = await axios({
      url: `${FINANCE_URL.VENDOR_MASTER_URL.get}&page=${page}`,
      method: "GET",
    });
    return res.data?.data as MasterProps<VendorDetailsData>;
  };

  const {
    data: vendorListData,
    isError: vendorError,
    isLoading: vendorLoading,
  } = useQuery(["vendor-list", page], fetchBankData);

  // if (vendorListData?.data) {
  //   dispatch(addBankDetails(accountListData?.data ?? []));
  // }

  if (vendorError) {
    throw new Error("some error occurred");
  }

  // Add Bank Details
  const createBankDetails = async (
    values: VendorDetailsData
  ): Promise<VendorDetailsData> => {
    const res = await axios({
      url: `/bank-master/create`,
      method: "POST",
      data: values,
    });
    return res.data;
  };
  // mutate Bank Details
  const { mutate } = useMutation(createBankDetails, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Successfully Added Bank Details!");
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries("bank-list");
    },
  });

  return (
    <>
      <section>
        <AddVendorHeader />
      </section>

      <section className="mt-8">
        <VendorList
          data={vendorListData?.data ?? []}
          nextPage={() => handleChangePage("next")}
          prevPage={() => handleChangePage("prev")}
          page={page}
        />
      </section>
    </>
  );
};
