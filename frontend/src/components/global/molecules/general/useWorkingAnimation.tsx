import React, { ReactNode, useState } from 'react';
import RandomWorkingPopup from './RandomWorkingPopup';


export function useWorkingAnimation(): [ReactNode, () => void, ()=> void] {
  const [workingAnimation, setWorkingAnimation] = useState<ReactNode | null>(null);

  const activateWorkingAnimation = () => {
    setWorkingAnimation(
      <>
      <RandomWorkingPopup show={true}/>
      </>
    );
  }

  const hideWorkingAnimation = () => {
    setWorkingAnimation(null);
  }

  return [workingAnimation, activateWorkingAnimation, hideWorkingAnimation];
}