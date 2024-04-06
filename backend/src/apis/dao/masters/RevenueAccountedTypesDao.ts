import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class RevenueAccountedTypesDao {
  get = async () => {
    const query: Prisma.revenue_accounted_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.revenue_accounted_types.findMany(query);
    return generateRes(data);
  };
}

export default RevenueAccountedTypesDao;
