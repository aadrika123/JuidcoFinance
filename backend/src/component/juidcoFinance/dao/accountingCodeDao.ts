import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -> Belongs to Chart of Accounts
class AccountingCodeDao {
  get = async () => {
    return await prisma.account_code.findMany({
      skip: 0,
      take: 9,
    });
  };
}

export default AccountingCodeDao;
