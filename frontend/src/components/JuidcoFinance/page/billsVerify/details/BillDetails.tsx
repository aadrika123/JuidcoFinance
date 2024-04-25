"use client";

import React, { useState } from "react";
import Stepper from "./Stepper";
import BoxContainer from "./BoxContainer";
import Steps from "./Steps";
import ViewDetails from "./ViewDetails";
import Table from "@/components/global/molecules/Table";
import Action from "./Action";
import admi from "@/assets/svg/admi.svg";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import { FINANCE_URL } from "@/utils/api/urls";
import Loader from "@/components/global/atoms/Loader";
import { useSelector } from "react-redux";
import {User} from "jflib";

type BillDetailProps = {
  billId: string | number;
};

const BillDetails: React.FC<BillDetailProps> = (props) => {
  const user = useSelector((state:any) => state.user.user?.userDetails);
  const userObj = new User(user)
  const { billId } = props;
  const [state, setState] = useState({
    activeStep: 0,
  });

  const fetch = async (endpoint: string) => {
    try {
      const res = await axios({
        url: endpoint,
        method: "GET",
      });

      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data: billData, isFetching: isFetching } = useQuery(['bill-details', billId], () =>
    fetch(`${FINANCE_URL.BILLS_VERIFICATION.getById}/${billId}`)
  );

  const { activeStep } = state;
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

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Stepper items={items} activeStepper={userObj.getUserLevel()} />
          <BoxContainer billDetails={billData} />
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
            <Action billId={Number(billId)} />
          )}
        </>
      )}
    </>
  );
};

export default BillDetails;
