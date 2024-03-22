"use client";
import dynamic from "next/dynamic";
import React from "react";
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface LineChartProps {
  width?: number;
  options: any;
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const { width = 900, options } = props;

  return (
    <div className="w-auto bg-white rounded p-4 border">
      <h1 className="text-secondary_black font-semibold flex flex-col items-center">
        Total Revenue
      </h1>
      <Chart
        options={options}
        series={options.series}
        type="line"
        height={250}
        width={width}
      />
    </div>
  );
};

export default LineChart;
