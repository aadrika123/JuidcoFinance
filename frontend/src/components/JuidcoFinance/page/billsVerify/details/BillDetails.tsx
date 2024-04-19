"use client";

import React, { useState } from "react";
import Stepper from "./Stepper";
import BoxContainer from "./BoxContainer";
import Steps from "./Steps";
import ViewDetails from "./ViewDetails";
import Table from "@/components/global/molecules/Table";
import Action from "./Action";
import admi from "@/assets/svg/admi.svg";

type BillDetailProps = {
  billsId: string | number;
};

const BillDetails: React.FC<BillDetailProps> = (props) => {
  const { billsId } = props;
  const [state, setState] = useState({
    activeStepper: 3,
    activeStep: 0,
  });

  const { activeStepper, activeStep } = state;
  const items = [
    {
      info: "JUNIOR ENGINEER",
      img: admi,
    },
    {
      info: "ASSISTANT ENGINEER",
      img: admi,
    },
    {
      info: "EXECUTIVE ENGINEER",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
    {
      info: "ACCOUNT DEPARTMENT (MANAGER)",
      img: admi,
    },
    {
      info: "INTERNAL AUDITOR",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
    {
      info: "ACCOUNTS DEPARTMENT (PDF)",
      img: admi,
    },
    {
      info: "EXECUTIVE OFFICER (AMC)",
      img: admi,
    },
  ];

  const columns = [
    { name: "id", caption: "Sr. No." },
    {
      name: "receipt_no",
      caption: "Receipt Number",
    },
    {
      name: "receipt_date",
      caption: "Receipt Date",
    },
    {
      name: "receipt_mode",
      caption: "Mode of Receipt",
    },
    {
      name: "paid_by",
      caption: "Paid By",
    },
  ];

  ///////////// Handling step click ///////////
  const handleStepClick = (step: number) => {
    setState({ ...state, activeStep: step });
  };

  console.log("billsId", billsId)
  return (
    <>
      <Stepper items={items} activeStepper={activeStepper} />
      <BoxContainer />
      <Steps
        handleClick={handleStepClick}
        activeStep={activeStep}
        className="mt-4"
      />
      {activeStep === 0 ? (
        <ViewDetails />
      ) : activeStep === 1 ? (
        <div className="mt-4">
          <Table columns={columns} data={[]} center />
        </div>
      ) : activeStep === 2 ? (
        <div className="mt-4">
          <Table columns={columns} data={[]} center />
        </div>
      ) : (
        <Action />
      )}
    </>
  );
};

export default BillDetails;
