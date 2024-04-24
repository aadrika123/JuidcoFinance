export const ROLES = Object.freeze({
  ACC_DEP_MANAGER: "Accounts Department – Manager", ///// Accounts Department – Manager   and Accounts Department - Manager     is not same So Please Copy it from database
  ACC_DEP_ACCOUNTANT: "Accounts Department – Accountant",
  PROJECT_DIR_FINANCE: "Project Director Finance",
});

class User {
  private user;
  constructor(userData: any) {
    this.user = userData;
  }

  isAccDepAccountant = () => {
    return this.user?.roles?.includes(ROLES.ACC_DEP_ACCOUNTANT);
  };

  isAccDepManager = () => {
    return this.user?.roles?.includes(ROLES.ACC_DEP_MANAGER);
  };

  isAccDepFinance = () => {
    return this.user?.roles?.includes(ROLES.PROJECT_DIR_FINANCE);
  };
}

export default User;
