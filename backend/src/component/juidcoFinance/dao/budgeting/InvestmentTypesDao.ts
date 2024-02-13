import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class InvestmentTypesDao {
  get = async () => {
    const query: Prisma.investment_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.investment_types.findMany(query);
    return generateRes(data);
  };
}

export default InvestmentTypesDao;
