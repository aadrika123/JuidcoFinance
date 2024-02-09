// 'use client'
// import React from 'react'
// import Popup from '../molecules/Popup'
// import { Formik } from 'formik'
// import FormikController from '../molecules/FormikController'
// import { FormikWrapperProps } from '@/utils/types/FormikTypes/formikTypes'
// import Button from '../atoms/Button'

// const PopupFormikContainer:React.FC<FormikWrapperProps>  = () => {
//     const {
//         initialValues,
//         validationSchema,
//         onSubmit,
//         fields,
//         readonly = false,
//       } = props;
//   return (
//     <div>
//         <Popup title="Hello" closeModal={() => {}}>
//         <section className="border rounded-lg border-zinc-300 p-6 px-10">
//       <div className="mt-8">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//           }) => (
//             <form onSubmit={handleSubmit}>
//               <div className="mt-8 grid grid-cols-2 gap-x-6 gap-4 ">
//                 {fields.map((item) => (
//                   <>
//                     <FormikController
//                       readonly={readonly}
//                       control={item.CONTROL}
//                       label={item.HEADER || ""}
//                       name={item.ACCESSOR}
//                       placeholder={item.PLACEHOLDER}
//                       api={item.API}
//                       options={item.OPTIONS || []}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       value={values[item.ACCESSOR as keyof typeof values]}
//                       error={errors[item.ACCESSOR as keyof typeof errors]}
//                       touched={touched[item.ACCESSOR as keyof typeof touched]}
//                     />
//                   </>
//                 ))}
//               </div>
//               {!readonly && (
//                 <div className="flex items-center justify-end gap-2">
//                   <Button variant="cancel" buttontype="button">
//                     Back
//                   </Button>
//                   <Button variant="cancel" buttontype="button">
//                     Reset
//                   </Button>
//                   <Button variant="primary" buttontype="submit">
//                     Save
//                   </Button>
//                 </div>
//               )}
//             </form>
//           )}
//         </Formik>
//       </div>
//     </section>
//         </Popup>
//     </div>
//   )
// }

// export default PopupFormikContainer