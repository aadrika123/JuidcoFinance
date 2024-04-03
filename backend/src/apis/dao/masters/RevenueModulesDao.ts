import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class RevenueModulesDao {
  get = async () => {
    const query: Prisma.revenue_modulesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.revenue_modules.findMany(query);
    return generateRes(data);
  };
}

export default RevenueModulesDao;
