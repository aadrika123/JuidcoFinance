import Button from "@/components/global/atoms/Button";
import goBack from "@/utils/helper";
import Image from "next/image";
import React, { ReactNode } from "react";
import outbox from "@/assets/svg/Outbox.svg";
import back from "@/assets/svg/back.svg";

const BillLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex items-center justify-between border-b-2 pb-4 mb-4">
        <Button
          variant="cancel"
          className="border-none text-primary_bg_indigo"
          onClick={goBack}
        >
          <Image src={back} height={20} width={20} alt="inbox" />
          <b>Back</b>
        </Button>
        <h2 className="text-black">
          <b>Bills Verify</b>
        </h2>
      </div>
      <div className="flex items-center mb-4">
        <Button variant="primary" className="mr-4">
          <Image src={outbox} height={20} width={20} alt="inbox" />
          Inbox
        </Button>
        <Button variant="primary" className="bg-gray-200 text-gray-500">
          <Image src={outbox} height={20} width={20} alt="inbox" />
          Outbox
        </Button>
      </div>
      {children}
    </>
  );
};

export default BillLayout;
