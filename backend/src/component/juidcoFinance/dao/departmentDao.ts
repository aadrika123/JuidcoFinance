import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DepartmentDao {
get = async () => {
    return prisma.department.findMany();
}
}

export default DepartmentDao;