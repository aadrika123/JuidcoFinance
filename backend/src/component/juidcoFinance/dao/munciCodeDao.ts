import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class MuncipalityCodeDao {

  // Get limited muncipilaty code
  get = async (page:number, limit: number) => {
    const query = {
      skip: (page - 1) * limit,
      take: limit,
    };
    const [data, count] = await prisma.$transaction([
      prisma.municipality_code.findMany(query),
      prisma.municipality_code.count(),
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
