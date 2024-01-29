import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class GrantDao {
  get = async () => {
    const query: Prisma.grantsFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.grants.findMany(query);
    return generateRes(data);
  };
}

export default GrantDao;
