import React from "react";
import RadioButton from "./RadioButton";

interface RadioButtonProps {
  label: React.ReactNode;
  name: string;
}

const PaymentModeRadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    <div className="flex gap-5">
      <RadioButton name={props.name} label="Cash" id="radio1" />
      <RadioButton name={props.name} label="Cheque" id="radio2" />
      <RadioButton name={props.name} label="NFT/RTGS" id="radio3" />
    </div>
  );
};

export default PaymentModeRadioButton;
