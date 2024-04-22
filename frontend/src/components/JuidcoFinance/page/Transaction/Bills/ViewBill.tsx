"use client";

import HorizontalStepper from "@/components/global/atoms/StepperComponent";
import React from "react";



const ViewBill = ({ billID }: { billID: number }) => {

  const steps = [
    { title: "JUNIOR-ENGINEER" },
    { title: "ASSISTANT-ENGINEER" },
    { title: "EXECUTIVE ENGINEER"},
    { title: "EXECUTIVE OFFICER (AMC)" },
    { title: "ACCOUNT DEPARTMENT (MANAGER)" },
    { title: "INTERNAL AUDITOR"},
    { title: "EXECUTIVE OFFICER"},
    { title: "ACCOUNTS DEPARTMENT (PDF)"},
  ];
  const activeStep = 5;
  

  return (
    <>
      <div className="w-[100%] text-black">
        Hello
        {billID}

        <div className="mt-12">
          <HorizontalStepper steps={steps} activeStep={activeStep}/>
        </div>

      </div>

    </>

  );
}

export default ViewBill;
