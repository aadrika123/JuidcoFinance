import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class ExpenditureNaturesDao {
  get = async () => {
    const query: Prisma.expenditure_naturesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.expenditure_natures.findMany(query);
    return generateRes(data);
  };
}

export default ExpenditureNaturesDao;
