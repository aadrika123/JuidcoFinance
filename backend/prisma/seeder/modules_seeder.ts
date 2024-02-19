import { PrismaClient, modules } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const modules_seeder = async () => {
  ///////////////// Modules ////////////////////////
  
  const file_path = "./prisma/data/module-names.xlsx";


  readXlsxFile(file_path).then(async (rows) => {
    const n = rows.length;
    for (let i = 1; i < n; i++) {
      const row = rows[i];
      const record = {
        data: {
          // id: parseInt(row[0].toString()),
          name: row[1].toString(),
          remark: faker.lorem.sentence(),
          created_at: faker.date.past(),
          updated_at: faker.date.recent(),
        },
      };

      await prisma.$transaction([
          prisma.modules.create(record)
      ]);
    }
  });
};

export default modules_seeder;
