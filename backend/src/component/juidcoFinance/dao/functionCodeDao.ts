import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class FunctionCodeDao {
  get = async () => {
    return await prisma.function_code.findMany({
      skip: 0,
      take: 9,
    });
  };
}

export default FunctionCodeDao;
