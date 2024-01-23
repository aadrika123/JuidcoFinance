import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class VendorTypeDao {
  // Get all vendor type
  get = async () => {
    const query: Prisma.vendor_typesFindManyArgs = {
      select: {
        id: true,
        name: true,
      },
    };
    return prisma.vendor_types.findMany(query);
  };
}

export default VendorTypeDao;
