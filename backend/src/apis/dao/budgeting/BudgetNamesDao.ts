import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class BudgetNamesDao {
  get = async () => {
    const query: Prisma.budget_namesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.budget_names.findMany(query);
    return generateRes(data);
  };
}

export default BudgetNamesDao;
