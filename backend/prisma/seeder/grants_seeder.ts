import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const grants_seeder = async () => {

    const file_path = "./prisma/data/sprint1/cheque_issuance.xlsx";

    readXlsxFile(file_path, { sheet: 'Grant' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.grants.create({
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
export default grants_seeder;

