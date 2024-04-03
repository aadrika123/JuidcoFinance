import { ReactNode, useState } from 'react';


export function useLoadingAnimation(): [ReactNode, () => void, ()=> void] {
  const [show, setShow] = useState<boolean>(false);

  const activateWorkingAnimation = () => {setShow(true);}

  const hideWorkingAnimation = () => {setShow(false);}

  const isLoading = show;

  return [isLoading, activateWorkingAnimation, hideWorkingAnimation];
}