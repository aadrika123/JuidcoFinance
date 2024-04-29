"use client";

import { SubHeading } from "@/components/Helpers/Heading";
import Button from "@/components/global/atoms/Button";
import SimpleTable from "@/components/global/atoms/SimpleTable";
import Popup from "@/components/global/molecules/general/Popup";
import React, { useEffect, useState } from "react";
import { BillEntryFormComponent, BillEntrySchema } from "./molecules/BillEntryFormComponent";
import axios, { baseURL } from "@/lib/axiosConfig";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import SuccesfullConfirmPopup from "@/components/global/molecules/general/SuccesfullConfirmPopup";
import goBack from "@/utils/helper";



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
  outstanding_balance: "",
  discount_allowed: "",
  sanctioned_amount: "",
}

export const AddBill = () => {
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();

  const [isSuccessNotificationOpen, setSuccessNotificationOpen] = useState<boolean>(false);


  const [showAddingForm, setShowAddingForm] = useState<boolean>(false);

  const [inputMode, setInputMode] = useState<"edit"|"add">("add");

  const [dataDict, setDataDict] = useState<any>({});
  const [fileTokensDict, setFileTokensDict] = useState<any>({});

  const [displayableDataDict, setDisplayableDataDict] = useState<any>({});
  const [displayData, setDisplayData] = useState<BillEntrySchema[]>();

  
  // for update functionality
  const [defaultValues, setDefaultValues] = useState<BillEntrySchema>(initialValues);
  const [recordIDtoUpdate, setRecordIDtoUpdate] = useState<number>(0);
  const [displayableDataOfRecordtoUpdate, setDisplayableDataOfRecordToUpdate] = useState<any[]>();
  const [fileTokensOfRecordToUpdate, setFileTokensOfRecordToUpdate] = useState<any[]>();

  const onViewButtonClick = (id: number) => {
    console.log(dataDict);
    console.log(id);
    console.log(dataDict[id]);

    setShowAddingForm(true);
    setInputMode("edit");
    setDefaultValues(dataDict[id]);
    setDisplayableDataOfRecordToUpdate(displayableDataDict[id]);
    setFileTokensOfRecordToUpdate(fileTokensDict[id]);
    setRecordIDtoUpdate(id);
  };

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[5%]" },
    { name: "bill_no", caption: "Bill No.", width: "w-[20%]" },
    { name: "bill_date", caption: "Bill Date", width: "w-[20%]", type: "date" },
    { name: "party_name", caption: "Name of Party", width: "w-[20%]" },
  ];

  const addNewRecord = (frmData: any, fileTokens: any, dataForDisplay: any) => {
    console.log("New record received");
    console.log(frmData);
    console.log(dataForDisplay);

    const id = (Object.keys(dataDict)).length + 1;
    dataForDisplay["id"] = id;
    dataForDisplay["bill_no"] = "[Auto]";


    const newDataDict: any = {...dataDict};
    newDataDict[id] = frmData;
    setDataDict(newDataDict);

    const newFileTokens: any = {...fileTokensDict};
    newFileTokens[id] = fileTokens;
    setFileTokensDict(newFileTokens);
    
    const newDisplayableData: any = {...displayableDataDict};
    newDisplayableData[id] = dataForDisplay;

    setDisplayableDataDict(newDisplayableData);
    
    setShowAddingForm(false);
  };


  const onUpdate = (id: number, frmData: any, fileTokens: any, dataForDisplay: any) => {
    console.log("onUpdate");
    console.log(frmData);
    
    const newDataDict: any = {...dataDict};
    newDataDict[id] = frmData;
    setDataDict(newDataDict);

    const newFileTokens: any = {...fileTokensDict};
    newFileTokens[id] = fileTokens;
    setFileTokensDict(newFileTokens);
    
    const newDisplayableData: any = {...displayableDataDict};
    newDisplayableData[id] = dataForDisplay;
    setDisplayableDataDict(newDisplayableData);

    setShowAddingForm(false);
   }



  useEffect(() => {
    console.log(displayableDataDict);
    
    const x: any = Object.values(displayableDataDict);
    setDisplayData(x);
    console.log("updated");
  }, [displayableDataDict]);

  const submitAll = async () => {
    activateWorkingAnimation();

    console.log("Submit all");

    const submittableData: any[] = [];

    for(const key in dataDict){
      submittableData.push({...dataDict[key], files: fileTokensDict[key]});
    }
    
    console.log("SubmittableData: ", submittableData);

    try {
      const res = await axios({
        url: `${baseURL}/bills/create`,
        method: "POST",
        data: {
          data: submittableData,
        },
      });

      hideWorkingAnimation();
      if (res.data.status) {
        setSuccessNotificationOpen(true);

        setTimeout(() => {
          goBack();
        }, 1000);
        return res.data;
      }
      throw "Something Went Wrong!!";
    } catch (error) {
      console.log(error);
      alert(error)
      throw error;
    }
  };





  return (
    <>
      {workingAnimation}

      {isSuccessNotificationOpen && (
        <SuccesfullConfirmPopup message="Recorded Successfully" />
      )}

      {showAddingForm && (
        <Popup title="Add/Edit Bill" zindex={10} width={60}>
          <BillEntryFormComponent
            mode={inputMode}
            
            onClose={() => setShowAddingForm(false)}

            onSubmit={addNewRecord}
            
            onUpdate={onUpdate}
            initialValues={defaultValues}
            recordIDtoUpdate={recordIDtoUpdate}
            displayableDataOfRecordtoUpdate={displayableDataOfRecordtoUpdate}
            fileTokensOfRecordToUpdate={fileTokensOfRecordToUpdate}
          />
        </Popup>
      )}

      <section className="mt-8">
        <div className="flex items-center">
          <SubHeading className="text-2xl">Bills</SubHeading>
        </div>

        <SimpleTable
          columns={columns}
          data={displayData}
          onViewButtonClick={onViewButtonClick}
        />

        <div className="flex justify-center mt-2">
          <Button variant="cancel" onClick={() => {
            setInputMode("add");
            setDefaultValues(initialValues);
            setShowAddingForm(true);
            }}>
            Add New Bill Entry +{" "}
          </Button>
        </div>
      </section>

      <section>
        <div className="flex justify-end">
        <Button variant="primary" onClick={submitAll}>
          Submit
        </Button>
        </div>
        
      </section>
    </>
  );
};
