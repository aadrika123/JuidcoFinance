"use client";

import React, { Suspense } from "react";
const PieChart = React.lazy(() => import("./PieChart"));
const BarChart = React.lazy(() => import("./BarChart"));
const LineChart = React.lazy(() => import("./LineChart"));
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import Loader from "@/components/global/atoms/Loader";
import { useQuery } from "react-query";

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const res = await axios({
        url: `${FINANCE_URL.DASHBOARD.get}`,
        method: "GET",
      });

      if (!res.data.status) throw "Something went wrong!!";

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useQuery(["dashboard"], fetchData);
  // const data: any = {};

  //////////////////// Line Chart options /////////////
  const options: any = {
    series: [
      {
        name: "Revenue",
        data: data?.revExpNetPosition?.revenue || [
          1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6,
        ],
      },
      {
        name: "Expenditure",
        data: data?.revExpNetPosition?.expenditure || [
          20, 29, 37, 36, 44, 45, 50, 58,
        ],
      },
      {
        name: "NetPosition",
        data: data?.revExpNetPosition?.netPosition || [
          20, 29, 37, 36, 44, 45, 50, 58,
        ],
      },
    ],
    xaxis: {
      categories: [2024, 2023, 2022, 2021] || [
        2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
      ],
    },
    chart: {
      toolbar: {
        show: false, // Hides the toolbar
      },
    },
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        {!data ? (
          <Loader />
        ) : (
          <div className="bg-[#E3E8FF] -m-5">
            <div>
              <header className="h-11 text-xl bg-[#377ACB] flex justify-center items-center text-white font-bold">
                Finance Dashboard
              </header>
              <div className="flex items-center justify-between flex-wrap my-4 mx-4 gap-3">
                <PieChart
                  arrear={data?.totalRevenue?.previous_amount}
                  current={data?.totalRevenue?.current_amount}
                  title="Total Revenue"
                  subTitle1="Previous Year"
                  subTitle2="Current Year"
                />
                <PieChart
                  arrear={data?.expenditure?.previous_amount}
                  current={data?.expenditure?.current_amount}
                  title="Total Expenditure"
                  subTitle1="Previous Year"
                  subTitle2="Current Year"
                />
                <PieChart
                  arrear={data?.netPosition?.previous_amount}
                  current={data?.netPosition?.current_amount}
                  title="Net Position"
                  subTitle1="Previous Year"
                  subTitle2="Current Year"
                />
              </div>
              <div className="mx-4">
                <LineChart
                  title="Revenue vs Expenditure vs Net Positions"
                  options={options}
                />
              </div>
            </div>
            <div>
              <header className="h-8 bg-[#377ACB] flex items-center flex-wrap pl-4 mt-4 text-white font-bold">
                Revenue
              </header>
              <div className="flex items-center justify-between flex-wrap m-4 gap-3">
                <PieChart
                  arrear={data?.demand?.arrear_amount}
                  current={data?.demand?.current_amount}
                  title="Demand"
                  subTitle1="Arrear"
                  subTitle2="Current"
                />
                <PieChart
                  arrear={data?.collection?.arrearAmount}
                  current={data?.collection?.currentAmount}
                  title="Collection"
                  subTitle1="Arrear"
                  subTitle2="Current"
                />
                <PieChart
                  arrear={
                    data?.collection?.arrearAmount + data?.demand?.arrear_amount
                  }
                  current={
                    data?.collection?.currentAmount +
                    data?.demand?.current_amount
                  }
                  title="Total Revenue"
                  subTitle1="Arrear"
                  subTitle2="Current"
                />
              </div>
              <div className="flex items-center justify-between flex-wrap m-4 gap-3">
                <BarChart data={data?.revenueModules} title="Revenue type" />
                <BarChart data={data?.ulbs} title="ULB" />
                <BarChart data={data?.paymentModes} title="Payment Mode" />
              </div>
            </div>
            <div>
              <header className="h-8 bg-[#377ACB] flex items-center flex-wrap mt-4 pl-4 text-white font-bold">
                Expenditure
              </header>
              <div className="flex items-center justify-between flex-wrap m-4 gap-3">
                <PieChart
                  title="Expenses Payables"
                  subTitle1="Arrear"
                  subTitle2="Current"
                />
                <PieChart
                  title="Expenses Paid"
                  subTitle1="Arrear"
                  subTitle2="Current"
                />
                <PieChart title="Balance" />
              </div>
              <div className="flex items-center justify-between flex-wrap mt-4 mx-4 pb-4 gap-3">
                <BarChart title="Expenditure type" />
                <BarChart title="ULB" />
                <BarChart title="Payment Modes" />
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
};

export default Dashboard;
