import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const subledger_list_seeder = async () => {

    const file_path = "./prisma/data/sprint1/voucher_entries.xlsx";

    readXlsxFile(file_path, { sheet: 'Sub - Ledger Code - Name' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 0; i < n; i++) {
          const row = rows[i];

          await prisma.subledgers.create({
            data: {
                name: row[0].toString(),
                remark: row[0].toString(),
                code: row[6].toString(),
                created_at: faker.date.past(),
                updated_at: faker.date.recent(),
            },
          });
        }
      });
};
export default subledger_list_seeder;

