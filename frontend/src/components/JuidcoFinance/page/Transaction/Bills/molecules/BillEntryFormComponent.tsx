import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/global/atoms/Input";
import DropDownList from "@/components/global/atoms/DropDownList";
import { FINANCE_URL } from "@/utils/api/urls";
import Button from "@/components/global/atoms/Button";
import { billEntryValidationSchema } from "jflib";
import FileInputForm from "@/components/global/atoms/FileInputForm";

export interface BillEntrySchema {
  ulb_id: number;
  bill_date: string;
  party_id: number;
  particulars: string;
  amount: number;
  authorizing_officer_name: string;
  sanction_date: string;
  voucher_no: string;
  remarks: string;
  reason_for_delay: string;
  outstanding_balance: number;
  discount_allowed: string;
  sanctioned_amount: number;
}

interface AddNewBillProps {
  mode: "add" | "edit";

  onSubmit: (data: any, fileTokens: any, dataForDisplay: any) => void;
  onClose: () => void;
  initialValues: BillEntrySchema;
  recordIDtoUpdate: number;
  onUpdate: (itemIndex: number, fileTokens: any, data: any, dataForDisplay: any) => void;
  displayableDataOfRecordtoUpdate: any;
  fileTokensOfRecordToUpdate: any
}

export const BillEntryFormComponent = (props: AddNewBillProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [dataForDisplay, setDataForDisplay] = useState<any>({});
  const [fileTokens, setFileTokens] = useState<any>({});

  const onSubmit = (values: any) => {
    if (formRef) {

      console.log("values: ", values);


      if (props.mode == "edit") {
        props.onUpdate(props.recordIDtoUpdate, values, fileTokens, dataForDisplay);
      } else props.onSubmit(values, fileTokens, dataForDisplay);
    }
  };

  useEffect(() => {
    if (props.mode == "edit") {
      setDataForDisplay(props.displayableDataOfRecordtoUpdate);
      setFileTokens(props.fileTokensOfRecordToUpdate);
    }
    else setDataForDisplay({});
  }, [props.mode]);

  // const setUlb = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     const ele = event.target;
  //     setUlbID(parseInt(ele.value));
  //   }

  const onFileUploaded = (name: string, token: string) => {
    const newFileTokens = { ...fileTokens };
    newFileTokens[name] = token;

    console.log("New File tokens: ", newFileTokens);
    setFileTokens(newFileTokens);
  }

  return (
    <>
      <Formik
        initialValues={props.initialValues}
        validationSchema={billEntryValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          dirty,
          handleReset,
        }) => (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-4 ">
              <DropDownList
                api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                onChange={handleChange}
                onChangeText={(text: string) => {
                  dataForDisplay["ulb"] = text;
                }}
                onBlur={handleBlur}
                placeholder="Please select the ULB"
                value={values.ulb_id}
                error={errors.ulb_id}
                touched={touched.ulb_id}
                label="ULB Name"
                name="ulb_id"
                required
              />

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bill_date}
                error={errors.bill_date}
                touched={touched.bill_date}
                label="Bill Date"
                name="bill_date"
                placeholder="Select the bill date"
                required
                type="date"
                readonly={false}
              />

              <DropDownList
                api={`${FINANCE_URL.VENDOR_MASTER_URL.getNames}`}
                onChange={handleChange}
                onChangeText={(text: string) => {
                  dataForDisplay["party_name"] = text;
                }}
                onBlur={handleBlur}
                placeholder="Please select party"
                value={values.party_id}
                error={errors.party_id}
                touched={touched.party_id}
                label="Name of the Party"
                name="party_id"
                required
              />

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.particulars}
                error={errors.particulars}
                touched={touched.particulars}
                label="Particulars"
                name="particulars"
                placeholder="Particulars of the transaction"
                required
                readonly={false}
              />

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.amount}
                error={errors.amount}
                touched={touched.amount}
                label="amount"
                name="amount"
                type="number"
                placeholder="Amount of the bill"
                required
                readonly={false}
              />

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.authorizing_officer_name}
                error={errors.authorizing_officer_name}
                touched={touched.authorizing_officer_name}
                label="Initials of Authorized Officer"
                name="authorizing_officer_name"
                placeholder="authorizing officer name"
                readonly={true}
              />

              <Input
                label="Sanction Date"
                type="text"
                readonly={true}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.voucher_no}
                error={errors.voucher_no}
                touched={touched.voucher_no}
                label="Voucher No"
                name="voucher_no"
                placeholder=""
                readonly={true}
              />

              <Input
                label="Amount Sanctioned (Rs)"
                name="sanctioned_amount"
                placeholder=""
                readonly={true}
              />

              <Input
                label="Discount Allowed Amount"
                name="discount_allowed"
                placeholder=""
                readonly={true}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.outstanding_balance}
                error={errors.outstanding_balance}
                touched={touched.outstanding_balance}
                label="Balance outstanding at the end of the year"
                name="outstanding_balance"
                placeholder="Outstanding balance"
                readonly={true}
              />

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reason_for_delay}
                error={errors.reason_for_delay}
                touched={touched.reason_for_delay}
                label="Reason for delay in payment"
                name="reason_for_delay"
                placeholder="reason for delay in payment"
                required
                readonly={true}
              />

              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.remarks}
                error={errors.remarks}
                touched={touched.remarks}
                label="Remarks"
                name="remarks"
                placeholder="type some remark"
                required
                readonly={false}
              />

              <div></div>
              <div className="mt-10 flex flex-col gap-2">
                <FileInputForm caption="Certified For Payment Document" name="certified_for_payment" onFileUploaded={onFileUploaded} />
                <FileInputForm caption="Work Completion Certificate" name="work_completion_certificate" onFileUploaded={onFileUploaded} />
                <FileInputForm caption="Vendor Invoice" name="vendor_invoice" onFileUploaded={onFileUploaded} />

              </div>

            </div>

            <div className="mt-4 flex items-center gap-5 justify-end">
              <Button
                onClick={props.onClose}
                buttontype="button"
                variant="cancel"
              >
                Close
              </Button>

              {dirty && (
                <>
                  <Button
                    onClick={handleReset}
                    buttontype="button"
                    variant="cancel"
                  >
                    Reset
                  </Button>
                  <Button
                    buttontype="submit"
                    variant="primary"
                    className="animate-pulse"
                  >
                    Save
                  </Button>
                </>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
