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
    const { resetInitialValue } = props;
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
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-30"></div>
            <section className="fixed left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[11.73831rem] z-50">
              <div className="relative z-50 ">
                <Popup title={props.title || "Add"}>
                  <WrappedComponent {...props} onClose={handleClosePopup} />
                </Popup>
              </div>
            </section>
          </>
        )}
      </>
    );
  };

  return HOCComponent;
};

export default PopupFormikHOC;
