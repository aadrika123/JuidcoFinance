import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const loan_management_seeder = async () => {
  const number_of_records = 10;
  for (let i = 0; i < number_of_records; i++) {
    const record = {
      ulb_id: 1,
      primary_acc_code_id: 1,
      purpose_of_loan: faker.lorem.sentence(),
      department_id: 1,
      resolution_date: faker.date.past(),
      loan_no: faker.string.alphanumeric(8),
      loan_sanctioned_amount: faker.number.float(),
      interest_rate: faker.number.float(),
      instalments_no: faker.number.float(),
      instalment_amount: faker.number.float(),
      receipt_date: faker.date.past(),
      received_amount: faker.number.float(),
      total_received_amount: faker.number.float(),
      repayment_due_date: faker.date.past(),
      principal_amount: faker.number.float(),
      interest_amount: faker.number.float(),
      total_due_amount_to_repayment: faker.number.float(),
      officer_id: 1,
      repaid_principal_amount: faker.number.float(),
      repaid_repayment_date: faker.date.past(),
      repaid_interest: faker.number.float(),
      repaid_total_amount: faker.number.float(),
      balance_principal_amount: faker.number.float(),
      balance_interest: faker.number.float(),
      balance_total_amount: faker.number.float(),
      balance_remarks: faker.lorem.sentence(),
      user_id: 1,
      designation_id: 1,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
    await prisma.loan_managements.create({ data: record });
  }
};
export default loan_management_seeder;
