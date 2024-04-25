"use client";

import { SubHeading } from "@/components/Helpers/Heading";
import Button from "@/components/global/atoms/Button";
import SimpleTable from "@/components/global/atoms/SimpleTable";
import Popup from "@/components/global/molecules/general/Popup";
import React, { useEffect, useState } from "react";
import { BillEntryFormComponent, BillEntrySchema } from "./molecules/BillEntryFormComponent";
import axios, { baseURL } from "@/lib/axiosConfig";


const initialValues = {
  ulb_id: 0,
  bill_date: new Date().toISOString(),
  party_id: 0,
  particulars: "",
  amount: 0,
  authorizing_officer_name: '',
  sanction_date: new Date().toISOString(),
  voucher_no: "",
  remarks: "",
  reason_for_delay: "",
  outstanding_balance: 0,
  discount_allowed: "",
  sanctioned_amount: 0
}

export const AddBill = () => {
  const [showAddingForm, setShowAddingForm] = useState<boolean>(false);

  const [inputMode, setInputMode] = useState<"edit"|"add">("add");

  const [dataDict, setDataDict] = useState<any>({});

  const [displayableDataDict, setDisplayableDataDict] = useState<any>({});
  const [displayData, setDisplayData] = useState<BillEntrySchema[]>();

  
  // for update functionality
  const [defaultValues, setDefaultValues] = useState<BillEntrySchema>(initialValues);
  const [recordIDtoUpdate, setRecordIDtoUpdate] = useState<number>(0);
  const [displayableDataOfRecordtoUpdate, setDisplayableDataOfRecordToUpdate] = useState<any[]>();

  const onViewButtonClick = (id: number) => {
    console.log(dataDict);
    console.log(id);
    console.log(dataDict[id]);

    setShowAddingForm(true);
    setInputMode("edit");
    setDefaultValues(dataDict[id]);
    setDisplayableDataOfRecordToUpdate(displayableDataDict[id]);
    setRecordIDtoUpdate(id);
  };

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    { name: "bill_no", caption: "Bill No.", width: "w-[20%]" },
    { name: "bill_date", caption: "Bill Date", width: "w-[20%]", type: "date" },
    { name: "party_name", caption: "Name of Party", width: "w-[20%]" },
  ];

  const addNewRecord = (frmData: any, dataForDisplay: any) => {
    console.log("New record received");
    console.log(frmData);

    const id = (Object.keys(dataDict)).length + 1;
    dataForDisplay["id"] = id;
    dataForDisplay["bill_no"] = "[Auto]";


    const newDataDict: any = {...dataDict};
    newDataDict[id] = frmData;
    setDataDict(newDataDict);
    
    const newDisplayableData: any = {...displayableDataDict};
    newDisplayableData[id] = dataForDisplay;

    setDisplayableDataDict(newDisplayableData);
    
    setShowAddingForm(false);
  };

  useEffect(() => {
    console.log(displayableDataDict);
    
    const x: any = Object.values(displayableDataDict);
    setDisplayData(x);
    console.log("updated");
  }, [displayableDataDict]);

  const submitAll = async () => {
    console.log("Submit all");

    const submittableData = Object.values(dataDict);

    console.log(submittableData);

    try {
      const res = await axios({
        url: `${baseURL}/bills/create`,
        method: "POST",
        data: {
          data: submittableData,
        },
      });
      if (res.data.status) return res.data;

      throw "Something Went Wrong!!";
    } catch (error) {
      console.log(error);
      alert(error)
      throw error;
    }
  };

  const onUpdate = (id: number, frmData: any, dataForDisplay: any) => {
    console.log("onUpdate");
    console.log(frmData);
    
    const newDataDict: any = {...dataDict};
    newDataDict[id] = frmData;
    setDataDict(newDataDict);
    
    const newDisplayableData: any = {...displayableDataDict};
    newDisplayableData[id] = dataForDisplay;
    setDisplayableDataDict(newDisplayableData);

    setShowAddingForm(false);
   }





  return (
    <>
      {showAddingForm && (
        <Popup title="View Bill" zindex={10} width={60}>
          <BillEntryFormComponent
            mode={inputMode}
            
            onClose={() => setShowAddingForm(false)}

            onSubmit={addNewRecord}
            
            onUpdate={onUpdate}
            initialValues={defaultValues}
            recordIDtoUpdate={recordIDtoUpdate}
            displayableDataOfRecordtoUpdate={displayableDataOfRecordtoUpdate}
          />
        </Popup>
      )}

      <section className="mt-8 border-b border-r border-l">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Bills</SubHeading>
        </div>

        <SimpleTable
          columns={columns}
          data={displayData}
          onViewButtonClick={onViewButtonClick}
        />

        <div className="flex justify-center">
          <Button variant="cancel" onClick={() => {
            setInputMode("add");
            setDefaultValues(initialValues);
            setShowAddingForm(true);
            }}>
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
