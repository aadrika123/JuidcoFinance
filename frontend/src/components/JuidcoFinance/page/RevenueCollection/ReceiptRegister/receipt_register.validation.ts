import * as Yup from "yup";
export const receiptRegisterDetailsSchema = Yup.object().shape({
  receipt_no: Yup.string().required("Receipt No is required"),
  ulb_id: Yup.number()
    .required("Ulb is required")
    .notOneOf([-1], "Ulb is required."),
  primary_acc_code_id: Yup.number()
    .required("Primary Acc Code is required")
    .notOneOf([-1], "Primary Acc Code is required."),
  revenue_module_id: Yup.number()
    .required("Revenue Module is required")
    .notOneOf([-1], "Revenue Module is required."),
  paid_by: Yup.string().required("Paid By is required"),
  receipt_mode_id: Yup.number().required("Receipt Mode  is required"),
  receipt_date: Yup.string().required("Receipt Date is required"),
  revenue_accounted_type_id: Yup.number()
    .required("Revenue Accounted is required.")
    .notOneOf([-1], "Revenue Accounted is required."),
  cheque_or_draft_no: Yup.string().when("receipt_mode_id", {
    is: 2,
    then: (schema) => schema.required("Cheque or draft no is required"),
    otherwise: (schema) => schema,
  }),
  bank_amount: Yup.number().test(
    "bankAmount-test",
    "Bank amount is required",
    (value, validationContext) => {
      const {
        createError,
        parent: { receipt_mode_id },
      } = validationContext;
      if (receipt_mode_id === 3 || receipt_mode_id === 2) {
        if (!value) {
          return createError({
            message: "Bank amount is required",
          });
        }else{
          return true
        }
      } else {
        return true;
      }
    }
  ),
  cash_amount: Yup.number().when("receipt_mode_id", {
    is: 1,
    then: (schema) => schema.required("Cash amount is required"),
    otherwise: (schema) => schema,
  }),
  bank_acc_no: Yup.string().required(),
  deposit_date: Yup.string()
    .when("receipt_mode_id", {
      is: 2,
      then: (schema) => schema.required("Deposit date is required"),
      otherwise: (schema) => schema,
    })
    .test(
      "depositDate-test",
      "Deposit date must be greater then or equal to receipt Date",
      (value, validationContext) => {
        const {
          createError,
          parent: { receipt_date, receipt_mode_id },
        } = validationContext;
        if (receipt_mode_id === 2) {
          if (!value) {
            return createError({
              message: "Deposit date is required",
            });
          }

          if (receipt_date! <= value) {
            return receipt_date <= value;
          }
        } else {
          return true;
        }
      }
    ),
  realisation_date: Yup.string()
    .when("receipt_mode_id", {
      is: 2,
      then: (schema) => schema.required("Realisation date is required"),
      otherwise: (schema) => schema,
    })
    .test(
      "realisationDate-test",
      "Realisation date must be greater then or equal to Deposit Date",
      (value, validationContext) => {
        const {
          createError,
          parent: { deposit_date, receipt_mode_id },
        } = validationContext;
        if (receipt_mode_id === 2) {
          if (!value) {
            return createError({
              message: "Deposit date is required",
            });
          }

          if (deposit_date! <= value) {
            return deposit_date <= value;
          }
        } else {
          return true;
        }
      }
    ),
  wheather_returned: Yup.string(),
  remarks: Yup.string().required("Remarks is required"),
  entered_by_id: Yup.string(),
  entered_by_print_name: Yup.string().required("Print Name is required"),
});
