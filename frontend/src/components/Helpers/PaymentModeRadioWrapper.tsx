import React from "react";
interface PaymentModeRadioWrapperProps {
    children: React.ReactNode;
    label: string
}

const PaymentModeRadioWrapper :React.FC<PaymentModeRadioWrapperProps>= (
    {
        children,
        label
    }
) => {
  return (
    <>
      <label className="text-secondary text-sm" htmlFor="browser">
        {label}
      </label>
      {children}
    </>
  );
};

export default PaymentModeRadioWrapper;
