import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class MuncipalityCodeDao {
  get = async () => {
    return await prisma.municipality_code.findMany({
      skip: 0,
      take: 9,
    });
  };
}

export default MuncipalityCodeDao;
