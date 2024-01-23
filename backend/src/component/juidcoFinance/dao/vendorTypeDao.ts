import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class VendorTypeDao {

  // Get all vendor type
  get = async () => {
    return prisma.vendor_type.findMany();
  };
}

export default VendorTypeDao;
