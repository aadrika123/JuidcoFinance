import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const voucher_entries_seed = async () => {

    const file_path = "./prisma/data/sprint2/grant_entries.xlsx";

    readXlsxFile(file_path, { sheet: 'Voucher No.' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 0; i < n; i++) {
          const row = rows[i];

          await prisma.voucher_entries.create({
            data: {
              voucher_no: row[0].toString(),
              voucher_date: faker.date.recent(),
              voucher_type_id: 1,
              narration: faker.lorem.sentence(),
              department_id: 1,
              adminis_ward_id: 1,
              voucher_sub_id: 1,
              sub_ledger_id: 1,
              amount: faker.datatype.number(),
              dr_cr_id: 1,
            },
          });
        }
      });

};
export default voucher_entries_seed;


