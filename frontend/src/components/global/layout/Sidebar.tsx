"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/json/sidebar.json";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className: string;
}

const Sidebar: React.FC<SideBarProps> = (props) => {
  const pathName = usePathname();
  const router = useRouter();
  const [data, setData] = useState<string | null>();
  const userData = useSelector((state: any) => state.user.user);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setData(localStorage.getItem("openPage"));
    setUser(userData);
  }, []);
  const handleClick = (moduleName: string) => {
    localStorage.setItem("openPage", moduleName);
  };

  const handleRedirect = (url: string) => {
    router.push(url);
  };

  return (
    <div style={{ height: "calc(100vh - 3.5rem)" }} {...props}>
      <section>
        <div className="w-full flex flex-col items-center justify-center p-5">
          <Image src="/profile.png" width={100} height={100} alt="logo" />
          <h1 className="text-black font-bold text-lg my-2">{user?.name}</h1>
          <h2 className="text-gray-400 font-bold text-xs">
            {user?.designation?.name}
          </h2>
        </div>
        <hr />
        <div className="mt-4">
          {sidebarLinks.modules?.map((link, index: number) => {
            return (
              <div className="h-[100%]" key={index}>
                <ul className="w-full menu menu-xs p-0 ">
                  <ul className="h-lvh">
                    <li>
                      <details open className="w-full h-[100%]">
                        <summary className="text-[1.125rem] p-2 px-6 whitespace-nowrap bg-primary_bg_indigo hover:bg-primary_bg_indigo rounded-none font-semibold text-white">
                          <i className="w-8 bg-white rounded-md p-1">
                            {link.icon}
                          </i>
                          {link.moduleName}
                        </summary>
                        <ul>
                          {link.subModules?.map((sub, index: number) => (
                            <li key={index} className="mt-5 w-[90%]">
                              <details open={data === sub?.moduleName}>
                                {sub.subModules ? (
                                  <summary
                                    className={`${
                                      pathName.startsWith(sub.path)
                                        ? " bg-primary_bg_indigo"
                                        : " bg-transparent text-zinc-600"
                                    } ml-2 text-[0.9375rem] p-1 pr-4 hover:bg-primary_bg_indigo hover:text-white font-semibold text-white`}
                                  >
                                    <i className="w-8 rounded-md p-1.5 bg-primary_bg_indigo ">
                                      {sub.icon}
                                    </i>
                                    {sub.moduleName}
                                  </summary>
                                ) : (
                                  <summary
                                    onClick={() => handleRedirect(sub.path)}
                                    className={`${
                                      pathName.startsWith(sub.path)
                                        ? " bg-primary_bg_indigo"
                                        : " bg-transparent text-zinc-600"
                                    } ml-2 text-[0.9375rem] p-1 pr-4 hover:bg-primary_bg_indigo hover:text-white font-semibold text-white`}
                                  >
                                    <i className="w-8 rounded-md p-1.5 bg-primary_bg_indigo ">
                                      {sub.icon}
                                    </i>
                                    {sub.moduleName}
                                  </summary>
                                )}
                                {sub.subModules && (
                                  <ul>
                                    {sub.subModules?.map((link, i: number) => (
                                      <li
                                        onClick={() =>
                                          handleClick(sub.moduleName)
                                        }
                                        key={i}
                                        className={`mt-3 ml-5`}
                                      >
                                        <Link
                                          className={`text-[0.9375rem] p-2 ${
                                            pathName === link.path
                                              ? "text-black font-medium bg-primary_bg_indigo bg-opacity-20"
                                              : "text-primary"
                                          } `}
                                          href={link.path}
                                        >
                                          {link.moduleName}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </details>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  </ul>
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
