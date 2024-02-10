"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import FilledDisabledInputBox from "@/components/Helpers/FilledDisabledInputBox";
import PrimaryButton from "@/components/Helpers/Button";
import { SubHeading } from "@/components/Helpers/Heading";
import { useQuery } from "react-query";
import Loader from "@/components/Helpers/Basic/Loader";
import { FINANCE_URL } from "@/utils/api/urls";
import goBack from "@/utils/helper";
import dayjs from "dayjs";

type VendorType = {
  id: BigInteger;
  name: string;
};

type DepartmentType = {
  id: BigInteger;
  name: string;
};

type VendorData = {
  id: BigInteger;
  vendor_no: string;
  name: string;
  mobile_no: string;
  tin_no: string;
  gst_no: string;
  is_authorized: boolean;
  vendor_type: VendorType;
  department: DepartmentType;
  email: string;
  bank_name: string;
  contact_address: string;
  ifsc_code: string;
  bank_account_no: string;
  bank_branch_name: string;
  aadhar_no: string;
  pan_no: string;
  created_at: string;
  updated_at: string;
  authorized_date: string;
};

export const HeroViewVendor = ({ vendorID }: { vendorID: string }) => {
  // ----- FETCH DATA ------////
  const fetchVendorData = async (): Promise<VendorData> => {
    const res = await axios({
      url: `${FINANCE_URL.VENDOR_MASTER_URL.getById}/${vendorID}`,
      method: "GET",
    });

    return res.data.data;
  };

  // ///
  const {
    data: vendorData,
    isError: vendorDataError,
    isLoading: vendorDataLoading,
  } = useQuery(["get-single-vendor", vendorID], fetchVendorData);

  if (vendorDataError) {
    throw new Error("some error occurred");
  }


  return (
    <>
      <section className="border rounded-lg bg-white border-[#12743B] p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>View Vendor</SubHeading>
        </div>

        <section className="mt-8">
          {vendorDataLoading ? (
            <Loader />
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-x-6 gap-4">
                <FilledDisabledInputBox
                  label="Vendor Type *"
                  value={vendorData?.vendor_type?.name}
                />
                <FilledDisabledInputBox
                  label="Contact Number"
                  value={vendorData?.mobile_no}
                />
                <FilledDisabledInputBox
                  label="Department Name"
                  value={vendorData?.department?.name}
                />
                <FilledDisabledInputBox
                  label="Email Address"
                  value={vendorData?.email}
                />
                <FilledDisabledInputBox
                  label="Vendor Name"
                  value={vendorData?.name}
                />
                <FilledDisabledInputBox
                  label="Name of the Bank"
                  value={vendorData?.bank_name}
                />
                <FilledDisabledInputBox
                  label="Office Address"
                  value={vendorData?.contact_address}
                />
                <FilledDisabledInputBox
                  label="IFSC Code *"
                  value={vendorData?.ifsc_code}
                />
                <FilledDisabledInputBox
                  label="TIN No"
                  value={vendorData?.tin_no}
                />
                <FilledDisabledInputBox
                  label="Bank Account No."
                  value={vendorData?.bank_account_no}
                />
                <FilledDisabledInputBox
                  label="GST No."
                  value={vendorData?.gst_no}
                />
                <FilledDisabledInputBox
                  label="Bank Branch"
                  value={vendorData?.bank_branch_name}
                />
                <FilledDisabledInputBox
                  label="Aadhaar No."
                  value={vendorData?.aadhar_no}
                />
                <div className="grid grid-cols-3 gap-x-6 gap-4">
                  <FilledDisabledInputBox
                    label="Date Created"
                    value={dayjs(`${vendorData?.created_at}`).format("DD MMM YYYY")}
                  />
                  <FilledDisabledInputBox label="Date Authorized" value={vendorData?.authorized_date ? dayjs(`${vendorData?.authorized_date}`).format("DD MMM YYYY") : ""} />
                  <FilledDisabledInputBox label="Date Modified" value={dayjs(`${vendorData?.updated_at}`).format("DD MMM YYYY") } />
                </div>
                <FilledDisabledInputBox
                  label="Pan No."
                  value={vendorData?.pan_no}
                />
              </div>

              <div className="flex items-center justify-end mt-5 gap-5">
                <PrimaryButton variant={"cancel"} onClick={goBack}>Back</PrimaryButton>

                <PrimaryButton variant="primary">Print</PrimaryButton>
              </div>
            </div>
          )}
        </section>
        <div className="mt-8"></div>
      </section>
    </>
  );
};
