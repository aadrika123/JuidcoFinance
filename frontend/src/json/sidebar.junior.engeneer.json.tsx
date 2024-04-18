import React from "react";
import Image from "next/image";
import mastersLogo from "@/assets/icons/sidebar/masters.svg";
import rupeeIcons from "@/assets/svg/rupee_icons.svg";
import houseIcons from "@/assets/svg/house_icons.svg";
import { SidebarLinksProps } from "@/components/JuidcoFinance/page/Documentation/ChartsOfAccount/types";

export const sidebarJuniorEngLinks: SidebarLinksProps = {
  modules: [
    {
      moduleName: "Finance Management",
      path: "/",
      icon: <Image src={rupeeIcons} alt="finance" width={100} height={100} />,
      subModules: [
        {
          moduleName: "Home",
          icon: <Image src={houseIcons} alt="home" width={100} height={100} />,
          path: "/home",
        },
        {
          moduleName: "Bills - Verify",
          icon: <Image src={houseIcons} alt="home" width={100} height={100} />,
          path: "/bills-berify",
        },
        {
          moduleName: "Dashboard",
          icon: (
            <Image src={mastersLogo} alt="dashboard" width={100} height={100} />
          ),
          path: "/dashboard",
        },
      ],
    },
  ],
};
