import { ROLES } from "./roles";
import { sidebarLinks } from "./sidebar.json";
import { sidebarJuniorEngLinks } from "./sidebar.junior.engeneer.json";

export const getSidebar = (roles: any) => {
  if (roles.includes(ROLES.ACC_DEP_MANAGER)) {
    return sidebarJuniorEngLinks;
  } 
  return sidebarLinks
};
