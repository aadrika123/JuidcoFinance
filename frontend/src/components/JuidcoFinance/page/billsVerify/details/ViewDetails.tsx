import React from "react";
import { BoldSpan } from "./BoxContainer";

type vendorDetail = {
  label: string;
  content: string;
};

type VendorCardsProps = {
  title: string;
  vendorDetails: vendorDetail[];
};

export const VendorCards: React.FC<VendorCardsProps> = (props) => {
  const { title, vendorDetails } = props;
  return (
    <>
      <h1 className="my-4 text-secondary_black text-2xl">{title}</h1>
      <div className="border grid grid-cols-4 gap-4 p-6">
        {vendorDetails.map((vendor, index) => (
          <React.Fragment key={index}>
            <BoldSpan
              className="flex flex-col"
              label={vendor?.label}
              content={vendor?.content}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const ViewDetails = () => {
  const vendorDetails = [
    {
      label: "Vendor Name",
      content: "Ashely",
    },
    {
      label: "Contact Number",
      content: "8097865643",
    },
    {
      label: "Email",
      content: "finance@gmail.com",
    },
    {
      label: "Contact Address",
      content: "Ashok Nagar, Ranchi",
    },
    {
      label: "GST No",
      content: "12x68dnhc89973n",
    },
    {
      label: "Aadhaar No",
      content: "123456789012",
    },
  ];

  const vendorBankDetails = [
    {
      label: "Name of the Bank",
      content: "Ashely",
    },
    {
      label: "Bank Account No",
      content: "8097865643",
    },
    {
      label: "IFSC Code",
      content: "12x68dnh",
    },
    {
      label: "Bank Branch",
      content: "Ashok Nagar, Ranchi",
    },
    {
      label: "PAN No",
      content: "12x68dnhc89973n",
    },
    {
      label: "TIN No",
      content: "123456789012",
    },
  ];

  return (
    <>
      <VendorCards title="Vendor Details" vendorDetails={vendorDetails} />
      <VendorCards
        title="Vendor Bank Details"
        vendorDetails={vendorBankDetails}
      />
    </>
  );
};

export default ViewDetails;
