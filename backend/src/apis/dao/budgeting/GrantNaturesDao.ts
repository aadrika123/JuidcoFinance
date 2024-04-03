import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class GrantNaturesDao {
  get = async () => {
    const query: Prisma.grant_naturesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.grant_natures.findMany(query);
    return generateRes(data);
  };
}

export default GrantNaturesDao;
