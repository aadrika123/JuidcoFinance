import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";

const prisma = new PrismaClient();
class VoucherSubTypeDao {
  get = async () => {
    const data = prisma.voucher_sub_types.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return generateRes(data);
  };
}

export default VoucherSubTypeDao;
