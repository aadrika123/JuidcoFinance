import React from "react";
import { Formik, FormikProps } from "formik";
import { AddBankDetailsData } from "jflib/src/validations/BankMasterValidation";
import { AddBankDetailsSchema } from "jflib/src/validations/BankMasterValidation";
import APIs from "@/json/apis.json";
import { FINANCE_URL } from "@/utils/api/urls";
import Button from "@/components/global/atoms/Button";
import Input from "@/components/global/atoms/Input";
import DropDownList from "@/components/global/atoms/DropDownList";
import DropDownListBox from "@/components/global/atoms/DropDownListBox";

interface BankAccountFormProps {
  initialBankDetailsValues: AddBankDetailsData;
  onSubmit: (arg: AddBankDetailsData) => void;
  onBack: () => void;
  onDirty: (arg: boolean) => boolean;
  readOnly: boolean | true;
}

export default class BankAccountForm extends React.Component<BankAccountFormProps> {
  formik: FormikProps<AddBankDetailsData> | null;
  constructor(props: BankAccountFormProps) {
    super(props);
    this.formik = null;
  }

  resetForm() {
    if (this.formik) {
      this.formik.resetForm();
    }
  }
  render() {
    const { initialBankDetailsValues, onBack, readOnly, onDirty, onSubmit } =
      this.props;

    return (
      <Formik
        innerRef={(p) => (this.formik = p)}
        enableReinitialize={true}
        initialValues={initialBankDetailsValues}
        validationSchema={AddBankDetailsSchema}
        onSubmit={(values: AddBankDetailsData) => {
          console.log(values);

          Object.keys(values).forEach((key) => {
            const val = values[key as keyof typeof values];
            if (
              val ==
              initialBankDetailsValues[
                key as keyof typeof initialBankDetailsValues
              ]
            ) {
              delete values[key as keyof typeof values];
            }
          });

          onSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          dirty,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-6 gap-4 ">
              <DropDownList
                api={`${APIs.bank_types$get}`}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Please select bank type"
                value={values.bank_type_id}
                error={errors.bank_type_id}
                touched={touched.bank_type_id}
                label="Bank Type"
                name="bank_type_id"
                required
                isReadOnly={readOnly}
              />

              <DropDownList
                api={`${APIs.chart_of_accounts$get_municipality_codes}`}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Please select ULB name"
                value={values.ulb_id}
                error={errors.ulb_id}
                touched={touched.ulb_id}
                label="ULB Name"
                name="ulb_id"
                required
                isReadOnly={readOnly}
              />

              <DropDownList
                api={`${FINANCE_URL.BANK_URL.get}`}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Please select an bank"
                value={values.bank_id}
                error={errors.bank_id}
                touched={touched.bank_id}
                label="Bank Name"
                name="bank_id"
                required
                isReadOnly={readOnly}
              />
              <DropDownListBox
                api={`${FINANCE_URL.ACCOUNTING_CODE_URL.getLedgerCodes}`}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Please Select Bank Associated With"
                value={values.primary_acc_code_id}
                error={errors.primary_acc_code_id}
                touched={touched.primary_acc_code_id}
                label="Bank Accociated With"
                name="primary_acc_code_id"
                required
                isReadOnly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bank_acc_no}
                error={errors.bank_acc_no}
                touched={touched.bank_acc_no}
                label="Bank Account No"
                name="bank_acc_no"
                placeholder="Enter Bank Account No"
                required
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ifsc_code}
                error={errors.ifsc_code}
                touched={touched.ifsc_code}
                label="IFSC Code"
                name="ifsc_code"
                placeholder="Enter IFSC Code"
                required
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch}
                error={errors.branch}
                touched={touched.branch}
                label="Bank Branch"
                name="branch"
                placeholder="Bank Branch"
                required
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.micr_code}
                error={errors.micr_code}
                touched={touched.micr_code}
                label="MICR Code"
                name="micr_code"
                placeholder="Enter MICR Code"
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch_address}
                error={errors.branch_address}
                touched={touched.branch_address}
                label="Bank Branch Address"
                name="branch_address"
                placeholder="Enter Branch Address"
                required
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_no}
                error={errors.contact_no}
                touched={touched.contact_no}
                label="Contact Number"
                name="contact_no"
                placeholder="Enter Contact Number"
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch_city}
                error={errors.branch_city}
                touched={touched.branch_city}
                label="Bank Branch City"
                name="branch_city"
                placeholder="Enter Bank Branch City"
                required
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch_district}
                error={errors.branch_district}
                touched={touched.branch_district}
                label="Bank Branch District"
                name="branch_district"
                placeholder="Bank Branch District"
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.branch_state}
                error={errors.branch_state}
                touched={touched.branch_state}
                label="Bank Branch State "
                name="branch_state"
                placeholder="Enter Bank Branch State"
                required
                readonly={readOnly}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                label="Email Id"
                name="email"
                placeholder="Enter Email Id"
                readonly={readOnly}
              />
            </div>
            <div className="mt-4 flex items-center gap-5 justify-end">
              <Button onClick={onBack} buttontype="button" variant="cancel">
                Close
              </Button>

              {onDirty(dirty) && <></>}

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
    );
  }
}
