import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class EmployeesDao {
  get = async () => {
    const query: Prisma.employeesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.employees.findMany(query);
    return generateRes(data);
  };

  getDesignations = async () => {
    const query: Prisma.employeesFindManyArgs = {
      select: {
        id: true,
        designation: true,
      },
    };
    const data = prisma.employees.findMany(query);
    return generateRes(data);
  };
}

export default EmployeesDao;
