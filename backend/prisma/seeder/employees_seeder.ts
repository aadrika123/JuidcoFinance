import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const employees_seeder = async () => {

    const file_path = "./prisma/data/sprint1/cheque_issuance.xlsx";

    readXlsxFile(file_path, { sheet: 'Payee names' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.employees.create({
            data: {
                name: row[0].toString(),
                email: faker.internet.email(),
                designation: faker.name.jobTitle(),
                created_at: faker.date.past(),
                updated_at: faker.date.recent(),
            },
          });
        }
      });
};
export default employees_seeder;

