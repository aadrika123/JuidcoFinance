import { SubHeading } from "@/components/Helpers/Heading";
import React from "react";
import { VendorDetailsData } from "../vendor_master_types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import Button from "@/components/global/atoms/Button";
import VendorTable from "./VendorTable";

type VendorListProps = {
  nextPage: () => void;
  prevPage: () => void;
  data: VendorDetailsData[];
  page: number;
  setSearchQuery: (value: string) => void;
  fetchVendorSearchQuery: () => void;
};

const VendorList: React.FC<VendorListProps> = (props) => {
  const handleSearch = (text: string) => {
    props.setSearchQuery(text);
  };
  return (
    <section className="border shadow-2xl bg-white p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>Vendor List</SubHeading>
        <DebouncedSearch onChange={handleSearch} />
        {/* <Search
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.setSearchQuery(e.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") props.fetchVendorSearchQuery();
          }}
        /> */}
      </div>

      <div className="mt-8">
        <VendorTable data={props.data} />

        <div className="flex items-center justify-end mt-5 gap-5">
          {props.page > 1 && (
            <Button onClick={props.prevPage} variant="primary">
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
            </Button>
          )}

          <Button onClick={props.nextPage} variant="primary">
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
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VendorList;
