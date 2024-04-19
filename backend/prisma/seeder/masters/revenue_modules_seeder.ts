import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

import readXlsxFile from "read-excel-file/node";

const prisma = new PrismaClient();

const revenue_modules_seeder = async () => {
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
          created_at: faker.date.past(),
          updated_at: faker.date.recent(),
        },
      };

      await prisma.$transaction([
          prisma.revenue_modules.create(record)
      ]);
    }
  });
};

export default revenue_modules_seeder;

