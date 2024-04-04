import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class BudgetTypesDao {
  get = async () => {
    const query: Prisma.budget_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.budget_types.findMany(query);
    return generateRes(data);
  };
}

export default BudgetTypesDao;
