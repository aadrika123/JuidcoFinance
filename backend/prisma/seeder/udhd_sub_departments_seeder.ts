import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const udhd_sub_departments_seeder = async () => {
  const file_path = "./prisma/data/sprint1/cheque_issuance.xlsx";

  const udhds = ["JUIDCO", "SUDA", "ULB", "HD"];
  udhds.forEach(async (item) => {
    await prisma.udhd_sub_departments.create({
      data: {
        name: item.toString(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });
};
export default udhd_sub_departments_seeder;
