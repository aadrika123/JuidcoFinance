import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, 
});

const LineChart = () => {
  const options = {
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
    <div className="w-auto bg-white rounded p-4 border">
      <h1 className="text-secondary_black font-semibold flex flex-col items-center">
        Total Revenue
      </h1>
      {typeof window !== "undefined" && (
        <Chart
          options={options}
          series={options.series}
          type="line"
          height="250"
        />
      )}
    </div>
  );
};

export default LineChart;
