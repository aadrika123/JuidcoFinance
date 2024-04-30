"use client";

import { baseURL } from "@/lib/axiosConfig";
import React, { useRef } from "react";
import axios from '@/lib/axiosConfig';
import { useQuery } from "react-query";
import Input from "@/components/global/atoms/Input";
import Button from "@/components/global/atoms/Button";
import { useReactToPrint } from "react-to-print";
import Stepper from "./molecules/Stepper";
import Loader from "@/components/global/atoms/Loader";



interface ViewBillComponentProps {
  billID: number;
  onClose: () => void
}


const ViewBill = ({ billID, onClose }: ViewBillComponentProps) => {

  const api = `${baseURL}/bills/get/${billID}`;

  const printableComponentRef = useRef(null);
  const printIt = useReactToPrint({
    content: () => printableComponentRef.current,
  });



  const fetchData = async (): Promise<any> => {
    const res = await axios({
      url: api,
      method: "GET",
    });

    console.log(res.data?.data);

    return res.data?.data;
  };


  const { data: ItemData, isError: dataError, isLoading: isLoading } = useQuery(
    [billID],
    fetchData
  );

  if (dataError) {
    throw new Error("Fatal Error!");
  }

  return (
    <>

    {isLoading?<Loader />:(
       <div ref={printableComponentRef} className="p-10">
       <div className="w-[100%] text-black">
         <div className="my-12 ">
           <Stepper activeStepper={ItemData?.approval_stage_id?  ItemData.approval_stage_id + 1: 1} />

         </div>

       </div>

       <form>
         <div className="grid grid-cols-2 gap-x-6 gap-4 ">
           <Input
             label="ULB Name"
             value={ItemData?.ulb_name}
             readonly={true}
           />

           <Input
             label="Bill Date"
             value={ItemData?.bill_date}
             readonly={true}
           />

           <Input
             label="Party Name"
             value={ItemData?.party_name}
             readonly={true}
           />

           <Input
             label="Particulars"
             value={ItemData?.particulars}
             readonly={true}
           />

           <Input
             label="Amount"
             value={ItemData?.amount}
             readonly={true}
           />

           <Input
             label="Initials of the Authorizing officer"
             value={ItemData?.authorizing_officer_name}
             readonly={true}
           />

           <Input
             label="Date of sanction"
             value={ItemData?.sanction_date}
             readonly={true}
           />

           <Input
             label="Voucher Number"
             value={ItemData?.voucher_no}
             readonly={true}
           />

           <Input
             label="Amount Sanctioned (Rs)"
             value={ItemData?.sanctioned_amount}
             readonly={true}
           />


           <Input
             label="Date of Payment or Issue Of Cheque"
             value={ItemData?.date_of_payment_or_cheque_issue}
             readonly={true}
           />


           <Input
             label="Discount Allowed Amount"
             value={ItemData?.discount_allowed}
             readonly={true}
           />


           <Input
             label="Balance outstanding at the end of the year"
             value={ItemData?.outstanding_balance}
             readonly={true}
           />

           <Input
             label="Reason for delay in payment"
             value={ItemData?.reason_for_delay}
             readonly={true}
           />

           <Input
             label="Remarks"
             value={ItemData?.remarks}
             readonly={true}
           />

            {/* {ItemData?.docs?.map((item, index) => {
              return (
                <div key={`doc-${index}`}>
                <span className="text-blue-800 underline">{item.description}</span>
              </div>
              )
            })} */}
         </div>

         <div className="mt-4 flex items-center gap-5 justify-end">
           <Button
             onClick={onClose}
             buttontype="button"
             variant="cancel"
           >
             Close
           </Button>

           <Button
             onClick={printIt}
             buttontype="button"
             variant="cancel"
           >
             Print
           </Button>

         </div>
       </form>
     </div>
    )}

     
    </>

  );
}

export default ViewBill;
