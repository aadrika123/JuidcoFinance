"use client";

import React from "react";
import { Formik } from "formik";
import FormikController from "../molecules/FormikController";
import {
  FieldTypeProps,
  FormikErrors,
  FormikTouched,
  FormikWrapperProps,
} from "@/utils/types/FormikTypes/formikTypes";
import Button from "../atoms/Button";
import goBack from "@/utils/helper";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Formik Container
 * | Status- Intermittently Updating
 */

const FormikWrapper: React.FC<FormikWrapperProps> = (props) => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    fields,
    readonly = false,
    onClose,
  } = props;


  /////////////////////////// Generating Fields ///////////////////////////////
  const generateFields = (
    n: any,
    handleChange: (e: React.ChangeEvent<unknown>) => void,
    handleBlur: (e: React.FocusEvent<unknown>) => void,
    values: any,
    errors: FormikErrors,
    touched: FormikTouched
  ) => {
    const d: JSX.Element[] = [];
    if (n.length > 0) {
      let multiD: JSX.Element[] = [];
      n.forEach((item: FieldTypeProps, index: number) => {
        if (item.TITLE) {
          if (multiD.length > 0) {
            d.push(
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-4 ">
                {...multiD}
              </div>
            );
            multiD = [];
          }
          d.push(<span className="text-[22px]">{item.TITLE}</span>);
          return generateFields(
            n.slice(index + 1),
            handleChange,
            handleBlur,
            values,
            errors,
            touched
          );
        } else {
          multiD.push(
            <span>
              <FormikController
                readonly={readonly}
                control={item.CONTROL || ""}
                label={item.HEADER || ""}
                name={item.ACCESSOR || ""}
                placeholder={item.PLACEHOLDER}
                api={item.API}
                options={item.OPTIONS || []}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[item.ACCESSOR as keyof typeof values]}
                error={errors[item.ACCESSOR as keyof typeof errors]}
                touched={touched[item.ACCESSOR as keyof typeof touched]}
              />
            </span>
          );
        }
      });
      d.push(
        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-4 ">{...multiD}</div>
      );
      return d;
    }
  };

  return (
    <section className="border rounded-lg border-zinc-300 p-6 px-10">
      <div className="mt-8">
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
          }) => (
            <form onSubmit={handleSubmit}>
              {generateFields(
                fields,
                handleChange,
                handleBlur,
                values,
                errors,
                touched
              )}
              {!readonly && (
                <div className="mt-4 flex items-center justify-end gap-2">
                  <Button
                    onClick={onClose || goBack}
                    variant="cancel"
                    buttontype="button"
                  >
                    {onClose ? "Close" : "Back"}
                  </Button>
                  <Button variant="cancel" buttontype="button">
                    Reset
                  </Button>
                  <Button variant="primary" buttontype="submit">
                    Save
                  </Button>
                </div>
              )}
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default FormikWrapper;
