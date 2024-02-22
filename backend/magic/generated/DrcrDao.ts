import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DrcrDao {
  get = async () => {
    const query: Prisma.drcrFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.drcr.findMany(query);
    return generateRes(data);
  };
}

export default DrcrDao;
