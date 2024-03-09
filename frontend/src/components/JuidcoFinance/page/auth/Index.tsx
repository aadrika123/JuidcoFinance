"use client";
import React from "react";
import Login from "./Login";

const HeroLoginPage = () => {
  const reset = false;
  return (
    <>
      {!reset && (
        <div>
          <header className="border-b border-gray-200  darks:bg-gray-800 darks:border-gray-800">
            <div className="container mx-auto xl:max-w-6xl ">
              {/* Navbar */}
              <nav
                className="flex flex-row flex-nowrap items-center justify-between mt-0 py-4 px-6"
                id="desktop-menu"
              >
                {/* logo */}
                <a className="flex items-center py-2 ltr:mr-4 rtl:ml-4 text-xl">
                  <div>
                    {" "}
                    <span className="font-bold text-xl uppercase">
                      {/* {data?.brand_tag}  */} login - Finance Management
                    </span>{" "}
                    <span className="hidden text-gray-700 darks:text-gray-200">
                      {/* {data?.brand_tag == "AMC" ? "AMC" : "JUIDCO"} */}
                    </span>
                  </div>
                </a>
                {/* menu , curantaly: Unavailable */}
              </nav>
            </div>
            <main className="-mt-7">
              <div className=" md:py-12 bg-gray-100 darks:bg-gray-900 border-b darks:bg-opacity-40">
                <div className="container mx-auto px-4 xl:max-w-6xl">
                  <div className="flex flex-wrap -mx-4 flex-row ">
                    <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                      <Login />
                    </div>
                    <div className="flex-shrink max-w-full px-4 w-full lg:w-1/2">
                      <div className="text-center  lg:mt-0">
                        {/* <AnimationHome /> */}
                        Add Animation Here
                      </div>
                    </div>
                  </div>
                </div>
                <footer className="bg-white border-t -mt-9 p-6 border-gray-200 darks:bg-gray-800 darks:border-gray-800">
                  <div className="container mx-auto px-4 xl:max-w-6xl ">
                    <div className="mx-auto px-4">
                      <div className="flex flex-wrap flex-row -mx-4">
                        <div className="flex-shrink  max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-left md:rtl:text-right">
                          <ul className="ltr:pl-0 rtl:pr-0 space-x-4">
                            <li className="inline-block ltr:mr-3 rtl:ml-3">
                              <a className="hover:text-indigo-500" href="#">
                                Support |
                              </a>
                            </li>
                            <li className="inline-block ltr:mr-3 rtl:ml-3">
                              <a className="hover:text-indigo-500" href="#">
                                Help Center |
                              </a>
                            </li>
                            <li className="inline-block ltr:mr-3 rtl:ml-3">
                              <a className="hover:text-indigo-500" href="#">
                                Privacy |
                              </a>
                            </li>
                            <li className="inline-block ltr:mr-3 rtl:ml-3">
                              <a className="hover:text-indigo-500" href="#">
                                Terms of Service
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="flex-shrink max-w-full px-4 w-full md:w-1/2 text-center md:ltr:text-right md:rtl:text-left">
                          <p className="mb-0 mt-3 md:mt-0">
                            <a href="#" className="hover:text-indigo-500">
                              UD&HD
                            </a>{" "}
                            | All right reserved
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </main>
          </header>
        </div>
      )}
    </>
  );

  // return (
  //   <div className="m-0 p-0">
  //     <img className="opacity-45" src="/Juidco.png" alt="login-bg" />
  //     <div className="flex absolute top-0 left-0 right-0 bottom-0">
  //       <div className="w-full gap-6 flex flex-1 flex-col justify-center items-center">
  //         <img className="w-[150px]" src="/johar.png" alt="johar-img" />
  //         <img className="w-[150px]" src="/Jhar_logo.png" alt="jhar-logo" />
  //         <h2 className="w-auto text-3xl font-medium text-[#1B6339]">
  //           Welcome to
  //         </h2>
  //         <h1 className="w-auto text-5xl font-extrabold text-[#1B6339]">
  //           Finance Management
  //         </h1>
  //         <h3 className="w-auto text-3xl font-medium text-[#1B6339]">
  //           of Jharkhand
  //         </h3>
  //       </div>
  //       <div className="flex-1 flex justify-center items-center relative bg-green-900 bg-opacity-75">
  //         <Login />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default HeroLoginPage;
