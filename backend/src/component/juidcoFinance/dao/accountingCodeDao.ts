import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class AccountingCodeDao {

  // Get limitted accounting codes
  get = async (page:number, limit:number) => {
    const query = {
      skip: (page - 1) * limit,
      take: limit,
    };
    const [data, count] = await prisma.$transaction([
      prisma.account_code.findMany(query),
      prisma.account_code.count(),
    ]);
    return {
      currentPage: page,
      count,
      totalPage: Math.ceil(count / limit),
      data,
    };
  };
}

export default AccountingCodeDao;
