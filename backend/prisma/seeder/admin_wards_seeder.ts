import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const admin_wards_seeder = async () => {

    const file_path = "./prisma/data/sprint1/cheque_issuance.xlsx";

    readXlsxFile(file_path, { sheet: 'Administartion Ward' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.adminis_wards.create({
            data: {
                name: row[3].toString(),
                remark: row[2].toString(),
                created_at: faker.date.past(),
                updated_at: faker.date.recent(),
            },
          });
        }
      });
};
export default admin_wards_seeder;

