import Button from "@/components/global/atoms/Button";
import Image from "next/image";
import React from "react";
import admi from "@/assets/svg/admi.svg";
import { BoldSpan } from "./BoxContainer";

const Action = () => {
  return (
    <div className="flex mt-4">
      <div className="w-1/3 bg-[#f9fafc]">
        <header className="bg-[#e1e8f0] p-2 flex items-center justify-center text-secondary_black">
          Members
        </header>
        <div className="p-4">
          <span className="mt-4 text-secondary_black">Comments</span>
          <textarea
            className="bg-white border text-secondary"
            name="comments"
            cols={30}
            rows={5}
          />
          <Button className="mt-2 bg-[#38bdf8] hover:bg-[#5bc8f7]" variant="primary">
            Send Comment
          </Button>
          <div className="flex justify-between mt-8">
            <Button className="hover:bg-[#f44646]" variant="danger">Send Back</Button>
            <Button variant="primary">Forward</Button>
          </div>
        </div>
      </div>
      <div className="w-2/3">
        <header className="bg-gray-200 p-2 flex items-center justify-center text-secondary_black">
          Timeline
        </header>
        <div className="p-4 text-secondary_black">
          <span>Junior Engineer&apos;s Comment</span> <br />
          <span className="flex justify-center text-red-500">
            No Comment Yet!
          </span>
          <hr className="mb-4" />
          <span>Level Comment</span>
          <div className="bg-[#e0f2fe] p-4 mt-4 rounded-lg w-2/3 relative">
            <div className="h-5 w-5 bg-[#3abdf3] rounded-full text-white flex items-center justify-center absolute top-0 left-0">1</div>
            <div className="flex items-center">
              <Image src={admi} alt="admi" />
              <div className="flex flex-col ml-1">
                <span>
                  <b>Rakesh Kumar</b>
                </span>
                <span>Junior Engineer</span>
              </div>
            </div>
            <div className="my-1">
              forwarded to{" "}
              <span className="bg-gray-700 rounded p-2 text-white text-xs">
                Assistant Engineer
              </span>
            </div>
            <BoldSpan label="Comment:" content="Verify the bill" /> <br />
            <BoldSpan label="Received Date:" content="09-03-2024 16:31" />{" "}
            <br />
            <BoldSpan label="Forward Date:" content="NA NA" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Action;
