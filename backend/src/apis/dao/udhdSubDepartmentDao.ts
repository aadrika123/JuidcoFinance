import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../util/generateRes";

const prisma = new PrismaClient();

class UDHDSubDepartmentDao {
  //// Get All UDHD Sub Departments
  async getAll() {
    const data = await prisma.udhd_sub_departments.findMany({
        select:{
            id: true,
            name: true,
        },
    });

    return generateRes(data);
  }

  //// Get All Designation based on UDHD sub departments
  async getAllDesignation(udhd_id: number) {
    const data = await prisma.designations.findMany({
      where: {
        udhd_id,
      },
      select:{
        id: true,
        name: true
      },
      orderBy: {
        id:'asc'
      }
    });

    return generateRes(data);
  }
}

export default UDHDSubDepartmentDao;
