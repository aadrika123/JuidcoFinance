"use client";
// ------------------------- CHART OF ACCOUNTS ----------------------- //

import React, { lazy } from "react";
const ChartsOfAccount = lazy(() => import("./ChartsOfAccount").then(module => ({ default: module.ChartsOfAccount })))


export const SubLedgure = () => {

  return (
    <ChartsOfAccount />
  );
};
