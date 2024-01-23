import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class FunctionCodeDao {
  get = async (page: number, limit: number) => {
    const query: Prisma.function_codesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        group: true,
        description_code: true,
        cost_center: true,
        description: true,
      },
    };
    const [data, count] = await prisma.$transaction([
      prisma.function_codes.findMany(query),
      prisma.function_codes.count(),
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
