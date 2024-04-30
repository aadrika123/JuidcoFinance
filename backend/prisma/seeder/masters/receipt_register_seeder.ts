import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const receipt_register_seeder = async () => {
  const number_of_records = 20;
  for (let i = 0; i < number_of_records; i++) {
    const record = {
      receipt_no: faker.string.alphanumeric(6),
      ulb_id: 1,
      primary_acc_code_id: 1,
      revenue_module_id: 1,
      paid_by: faker.person.fullName(),
      receipt_mode_id: 1,
      receipt_date: faker.date.past(),
      cheque_or_draft_no: faker.string.numeric(8),
      bank_amount: faker.number.int(4),
      cash_amount: faker.number.int(4),
      bank_acc_no: String(faker.number.int(8)),
      deposit_date: faker.date.past(),
      realisation_date: faker.date.past(),
      revenue_accounted_type_id: 1,
      wheather_returned: false,
      remarks: faker.lorem.sentence(),
      entered_by_id: 1,
      entered_by_print_name: faker.person.fullName(),
      checked_by_id: 2,
      checked_by_print_name: faker.person.fullName(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
    await prisma.receipt_registers.create({ data: record });
  }
};
export default receipt_register_seeder;
