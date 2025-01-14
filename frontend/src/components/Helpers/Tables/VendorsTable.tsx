"use client";

import { VendorDetailsData } from "@/utils/types/vendor_master_types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface BackAccountTableProps {
  data: VendorDetailsData[];
}

const BankAccountsTable: React.FC<BackAccountTableProps> = (props) => {
  const pathName: string = usePathname();

  return (
    <>
      <div className="overflow-x-auto border-[2px] border-zinc-300">
        <table className="table table-md">
          <thead className="  text-[1rem] bg-primary_bg_gray text-black border border-t-2 border-zinc-300 ">
            <tr>
              <th className="border border-zinc-300">
                <div className="flex gap-2 w-16 font-medium text-center">
                  <span>Sr No.</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="12"
                      viewBox="0 0 18 12"
                      fill="none"
                    >
                      <path
                        d="M3.78776 7.88864L3.53288 8.15231V1.48144C3.53288 1.24834 3.44028 1.02479 3.27545 0.859964C3.11063 0.695138 2.88707 0.602539 2.65397 0.602539C2.42087 0.602539 2.19732 0.695138 2.0325 0.859964C1.86767 1.02479 1.77507 1.24834 1.77507 1.48144V8.15231L1.52019 7.88864C1.35469 7.72313 1.13022 7.63016 0.89617 7.63016C0.662117 7.63016 0.43765 7.72313 0.27215 7.88864C0.106649 8.05414 0.0136719 8.2786 0.0136719 8.51266C0.0136719 8.74671 0.106649 8.97118 0.27215 9.13668L2.02995 10.8945C2.11354 10.9745 2.2121 11.0372 2.31999 11.079C2.4252 11.1255 2.53895 11.1496 2.65397 11.1496C2.769 11.1496 2.88275 11.1255 2.98796 11.079C3.09584 11.0372 3.19441 10.9745 3.27799 10.8945L5.0358 9.13668C5.11775 9.05473 5.18275 8.95744 5.2271 8.85037C5.27145 8.7433 5.29428 8.62855 5.29428 8.51266C5.29428 8.39676 5.27145 8.28201 5.2271 8.17494C5.18275 8.06787 5.11775 7.97058 5.0358 7.88864C4.95385 7.80669 4.85656 7.74168 4.7495 7.69733C4.64243 7.65298 4.52767 7.63016 4.41178 7.63016C4.29589 7.63016 4.18113 7.65298 4.07406 7.69733C3.96699 7.74168 3.8697 7.80669 3.78776 7.88864ZM7.92739 2.36034H16.7164C16.9495 2.36034 17.1731 2.26774 17.3379 2.10292C17.5027 1.93809 17.5953 1.71454 17.5953 1.48144C17.5953 1.24834 17.5027 1.02479 17.3379 0.859964C17.1731 0.695138 16.9495 0.602539 16.7164 0.602539H7.92739C7.69429 0.602539 7.47073 0.695138 7.30591 0.859964C7.14108 1.02479 7.04848 1.24834 7.04848 1.48144C7.04848 1.71454 7.14108 1.93809 7.30591 2.10292C7.47073 2.26774 7.69429 2.36034 7.92739 2.36034ZM16.7164 4.99705H7.92739C7.69429 4.99705 7.47073 5.08965 7.30591 5.25447C7.14108 5.4193 7.04848 5.64285 7.04848 5.87595C7.04848 6.10905 7.14108 6.3326 7.30591 6.49743C7.47073 6.66225 7.69429 6.75485 7.92739 6.75485H16.7164C16.9495 6.75485 17.1731 6.66225 17.3379 6.49743C17.5027 6.3326 17.5953 6.10905 17.5953 5.87595C17.5953 5.64285 17.5027 5.4193 17.3379 5.25447C17.1731 5.08965 16.9495 4.99705 16.7164 4.99705ZM16.7164 9.39156H7.92739C7.69429 9.39156 7.47073 9.48415 7.30591 9.64898C7.14108 9.81381 7.04848 10.0374 7.04848 10.2705C7.04848 10.5036 7.14108 10.7271 7.30591 10.8919C7.47073 11.0568 7.69429 11.1494 7.92739 11.1494H16.7164C16.9495 11.1494 17.1731 11.0568 17.3379 10.8919C17.5027 10.7271 17.5953 10.5036 17.5953 10.2705C17.5953 10.0374 17.5027 9.81381 17.3379 9.64898C17.1731 9.48415 16.9495 9.39156 16.7164 9.39156Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              </th>
              <th className="border border-zinc-300 font-medium">
                <div className="flex gap-2">
                  <span>Vendor Type</span>
                </div>
              </th>

              <th className="border border-zinc-300 font-medium">
                <div className="flex gap-2">
                  <span>Vendor No.</span>
                </div>
              </th>

              <th className="border  border-zinc-300 w-[20%] font-medium">
                <div className="flex gap-2">
                  <span>Vendor Name</span>
                </div>
              </th>

              <th className="border  border-zinc-300 font-medium">
                <div className="flex gap-2">
                  <span>TIN No</span>
                </div>
              </th>

              <th className="border  border-zinc-300 font-medium">
                <div className="flex gap-2">
                  <span>GST No</span>
                </div>
              </th>

              <th className="border  border-zinc-300 font-medium">
                <div className="flex gap-2">
                  <span>Authorized</span>
                </div>
              </th>

              <th className="border   border-zinc-300 font-medium">
                <div className="flex gap-2">
                  <span>Edit</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14.6795 7.58225C14.4806 7.58225 14.2899 7.66125 14.1493 7.80186C14.0087 7.94247 13.9297 8.13318 13.9297 8.33203V12.8307C13.9297 13.0296 13.8507 13.2203 13.7101 13.3609C13.5695 13.5015 13.3788 13.5805 13.1799 13.5805H2.68294C2.48409 13.5805 2.29338 13.5015 2.15277 13.3609C2.01215 13.2203 1.93316 13.0296 1.93316 12.8307V2.33377C1.93316 2.13492 2.01215 1.94421 2.15277 1.8036C2.29338 1.66299 2.48409 1.58399 2.68294 1.58399H7.18164C7.38049 1.58399 7.5712 1.505 7.71181 1.36438C7.85243 1.22377 7.93142 1.03306 7.93142 0.834208C7.93142 0.635354 7.85243 0.444643 7.71181 0.304032C7.5712 0.16342 7.38049 0.0844256 7.18164 0.0844256H2.68294C2.08638 0.0844256 1.51425 0.32141 1.09241 0.743244C0.670578 1.16508 0.433594 1.73721 0.433594 2.33377V12.8307C0.433594 13.4273 0.670578 13.9994 1.09241 14.4213C1.51425 14.8431 2.08638 15.0801 2.68294 15.0801H13.1799C13.7765 15.0801 14.3486 14.8431 14.7704 14.4213C15.1923 13.9994 15.4292 13.4273 15.4292 12.8307V8.33203C15.4292 8.13318 15.3503 7.94247 15.2096 7.80186C15.069 7.66125 14.8783 7.58225 14.6795 7.58225ZM3.43272 8.15209V11.3312C3.43272 11.53 3.51172 11.7207 3.65233 11.8613C3.79294 12.002 3.98365 12.0809 4.18251 12.0809H7.36159C7.46026 12.0815 7.55808 12.0626 7.64943 12.0253C7.74078 11.988 7.82387 11.933 7.89393 11.8635L13.0824 6.66752L15.2118 4.58312C15.2821 4.51342 15.3379 4.43049 15.3759 4.33912C15.414 4.24776 15.4336 4.14976 15.4336 4.05078C15.4336 3.9518 15.414 3.85379 15.3759 3.76243C15.3379 3.67106 15.2821 3.58813 15.2118 3.51843L12.0327 0.301863C11.963 0.231587 11.8801 0.175807 11.7887 0.137742C11.6974 0.0996761 11.5994 0.0800781 11.5004 0.0800781C11.4014 0.0800781 11.3034 0.0996761 11.212 0.137742C11.1207 0.175807 11.0377 0.231587 10.968 0.301863L8.85365 2.42375L3.65016 7.61974C3.58067 7.6898 3.52569 7.77289 3.48838 7.86424C3.45107 7.95559 3.43215 8.05341 3.43272 8.15209ZM11.5004 1.8914L13.6223 4.01329L12.5576 5.07798L10.4357 2.95609L11.5004 1.8914ZM4.93229 8.4595L9.3785 4.01329L11.5004 6.13517L7.05417 10.5814H4.93229V8.4595Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              </th>

              <th className="border  border-zinc-300  font-medium">
                <div className="flex gap-2">
                  <span>View </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M5.03514 13.9453H3.57031C3.18181 13.9453 2.80922 13.7909 2.53451 13.5162C2.2598 13.2415 2.10547 12.8689 2.10547 12.4804V8.81835C2.10547 8.42985 2.2598 8.05727 2.53451 7.78256C2.80922 7.50785 3.18181 7.35352 3.57031 7.35352H15.289C15.6775 7.35352 16.0501 7.50785 16.3248 7.78256C16.5995 8.05727 16.7538 8.42985 16.7538 8.81835V12.4804C16.7538 12.8689 16.5995 13.2415 16.3248 13.5162C16.0501 13.7909 15.6775 13.9453 15.289 13.9453H13.8242"
                        stroke="white"
                        strokeWidth="1.7578"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.8242 11.0156H5.03516V16.875H13.8242V11.0156Z"
                        stroke="white"
                        strokeWidth="1.7578"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.03516 7.35349V2.22656H13.8242V7.35349"
                        stroke="white"
                        strokeWidth="1.7578"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.data?.map((d, index: number) => (
              <tr key={index} className="border border-zinc-300 text-secondary">
                {/* ID */}
                <td className="border border-zinc-300">{d?.id}</td>

                {/* Name of Bank */}
                <td className="border border-zinc-300">
                  {d?.vendor_type?.name}
                </td>

                {/*  IFSC Code */}
                <td className="border border-zinc-300 ">
                  <div className="flex justify-center">{d?.vendor_no}</div>
                </td>

                {/* BRANCH */}
                <td className="border border-zinc-300 ">
                  <div className="flex ">
                    <div className="flex justify-center">{d?.name}</div>
                  </div>
                </td>

                <td className="border border-zinc-300 ">
                  <div className="flex ">
                    <div className="flex justify-center">{d?.tin_no}</div>
                  </div>
                </td>

                <td className="border border-zinc-300 ">
                  <div className="flex">
                    <div className="flex justify-center">{d?.gst_no}</div>
                  </div>
                </td>

                <td className="border border-zinc-300 ">
                  <div className="flex justify-center">
                    <div className="flex justify-center">
                      {d?.is_authorized ? "Yes" : "No"}
                    </div>
                  </div>
                </td>

                {/* Edit */}
                <td className="border border-zinc-300">
                  <Link href={`${pathName}/edit/${d.id}`}>
                    <div className="flex justify-center opacity-90">
                      <span>Edit</span>
                      <span className="ml-2 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                        >
                          <rect
                            x="0.40876"
                            y="0.40876"
                            width="13.3107"
                            height="13.1825"
                            rx="3.67884"
                            stroke="#726E6E"
                            strokeWidth="0.81752"
                          />
                          <path
                            d="M9.73084 5.61487C9.61186 5.73386 9.49637 5.84934 9.49287 5.96483C9.48238 6.07681 9.60136 6.19229 9.71334 6.30078C9.88132 6.47575 10.0458 6.63323 10.0388 6.80471C10.0318 6.97618 9.85332 7.15466 9.67485 7.32964L8.22955 8.77843L7.73262 8.2815L9.21991 6.79771L8.88396 6.46176L8.38703 6.95519L7.07471 5.64287L8.41852 4.30256C8.555 4.16608 8.78247 4.16608 8.91196 4.30256L9.73084 5.12144C9.86732 5.25092 9.86732 5.47839 9.73084 5.61487ZM3.5332 9.18788L6.87874 5.83884L8.19106 7.15116L4.84552 10.5002H3.5332V9.18788Z"
                            fill="black"
                            fillOpacity="0.41"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </td>

                {/* View / Print */}
                <td className="border border-zinc-300 ">
                  <div className="flex justify-center">
                    <Link href={`${pathName}/view/${d.id}`}>
                      <div className="flex justify-center opacity-90">
                        <span>View</span>
                        <span className="ml-2 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="14"
                            viewBox="0 0 15 14"
                            fill="none"
                          >
                            <rect
                              x="0.40876"
                              y="0.40876"
                              width="13.3107"
                              height="13.1825"
                              rx="3.67884"
                              stroke="#726E6E"
                              strokeWidth="0.81752"
                            />
                            <path
                              d="M6.93513 6.37039C7.19504 6.37039 7.44431 6.47364 7.62809 6.65743C7.81188 6.84121 7.91513 7.09048 7.91513 7.35039C7.91513 7.6103 7.81188 7.85957 7.62809 8.04336C7.44431 8.22714 7.19504 8.33039 6.93513 8.33039C6.67522 8.33039 6.42595 8.22714 6.24217 8.04336C6.05838 7.85957 5.95513 7.6103 5.95513 7.35039C5.95513 7.09048 6.05838 6.84121 6.24217 6.65743C6.42595 6.47364 6.67522 6.37039 6.93513 6.37039ZM6.93513 4.90039C8.56846 4.90039 9.96333 5.91632 10.5285 7.35039C9.96333 8.78446 8.56846 9.80039 6.93513 9.80039C5.3018 9.80039 3.90693 8.78446 3.3418 7.35039C3.90693 5.91632 5.3018 4.90039 6.93513 4.90039ZM4.05393 7.35039C4.31796 7.88949 4.72794 8.3437 5.23727 8.66139C5.7466 8.97907 6.33485 9.14749 6.93513 9.14749C7.53541 9.14749 8.12366 8.97907 8.63299 8.66139C9.14232 8.3437 9.5523 7.88949 9.81633 7.35039C9.5523 6.81129 9.14232 6.35708 8.63299 6.03939C8.12366 5.72171 7.53541 5.55329 6.93513 5.55329C6.33485 5.55329 5.7466 5.72171 5.23727 6.03939C4.72794 6.35708 4.31796 6.81129 4.05393 7.35039Z"
                              fill="black"
                              fillOpacity="0.41"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BankAccountsTable;
