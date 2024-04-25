import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const bills_seeder = async () => {
//   const number_of_records = 20;
//   for (let i = 0; i < number_of_records; i++) {
//     const record = {
//       ulb_id: 1,
//       bill_no: 'BN-'+`${i}`.padStart(5, "0"),
//       bill_date: faker.date.recent(),
//       party_name: faker.person.fullName(),
//       particulars: faker.person.jobArea(),
//       amount: 10.0,
//       remarks: faker.finance.transactionDescription(),
//     };
//     await prisma.bills.create({ data: record });
//  }
};
export default bills_seeder;
