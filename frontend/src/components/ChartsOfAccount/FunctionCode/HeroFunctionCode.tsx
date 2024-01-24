import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import PrimaryButton from "@/components/Helpers/Button";
import FunctionCodeTable from "@/components/Helpers/Tables/FunctionCodeTable";
import { FunctionTableData, Pagination } from "@/utils/types/types";

type FunctionCodeProps = {
  nextPage: () => void;
  prevPage: () => void;
  data: FunctionTableData[];
  pages: Pagination;
};

const FunctionCode: React.FC<FunctionCodeProps> = (props) => {
  return (
    <>
      <section className="border rounded-lg border-zinc-300 p-6 px-10">
        <SubHeading>Function codes</SubHeading>

        <div className="mt-8">
          <FunctionCodeTable data={props.data} />
          <div className="flex items-center justify-end mt-5 gap-5">
            {props.pages.page > 1 && (
              <PrimaryButton variant="primary" onClick={props.prevPage}>
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

            {props.pages.totalPage !== props.pages.currentPage && (
              <PrimaryButton variant="primary" onClick={props.nextPage}>
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

export default FunctionCode;
