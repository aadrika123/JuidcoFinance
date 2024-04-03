import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class BankTypesDao {
  get = async () => {
    const query: Prisma.bank_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
      orderBy:{
        id: 'asc'
      }
    };
    const data = prisma.bank_types.findMany(query);
    return generateRes(data);
  };
}

export default BankTypesDao;
