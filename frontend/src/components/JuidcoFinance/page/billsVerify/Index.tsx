"use client";
import React from "react";
import TableWithFeatures from "./TableWithFeatures";
import ViewButton from "./ViewButton";
import BillLayout from "./BillLayout";
import Image from "next/image";
import list from "@/assets/svg/list.svg";
import details from "@/assets/svg/details.svg";
import { baseURL } from "@/lib/axiosConfig";
import {ROLES} from "jflib";

const HeroBillsVerify = () => {

  const apiGetLevel0JuniorEngineerInbox = `${baseURL}/bill-verification/level-0-${ROLES.JUNIOR_ENGINEER.toLowerCase().replaceAll(' ',  '-')}/inbox`;
  
  //// Columns
  const columns = [
    { name: "id", caption: "Sr. No." },
    {
      name: "bill_no",
      caption: "Bill Number",
    },
    {
      name: "bill_date",
      caption: "Bill Date",
    },
    {
      name: "amount",
      caption: "Amount",
    },
    {
      name: "party_name",
      caption: "Party Name",
    },
    {
      name: "view",
      caption: "View",
      value: ViewButton,
    },
  ];
  return (
    <BillLayout>
      <section className="border bg-white shadow-xl p-6 px-10">
        <div className="flex items-center mb-4">
          <div
            className={`flex items-center  mr-3 pb-1 w-20 justify-center border-b-2 border-b-black`}
          >
            <Image src={list} height={20} width={20} alt="pro-1" />
            <span className="ml-2 text-gray-500">List</span>
          </div>
          <div
            className={`flex items-center  pb-1 w-28 justify-center`}
          >
            <Image src={details} height={20} width={20} alt="pro-1" />
            <span className="ml-2 text-gray-500">Details</span>
          </div>
        </div>
          <TableWithFeatures
            columns={columns}
            api={apiGetLevel0JuniorEngineerInbox}
            numberOfRowsPerPage={10}
          />
      </section>
    </BillLayout>
  );
};

export default HeroBillsVerify;
