"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import VendorList from "./VendorList/VendorList";
import AddVendorHeader from "./AddVendorWidget/AddVendorWidget";

export const HeroVendorMaster = () => {
  const [page, setPage] = useState<number>(1);
  const [vendorList, setVendorList] = useState<[]>([]);

  const handlePageChangeAccountList = (direction: "prev" | "next") => {
    setPage((prevPage) => (direction === "prev" ? prevPage - 1 : prevPage + 1));
  };

  useEffect(() => {
    (async function () {
      try {
        const res_one = await axios({
          url: `/api/finance/vendor-list?limit=10&page=${page}`,
          method: "GET",
        });

        setVendorList(res_one?.data?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page]);

  console.log(vendorList);
  return (
    <>
      <section>
        <AddVendorHeader />
      </section>

      <section className="mt-8">
        <VendorList
          data={vendorList}
          nextPage={() => handlePageChangeAccountList("next")}
          prevPage={() => handlePageChangeAccountList("prev")}
          page={page}
        />
      </section>
    </>
  );
};
