"use client";
import React from "react";
import Popup from "../global/molecules/Popup";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closePopup } from "@/redux/reducers/PopupReducers";
import { useDispatch } from "react-redux";
import { FormikWrapperProps } from "@/utils/types/FormikTypes/formikTypes";

const PopupFormikHOC = <P extends FormikWrapperProps>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const HOCComponent: React.FC<P> = (props) => {
    const { resetInitialValue, title } = props;
    const dispatch = useDispatch();
    const isPopupOpen = useSelector((state: RootState) => state.popup.isOpen);
    const handleClosePopup = () => {
      if (resetInitialValue) {
        resetInitialValue();
      }
      dispatch(closePopup());
    };
    return (
      <>
        {isPopupOpen && (
          <Popup title={title}>
            <WrappedComponent {...props} onClose={handleClosePopup} />
          </Popup>
        )}
      </>
    );
  };

  return HOCComponent;
};

export default PopupFormikHOC;
