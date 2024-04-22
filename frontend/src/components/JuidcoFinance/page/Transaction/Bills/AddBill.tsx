"use client";

import { SubHeading } from "@/components/Helpers/Heading";
import Button from "@/components/global/atoms/Button";
import SimpleTable from "@/components/global/atoms/SimpleTable";
import Popup from "@/components/global/molecules/general/Popup";
import React, { useState } from "react";
import { BillEntryFormComponent } from "./molecules/BillEntryFormComponent";
import axiosWithMultipartFormdata from "@/lib/axiosConfig";

export const AddBill = () => {
  const [showAddingForm, setShowAddingForm] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [formData] = useState<FormData[]>([]);
  const onViewButtonClick = (id: number) => {
    console.log(id);
  };

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    { name: "bill_no", caption: "Bill No.", width: "w-[20%]" },
    { name: "bill_date", caption: "Bill Date", width: "w-[20%]", type: "date" },
    { name: "party_name", caption: "Name of Party", width: "w-[20%]" },
  ];

  const addNewRecord = (frmData: FormData, dataForDisplay: any) => {
    console.log("New record received");

    formData.push(frmData);

    dataForDisplay["id"] = data.length + 1;
    dataForDisplay["bill_no"] = "[Auto]";

    setData([...data, dataForDisplay]);
    setShowAddingForm(false);
  };

  const submitAll = () => {
    console.log("Submit all");

    console.log(formData.length);

    axiosWithMultipartFormdata({
      method: "post",
      url: "/bills/create",
      data: formData[0],
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {showAddingForm && (
        <Popup title="View Bill" zindex={10} width={60}>
          <BillEntryFormComponent
            onSubmit={addNewRecord}
            onClose={() => setShowAddingForm(false)}
          />
        </Popup>
      )}

      <section className="mt-8 border-b border-r border-l">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Bills</SubHeading>
        </div>

        <SimpleTable
          columns={columns}
          data={data}
          onViewButtonClick={onViewButtonClick}
        />

        <div className="flex justify-center">
          <Button variant="cancel" onClick={() => setShowAddingForm(true)}>
            Add New Bill Entry +{" "}
          </Button>
        </div>
      </section>

      <section className="mt-8 border-b border-r border-l">
        <Button variant="primary" onClick={submitAll}>
          Submit
        </Button>
      </section>
    </>
  );
};
