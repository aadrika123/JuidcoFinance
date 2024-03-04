"use client";
import React from "react";
import Login from "./Login";

const HeroLoginPage = () => {
  return (
    <div className="m-0 p-0">
      <img className="opacity-45" src="/Juidco.png" alt="login-bg" />
      <div className="flex absolute top-0 left-0 right-0 bottom-0">
        <div className="w-full gap-6 flex flex-1 flex-col justify-center items-center">
          <img className="w-[150px]" src="/johar.png" alt="johar-img" />
          <img className="w-[150px]" src="/Jhar_logo.png" alt="jhar-logo" />
          <h2 className="w-auto text-3xl font-medium text-[#1B6339]">
            Welcome to
          </h2>
          <h1 className="w-auto text-5xl font-extrabold text-[#1B6339]">
            Finance Management
          </h1>
          <h3 className="w-auto text-3xl font-medium text-[#1B6339]">
            of Jharkhand
          </h3>
        </div>
        <div className="flex-1 flex justify-center items-center relative bg-green-900 bg-opacity-75">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default HeroLoginPage;
