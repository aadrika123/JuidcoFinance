import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const udhd_sub_departments_seeder = async () => {

  const udhds = ["JUIDCO", "SUDA", "ULB", "UDHD"];

  for(let i=0;i<udhds.length;i++){
    await prisma.udhd_sub_departments.create({
      data: {
        id: i+1,
        name: udhds[i],
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  }

};
export default udhd_sub_departments_seeder;
