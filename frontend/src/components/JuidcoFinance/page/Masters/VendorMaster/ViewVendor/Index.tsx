"use client";

import React from "react";
import axios from "@/lib/axiosConfig";
import { SubHeading } from "@/components/Helpers/Heading";
import { useQuery } from "react-query";
import { FINANCE_URL } from "@/utils/api/urls";
import goBack from "@/utils/helper";
import dayjs from "dayjs";
import Loader from "@/components/global/atoms/Loader";
import Input from "@/components/global/atoms/Input";
import Button from "@/components/global/atoms/Button";

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
  bank: DepartmentType;
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

    if(!res.data.status) throw "Something Went Wrong!!"
    return res.data.data;
  };

  // ///
  const {
    data: vendorData,
    isError: vendorDataError,
    isFetching: vendorDataLoading,
  } = useQuery(["get-single-vendor", vendorID], fetchVendorData);

  if (vendorDataError) {
    throw new Error("some error occurred");
  }

  return (
    <>
      <section className="border rounded-lg bg-white shadow-xl p-6 px-10">
        <div className="flex justify-between">
          <SubHeading>View Vendor</SubHeading>
        </div>

        <section className="mt-8">
          {vendorDataLoading ? (
            <Loader />
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-x-6 gap-4">
                <Input
                  label="Vendor Type *"
                  value={vendorData?.vendor_type?.name}
                  readonly={true}
                />
                <Input
                  label="Contact Number"
                  value={vendorData?.mobile_no}
                  readonly={true}
                />
                <Input
                  label="Department Name"
                  value={vendorData?.department?.name}
                  readonly={true}
                />
                <Input
                  label="Email Address"
                  value={vendorData?.email}
                  readonly={true}
                />
                <Input
                  label="Vendor Name"
                  value={vendorData?.name}
                  readonly={true}
                />
                <Input
                  label="Name of the Bank"
                  value={vendorData?.bank?.name}
                  readonly={true}
                />
                <Input
                  label="Office Address"
                  value={vendorData?.contact_address}
                  readonly={true}
                />
                <Input
                  label="IFSC Code *"
                  value={vendorData?.ifsc_code}
                  readonly={true}
                />
                <Input
                  label="TIN No"
                  value={vendorData?.tin_no}
                  readonly={true}
                />
                <Input
                  label="Bank Account No."
                  value={vendorData?.bank_account_no}
                  readonly={true}
                />
                <Input
                  label="GST No."
                  value={vendorData?.gst_no}
                  readonly={true}
                />
                <Input
                  label="Bank Branch"
                  value={vendorData?.bank_branch_name}
                  readonly={true}
                />
                <Input
                  label="Aadhaar No."
                  value={vendorData?.aadhar_no}
                  readonly={true}
                />
                <div className="grid grid-cols-3 gap-x-6 gap-4">
                  <Input
                    label="Date Created"
                    value={dayjs(`${vendorData?.created_at}`).format(
                      "DD MMM YYYY"
                    )}
                    readonly={true}
                  />
                  <Input
                    label="Date Authorized"
                    value={
                      vendorData?.authorized_date
                        ? dayjs(`${vendorData?.authorized_date}`).format(
                            "DD MMM YYYY"
                          )
                        : ""
                    }
                    readonly={true}
                  />
                  <Input
                    label="Date Modified"
                    value={dayjs(`${vendorData?.updated_at}`).format(
                      "DD MMM YYYY"
                    )}
                    readonly={true}
                  />
                </div>
                <Input label="Pan No." value={vendorData?.pan_no} />
              </div>

              <div className="flex items-center justify-end mt-5 gap-5">
                <Button variant={"cancel"} onClick={goBack}>
                  Back
                </Button>

                <Button variant="primary">Print</Button>
              </div>
            </div>
          )}
        </section>
        <div className="mt-8"></div>
      </section>
    </>
  );
};
