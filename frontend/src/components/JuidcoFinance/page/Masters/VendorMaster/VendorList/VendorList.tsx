import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import VendorsTable from "@/components/Helpers/Tables/VendorsTable";
import SearchBox from "@/components/Helpers/SearchBox";
import React from "react";
import { VendorDetailsData } from "@/utils/types/vendor_master_types";

type VendorListProps = {
  nextPage: () => void;
  prevPage: () => void;
  data: VendorDetailsData[];
  page: number;
  setSearchQuery: (value: string) => void;
  fetchVendorSearchQuery: () => void;
};

const VendorList: React.FC<VendorListProps> = (props) => {

  return (
    <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="flex justify-between">
        <SubHeading>Vendor List</SubHeading>
        <SearchBox
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.setSearchQuery(e.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") props.fetchVendorSearchQuery();
          }}
        />
      </div>

      <div className="mt-8">
        <VendorsTable data={props.data} />

        <div className="flex items-center justify-end mt-5 gap-5">
          {props.page > 1 && (
            <PrimaryButton onClick={props.prevPage} variant="primary">
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

          <PrimaryButton onClick={props.nextPage} variant="primary">
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
        </div>
      </div>
    </section>
  );
};

export default VendorList;
