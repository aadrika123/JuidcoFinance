/**
 * Author: Sanjiv Kumar
 * date: 02-09-2024
 * status: Done
 */

"use client";

import React, { lazy } from "react";
const ReceiptRegister = lazy(() => import("./ReceiptRegister"))

export const HeroReceiptRegister = () => {
 
  return (
    <>
     <ReceiptRegister/> 
    </>
  );
};
