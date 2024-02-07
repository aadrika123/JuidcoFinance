import { FormikHelpers } from "formik";
import { VoucherDataProps } from "../voucher_entry_types";

export interface Choice {
  key: string;
  value: string;
}

// Add Types Of All Form Data's
export type FormValues = VoucherDataProps;

export type FieldTypeProps = {
  CONTROL: "input" | "select" | "checkbox" | "textarea" | "radio";
  HEADER: string;
  ACCESSOR: string;
  PLACEHOLDER?: string;
  API?: string;
  OPTIONS?: Choice[];
  TYPE?: string;
};


export interface FormikWrapperProps {
  initialValues: object & FormValues;
  validationSchema: object;
  onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
  fields: FieldTypeProps[];
  readonly?: boolean;
  onClose?: () => void;
}
