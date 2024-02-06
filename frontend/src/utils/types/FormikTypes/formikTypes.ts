import { FormikHelpers } from "formik";

export interface Choice {
  key: string;
  value: string;
}

export interface FormValues {
  email: string;
  description: string;
  select_choice: string | number;
  click_choice: string;
  check_box_choice: string;
}

export type FieldTypeProps = {
  CONTROL: "input" | "select" | "checkbox" | "textarea" | "radio";
  HEADER: string;
  ACCESSOR: string;
  PLACEHOLDER?: string;
  API?: string;
  OPTIONS?: Choice[];
};

export interface FormikWrapperProps {
  initialValues: object & FormValues;
  validationSchema: object;
  onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
  fields: FieldTypeProps[];
  readonly?: boolean;
  onClose?: () => void;
}
