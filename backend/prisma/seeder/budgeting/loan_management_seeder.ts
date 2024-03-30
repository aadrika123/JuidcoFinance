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
      loan_no: faker.random.alphaNumeric(8),
      loan_sanctioned_amount: faker.datatype.number(),
      interest_rate: faker.datatype.number(),
      instalments_no: faker.datatype.number(),
      instalment_amount: faker.datatype.number(),
      receipt_date: faker.date.past(),
      received_amount: faker.datatype.number(),
      total_received_amount: faker.datatype.number(),
      repayment_due_date: faker.date.past(),
      principal_amount: faker.datatype.number(),
      interest_amount: faker.datatype.number(),
      total_due_amount_to_repayment: faker.datatype.number(),
      officer_id: 1,
      repaid_principal_amount: faker.datatype.number(),
      repaid_repayment_date: faker.date.past(),
      repaid_interest: faker.datatype.number(),
      repaid_total_amount: faker.datatype.number(),
      balance_principal_amount: faker.datatype.number(),
      balance_interest: faker.datatype.number(),
      balance_total_amount: faker.datatype.number(),
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
