import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const departments_seeder = async () => {

    const file_path = "./prisma/data/sprint1/departments.xlsx";

    readXlsxFile(file_path).then(async (rows) => {
        const n = rows.length;
        for (let i = 0; i < n; i++) {
          const row = rows[i];

          await prisma.departments.create({
            data: {
                name: row[0].toString(),
                remark: row[0].toString(),
                created_at: faker.date.past(),
                updated_at: faker.date.recent(),
            },
          });
        }
      });
};
export default departments_seeder;

