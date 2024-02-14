import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const bill_payment_entry_seed = async () => {

    const file_path = "./prisma/data/sprint1/bill_payment_entries.xlsx";

    readXlsxFile(file_path, { sheet: 'Bill Number' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.bill_payment_entries.create({
            data: {
                bill_no: row[0].toString(),
                bill_type_id: 1,
                bill_entry_date: faker.date.recent(),
                department_id: 1,
                vendor_id: 1,
                address: faker.address.streetAddress(),
                payee_id: 1,
                adminis_ward_id: 1,
                bill_amount: faker.datatype.number(),
                advance: faker.datatype.number(),
                deposit: faker.datatype.number(),
                deductions_amount: faker.datatype.number(),
                earlier_payment: faker.datatype.number(),
                payable_amount: faker.datatype.number(),
                net_amount: faker.datatype.number(),
                is_approved: false,
                created_at: faker.date.past(),
                updated_at: faker.date.recent(),
            },
          });
        }
      });
};
export default bill_payment_entry_seed;

