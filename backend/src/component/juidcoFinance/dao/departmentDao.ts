import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DepartmentDao {
get = async () => {
    return prisma.departments.findMany({
        select:{
            id:true, 
            name:true
        }
    });
}
}

export default DepartmentDao;