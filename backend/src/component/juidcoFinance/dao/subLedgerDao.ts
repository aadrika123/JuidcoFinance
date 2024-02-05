import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();
class SubLedgerDao {
  get = async () => {
    const data = prisma.sub_ledger.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return generateRes(data);
  };
}

export default SubLedgerDao;
