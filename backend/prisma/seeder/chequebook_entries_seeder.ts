import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
export const chequebook_entries_seeder = async () => {

  const recordCount = 20;

  for (let i=0;i<recordCount;i++) {
    await prisma.cheque_book_entries.create({
      data: {
        date: faker.date.recent(),
        
        bank_id: 1,

        bank_account_no: faker.finance.accountNumber(),
        cheque_no_from: faker.finance.creditCardNumber(),
        user_id: 1, //item.employee_id,
        bank_branch: faker.location.city(),
        page_count: 20, // assuming page_count is a string
        cheque_no_to: faker.finance.creditCardNumber(),
        issuer_name: faker.person.fullName(),
        cheque_book_return: faker.datatype.boolean(),
          cheque_book_return_date: faker.date.future(),
        remarks: faker.lorem.sentence(),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  }
};