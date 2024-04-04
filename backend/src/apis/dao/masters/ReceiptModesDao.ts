import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();

class ReceiptModesDao {
  get = async () => {
    const query: Prisma.receipt_modesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    const data = prisma.receipt_modes.findMany(query);
    return generateRes(data);
  };
}

export default ReceiptModesDao;
