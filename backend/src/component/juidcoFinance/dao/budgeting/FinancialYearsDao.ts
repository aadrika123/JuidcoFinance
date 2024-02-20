import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../../util/generateRes";

const prisma = new PrismaClient();

class FinancialYearsDao {
  get = async () => {
    const query: Prisma.financial_yearsFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = await prisma.financial_years.findMany(query);
    return generateRes(data);
  };
}

export default FinancialYearsDao;
