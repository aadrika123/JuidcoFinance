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
                address: faker.location.streetAddress(),
                payee_id: 1,
                adminis_ward_id: 1,
                bill_amount: faker.number.int(),
                advance: faker.number.int(),
                deposit: faker.number.int(),
                deductions_amount: faker.number.int(),
                earlier_payment: faker.number.int(),
                payable_amount: faker.number.int(),
                net_amount: faker.number.int(),
                is_approved: false,
                created_at: faker.date.past(),
                updated_at: faker.date.recent(),
            },
          });
        }
      });
};
export default bill_payment_entry_seed;

