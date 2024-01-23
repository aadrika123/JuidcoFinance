import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class MuncipalityCodeDao {
  // Get limited muncipilaty code
  get = async (page: number, limit: number) => {
    const query: Prisma.municipality_codesFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        ulbs: true,
        district: true,
        state_code: true,
        district_code: true,
        category: true,
        code: true,
      },
    };
    const [data, count] = await prisma.$transaction([
      prisma.municipality_codes.findMany(query),
      prisma.municipality_codes.count(),
    ]);
    return {
      currentPage: page,
      count,
      totalPage: Math.ceil(count / limit),
      data,
    };
  };
}

export default MuncipalityCodeDao;
