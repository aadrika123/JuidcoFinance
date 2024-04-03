import React from "react";
import { Formik, FormikProps } from "formik";
import { AddBankDetailsData } from "jflib/src/validations/BankMasterValidation";
import { AddBankDetailsSchema } from "jflib/src/validations/BankMasterValidation";
import DropDownListBox from "@/components/Helpers/DropDownListBox";
import APIs from "@/json/apis.json";
import { FINANCE_URL } from "@/utils/api/urls";
import InputBox from "@/components/Helpers/InputBox";
import PrimaryButton from "@/components/Helpers/Button";


interface BankAccountFormProps {
    initialBankDetailsValues: AddBankDetailsData
    onSubmit: (arg: AddBankDetailsData) => void;
    onBack: () => void;
    onDirty: (arg: boolean) => boolean;
    readOnly: boolean | true;
}


export default class BankAccountForm extends React.Component<BankAccountFormProps> {
  formik: FormikProps<AddBankDetailsData> | null;
  constructor(props: BankAccountFormProps){
    super(props);
    this.formik = null;
  }

  resetForm(){
    if(this.formik){
      this.formik.resetForm();
    }
  }
  render() {
  
    const {initialBankDetailsValues, onBack, readOnly, onDirty, onSubmit} = this.props;
    
    return (
      <Formik
      innerRef={(p) => (this.formik = p)}
      enableReinitialize={true}
      initialValues={initialBankDetailsValues}
      validationSchema={AddBankDetailsSchema}
      onSubmit={(values: AddBankDetailsData) => {
        console.log(values);
        
        Object.keys(values).forEach(key => {
          const val = values[key as keyof typeof values];
          if (val == initialBankDetailsValues[key as keyof typeof initialBankDetailsValues]) {
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
        dirty
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-6 gap-4 ">
            <DropDownListBox
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

            <DropDownListBox
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

            <DropDownListBox
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
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.ifsc_code}
              error={errors.ifsc_code}
              touched={touched.ifsc_code}
              label="IFSC Code"
              name="ifsc_code"
              placeholder="Enter IFSC Code"
              required
              isReadOnly={readOnly}
            />
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.branch}
              error={errors.branch}
              touched={touched.branch}
              label="Bank Branch"
              name="branch"
              placeholder="Bank Branch"
              required
              isReadOnly={readOnly}

              
            />
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.micr_code}
              error={errors.micr_code}
              touched={touched.micr_code}
              label="MICR Code"
              name="micr_code"
              placeholder="Enter MICR Code"
              isReadOnly={readOnly}

            />
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.branch_address}
              error={errors.branch_address}
              touched={touched.branch_address}
              label="Bank Branch Address"
              name="branch_address"
              placeholder="Enter Branch Address"
              required
              isReadOnly={readOnly}

            />
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact_no}
              error={errors.contact_no}
              touched={touched.contact_no}
              label="Contact Number"
              name="contact_no"
              placeholder="Enter Contact Number"
              isReadOnly={readOnly}

            />
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.branch_city}
              error={errors.branch_city}
              touched={touched.branch_city}
              label="Bank Branch City"
              name="branch_city"
              placeholder="Enter Bank Branch City"
              required
              isReadOnly={readOnly}

            />
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.branch_district}
              error={errors.branch_district}
              touched={touched.branch_district}
              label="Bank Branch District"
              name="branch_district"
              placeholder="Bank Branch District"
              isReadOnly={readOnly}

            />
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.branch_state}
              error={errors.branch_state}
              touched={touched.branch_state}
              label="Bank Branch State "
              name="branch_state"
              placeholder="Enter Bank Branch State"
              required
              isReadOnly={readOnly}

            />
            <InputBox
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              label="Email Id"
              name="email"
              placeholder="Enter Email Id"
              isReadOnly={readOnly}

            />

          </div>
          <div className="mt-4 flex items-center gap-5 justify-end">
            <PrimaryButton
              onClick={onBack}
              buttonType="button"
              variant="cancel"
            >
              Close
            </PrimaryButton>

            {onDirty(dirty) && (<></>)}


            {dirty && (
              <>
                <PrimaryButton
                  onClick={handleReset}
                  buttonType="button"
                  variant="cancel"
                >
                  Reset
                </PrimaryButton>
                <PrimaryButton
                  buttonType="submit"
                  variant="primary"
                  className="animate-pulse"
                >
                  Save
                </PrimaryButton>
              </>
            )}
          </div>
        </form>

      )}
    </Formik>

  );
  }
}

