export const ROLES = Object.freeze({
  JUNIOR_ENGINEER: "Junior Engineer",
  ASSISTANT_ENGINEER: "Assistant Engineer",
  ACC_DEP_MANAGER: "Accounts Department – Manager", ///// Accounts Department – Manager   and Accounts Department - Manager     is not same So Please Copy it from database
  ACC_DEP_ACCOUNTANT: "Accounts Department – Accountant",
  PROJECT_DIR_FINANCE: "Project Director Finance",
});

class User {
  private user: any;
  constructor(userData: any) {
    this.user = userData;
  }

  isAccDepAccountant = () => {
    return this.user?.role?.includes(ROLES.ACC_DEP_ACCOUNTANT);
  };

  isAccDepManager = () => {
    return this.user?.role?.includes(ROLES.ACC_DEP_MANAGER);
  };

  isProjectDirectorFinance = () => {
    return this.user?.role?.includes(ROLES.PROJECT_DIR_FINANCE);
  };

  isJuniorEngineer = () => {
    return this.user?.role?.includes(ROLES.JUNIOR_ENGINEER);
  };

  getUserLevel = () => {
    if (this.user?.role?.includes(ROLES.JUNIOR_ENGINEER)) return 1;
    if (this.user?.role?.includes(ROLES.ASSISTANT_ENGINEER)) return 2;
  };

  getUserId = () => {
    return this.user.id;
  }

  getRole = () => {
    return this.user?.role; 
  }
}

export default User;
