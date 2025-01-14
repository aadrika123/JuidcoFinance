import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";



const prisma = new PrismaClient();
const vendors_seeder = async () => {

    const file_path = "./prisma/data/sprint1/bill_payment_entries.xlsx";

    readXlsxFile(file_path, { sheet: 'Vendor Name' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 0; i < n; i++) {
          const row = rows[i];

          await prisma.vendor_masters.create({
            data: {
              vendor_type_id: 1,
              vendor_no: faker.random.alphaNumeric(8),
              name: row[0].toString(),
              mobile_no: faker.phone.number(),
              tin_no: faker.finance.routingNumber(),
              pan_no: faker.finance.account(),
              bank_id: 1,
              ifsc_code: faker.finance.routingNumber(),
              department_id: 1,
              email: faker.internet.email(),
              contact_address: faker.address.streetAddress(),
              gst_no: faker.finance.creditCardNumber(),
              aadhar_no: faker.finance.creditCardNumber(),
              bank_account_no: faker.finance.account(),
              bank_branch_name: faker.address.city(),
              authorized_date: null,
              is_authorized: false,
              created_at: faker.date.past(),
              updated_at: faker.date.recent(),
            },
          });
        }
      });

};
export default vendors_seeder;
