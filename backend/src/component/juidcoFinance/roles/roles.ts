class Roles {
  isProjectManager(role: any) {
    if (!role.includes("PROJECT MANAGER")) return false;
  }
}

module.exports = Roles;
