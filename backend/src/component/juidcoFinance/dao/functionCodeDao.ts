import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class FunctionCodeDao {
  get = async (page:number, limit:number) => {
    const query = {
      skip: (page - 1) * limit,
      take: limit,
    };
    const [data, count] = await prisma.$transaction([
      prisma.function_code.findMany(query),
      prisma.function_code.count(),
    ]);
    return {
      currentPage: page,
      count,
      totalPage: Math.ceil(count / limit),
      data,
    };
  };
}

export default FunctionCodeDao;
