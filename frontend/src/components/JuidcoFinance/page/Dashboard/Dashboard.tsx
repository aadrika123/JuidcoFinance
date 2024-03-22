"use client";

import React from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Dashboard = () => {

  
 //////////////////// Line Chart options /////////////
 const options:any = {
  series: [
    {
      name: "Series A",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    },
    {
      name: "Series B",
      data: [20, 29, 37, 36, 44, 45, 50, 58],
    },
  ],
  xaxis: {
    categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  },
  chart: {
    toolbar: {
      show: false, // Hides the toolbar
    },
  },
};

  return (
    <div className="bg-[#E3E8FF] -m-5">
      <div>
        <header className="h-11 text-xl bg-[#377ACB] flex justify-center items-center text-white font-bold">
          Finance Dashboard
        </header>
        <div className="flex items-center justify-between flex-wrap my-4 mx-4 gap-3">
          <PieChart title="Total Revenue" subTitle1="Previous Year" subTitle2="Current Year" />
          <PieChart title="Total Expenditure" subTitle1="Previous Year" subTitle2="Current Year"  />
          <PieChart title="Net Position" subTitle1="Previous Year" subTitle2="Current Year"  />
        </div>
        <div className="mx-4">
          <LineChart options={options} />
        </div>
      </div>
      <div>
        <header className="h-8 bg-[#377ACB] flex items-center flex-wrap pl-4 mt-4 text-white font-bold">
          Revenue
        </header>
        <div className="flex items-center justify-between flex-wrap m-4 gap-3">
          <PieChart title="Demand" subTitle1="Arrear" subTitle2="Current"  />
          <PieChart title="Collection" subTitle1="Arrear" subTitle2="Current"  />
          <PieChart title="Balance"   />
        </div>
        <div className="flex items-center justify-between flex-wrap m-4 gap-3">
          <BarChart title="Revenue type" />
          <BarChart title="ULB"/>
          <BarChart title="Payment Mode" />
        </div>
      </div>
      <div>
        <header className="h-8 bg-[#377ACB] flex items-center flex-wrap mt-4 pl-4 text-white font-bold">
          Expenditure
        </header>
        <div className="flex items-center justify-between flex-wrap m-4 gap-3">
          <PieChart title="Expenses Payables" subTitle1="Arrear" subTitle2="Current"/>
          <PieChart title="Expenses Paid" subTitle1="Arrear" subTitle2="Current"/>
          <PieChart title="Balance" />
        </div>
        <div className="flex items-center justify-between flex-wrap mt-4 mx-4 pb-4 gap-3">
          <BarChart title="Expenditure type" />
          <BarChart title="ULB" />
          <BarChart title="Payment Modes" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;