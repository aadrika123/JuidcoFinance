import Button from "@/components/global/atoms/Button";
import Input from "@/components/global/atoms/Input";
import Select from "@/components/global/atoms/Select";
import { FINANCE_URL } from "@/utils/api/urls";
import goBack from "@/utils/helper";
import { PrimaryAccCodes } from "@/utils/types/primary_accounting_codes";
import { Formik, FormikHelpers } from "formik";
import React from "react";

export interface FormikWrapperProps {
  initialValues: PrimaryAccCodes;
  enableReinitialize?: boolean;
  validationSchema: object;
  onSubmit: (
    values: PrimaryAccCodes,
    actions?: FormikHelpers<PrimaryAccCodes>
  ) => void;
  readonly?: boolean;
  onClose?: () => void;
  title: string;
  resetInitialValue?: () => void;
}

const RequestNewAccountCode: React.FC<FormikWrapperProps> = (props) => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    readonly = false,
    onClose,
  } = props;
  return (
    <section className="border bg-white rounded-lg border-primary_green p-6 px-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
            <div>
              <div className="grid grid-cols-2 gap-x-6 gap-4">
                <Select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ulb_id}
                  error={errors.ulb_id}
                  touched={touched.ulb_id}
                  label="Name of ULB"
                  name="ulb_id"
                  placeholder="Select ULBs"
                  api={`${FINANCE_URL.ACCOUNTING_CODE_URL.get}`}
                />
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.request_no}
                  error={errors.request_no}
                  touched={touched.request_no}
                  label="Change Request No"
                  name="request_no"
                  placeholder="Enter Change Request No"
                />
                <Select
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.employee_id}
                  error={errors.employee_id}
                  touched={touched.employee_id}
                  label="Name of the Person Requesting Change"
                  name="employee_id"
                  placeholder="Select Name "
                  api={`${FINANCE_URL.ACCOUNTING_CODE_URL.get}`}
                />

                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
                  error={errors.date}
                  touched={touched.date}
                  label="Date"
                  name="date"
                  type="date"
                />
              </div>

              <table className="table table-md mt-8">
                <thead className="border border-zinc-400">
                  <tr>
                    <th colSpan={3}>
                      <span className="flex justify-center text-secondary">
                        Detail of Codes to be Amended
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-zinc-400 text-secondary">
                      Group Reference
                    </th>
                    <th className="border border-zinc-400 text-secondary">
                      Code Reference
                    </th>
                    <th className="border border-zinc-400 text-secondary">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-zinc-400">
                      <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.group}
                        error={errors.group}
                        touched={touched.group}
                        label=""
                        name="group"
                        placeholder="Enter Group Reference"
                      />
                    </td>
                    <td className="border border-zinc-400">
                      <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.reference_code}
                        error={errors.reference_code}
                        touched={touched.reference_code}
                        label=""
                        name="reference_code"
                        placeholder="Enter Code Reference"
                      />
                    </td>
                    <td className="border border-zinc-400">
                      <Input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        error={errors.description}
                        touched={touched.description}
                        label=""
                        name="description"
                        placeholder="Enter Description"
                      />
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border border-zinc-400">
                    <td colSpan={3}>
                      <span className="flex justify-center text-secondary">
                        Detail of Codes to be Amended
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="mt-4 flex items-center justify-end gap-2">
                <Button
                  onClick={onClose || goBack}
                  variant="cancel"
                  buttontype="button"
                >
                  {onClose ? "Close" : "Back"}
                </Button>

                {!readonly && dirty && (
                  <>
                    <Button
                      variant="cancel"
                      buttontype="button"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button variant="primary" buttontype="submit">
                      Send Request
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default RequestNewAccountCode;
