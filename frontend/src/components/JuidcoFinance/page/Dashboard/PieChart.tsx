import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false, 
});

interface PieChartProps {
  title: string;
  subTitle1?: string;
  subTitle2?: string;
}

interface ChartOptions {
  labels: string[];
  colors: string[];
  dataLabels: {
    enabled: boolean;
  };
  legend: {
    position: "right" | "top" | "bottom" | "left" | undefined;
    offsetY: number;
  };
}

const PieChart: React.FC<PieChartProps> = (props) => {
  const { title, subTitle1, subTitle2 } = props;
  const options: {chartOptions: ChartOptions, series:number[]} = {
    series: [44, 60],
    chartOptions: {
      labels: ["2021", "2022"],
      colors: ["#C7D2FE", "#377ACB"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "right", // Or any other valid position value
        offsetY: 80,
      },
    },
  };
  return (
    <div className="w-72 max-md:w-80 max-sm:w-96 bg-white rounded p-4 border">
      <div className="">
        <h1 className="text-secondary_black font-semibold flex flex-col items-center">
          {title}
        </h1>
        {subTitle1 && subTitle2 ? (
          <div className="flex items-center justify-between my-2">
            <div className="flex flex-col">
              <span className="text-secondary text-sm">{subTitle1}</span>
              <span className="text-secondary text-sm">123456</span>
            </div>
            <div className="flex flex-col">
              <span className="text-secondary text-sm">{subTitle2}</span>
              <span className="text-secondary text-sm">12345</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center my-2">
            <span className="text-secondary text-sm">123456</span>
          </div>
        )}
      </div>
      {typeof window !== "undefined" && (
        <Chart
          options={options.chartOptions}
          series={options.series}
          type="pie"
          width="280"
        />
      )}
    </div>
  );
};

export default PieChart;
