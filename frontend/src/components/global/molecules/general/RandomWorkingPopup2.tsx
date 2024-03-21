import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { BallTriangle, Circles, ColorRing, DNA, ProgressBar, RotatingLines, Watch } from 'react-loader-spinner'
import { useDailyRandomNumber } from "./useRandomNumber";


interface RandomWorkingPopup2Props {
  show: boolean
}

const spinnerProps = {
  visible: true,
  height: "80",
  width: "80",
  ariaLabel: "loading",
  wrapperStyle: {},
  wrapperClass: "dna-wrapper",
  color: "#4338ca"
};



const spinners = [DNA, BallTriangle, ColorRing, Watch, ProgressBar, RotatingLines, Circles];

const RandomWorkingPopup2: React.FC<RandomWorkingPopup2Props> = ({show}: RandomWorkingPopup2Props) => {
  const delay = 500;
  const [step, setStep] = useState<number>(0);
  const spinnerID = useDailyRandomNumber("RandomworkingPopup2", spinners.length);


  useEffect(() => {

    const delayInputTimeoutId = setTimeout(() => {

      setStep(step > 2 ? 0 : step + 1);
    }, delay);
    return () => clearTimeout(delayInputTimeoutId);
  });





  return (
    <>
      {show && (
        <Popup title="" zindex={50} width={30}>
          <div className="flex flex-col justify-center items-center w-auto">

            {spinners[spinnerID](spinnerProps)}

            <span className="text-[20px] text-black my-8">Working {".".repeat(step)}</span>
          </div>
        </Popup>
      )}
    </>

  );
};

export default RandomWorkingPopup2;
