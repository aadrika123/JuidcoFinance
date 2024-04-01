class Roles {
  isProjectManager(role: any) {
    if (!role.includes("PROJECT MANAGER")) return false;
  }
}

export default Roles;
