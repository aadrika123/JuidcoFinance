"use client";
import Button from "@/components/global/atoms/Button";
import Table from "@/components/global/molecules/Table";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import HomeHeader from "./Header";
import HomeCard, { RactangleCard } from "./Card";
import AllHomeButtons from "./AllButtons";
import { useQuery } from "react-query";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";

const HeroHomePage = () => {
  const router = useRouter();

  const [data, setData] = useState<[]>([]);

  const fetchData = async (): Promise<[]> => {
    const res = await axios({
      url: `${FINANCE_URL.RECEIPT_REGISTER.get}?limit=${10}&page=1`,
      method: "GET",
    });

    let data = res.data?.data;
    if (data == null) {
      data = { totalPage: 0, data: [] };
    }

    // data = data.data.sort(sortByCreatedAtDesc);
    setData(data.data);
    return data.data;
  };

  const { isError: fetchingError, isLoading: isFetching, refetch: refetchIt } = useQuery(
    ['receipts'],
    fetchData
  );

  if (fetchingError) {
    console.log(fetchingError);
  }

  useEffect(() => {
    refetchIt()
  },[])

  //////// Table View Button Feature //////////
  const onViewButtonClick1 = (id: string) => {
    router.push(`/finance/revenue-collection/receipt-register/view/${id}?mode=view`);
  };

  const tButton = (id: string) => {
    return (
      <>
        <Button
          variant="primary"
          className="py-2 px-4"
          onClick={() => onViewButtonClick1(id)}
        >
          View
        </Button>
      </>
    );
  };

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "receipt_no",
      caption: "Receipt Number",
      width: "w-[25%]",
    },
    {
      name: "paid_by",
      caption: "Paid By",
      width: "w-[25%]",
    },
    {
      name: "revenue_module",
      caption: "Revenue Module",
      width: "w-[25%]",
    },
    {
      name: "receipt_date",
      caption: "Receipt Date",
      width: "w-[25%]",
    },
    {
      name: "view",
      caption: "View",
      width: "w-[10%]",
      value: tButton,
    },
  ];
  return (
    <div>
      <h1 className="flex items-center justify-end text-secondary_black font-bold mb-2">
        Home
      </h1>
      <HomeHeader />
      <div className="flex items-center justify-between my-6">
        <HomeCard color="green" title="Number of Receipts" />
        <HomeCard color="blue" title="Number of Payments" />
        <RactangleCard title="Receipt Register" />
      </div>
      <h1 className="text-sm"># Summary of Revenue</h1>
      <AllHomeButtons />
      <div className="shadow-lg mb-6 mt-4">
        {isFetching ? (
          <LoaderSkeleton />
        ) : (
          <Table center columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default HeroHomePage;
