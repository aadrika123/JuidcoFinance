import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const voucher_types_seed = async () => {

    const file_path = "./prisma/data/sprint1/voucher_entries.xlsx";

    readXlsxFile(file_path, { sheet: 'Voucher Type' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 0; i < n; i++) {
          const row = rows[i];

          await prisma.voucher_types.create({
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
export default voucher_types_seed;

