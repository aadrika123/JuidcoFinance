import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const advance_management_seeder = async () => {
  const number_of_records = 10;
  for (let i = 0; i < number_of_records; i++) {
    const record = {
      ulb_id: 1,
      primary_acc_code_id: 1,
      serial_no_of_estimate: faker.random.alphaNumeric(6),
      work_order_no: faker.random.alphaNumeric(6),
      work_name: faker.random.word(),
      work_nature: faker.random.word(),
      contract_amount: faker.datatype.number(),
      contractor_name: faker.person.fullName(),
      order_sanctioning_the_contract_no: faker.random.alphaNumeric(6),
      order_sanctioning_the_contract_resolution_date: faker.date.past(),
      order_sanctioning_the_estimate_no: faker.random.alphaNumeric(6),
      order_sanctioning_the_estimate_date: faker.date.past(),
      voucher_no: faker.random.alphaNumeric(6),
      date: faker.date.past(),
      amount: faker.datatype.number(),
      officer_id: 1,
      bill_no: faker.random.alphaNumeric(6),
      bill_date: faker.date.past(),
      payable_amount: faker.datatype.number(),
      approved_amount: faker.datatype.number(),
      cumulative_approved_amount: faker.datatype.number(),
      pwd_officer_id: 1,
      security_deposit_deducted_amount: faker.datatype.number(),
      tds_amount: faker.datatype.number(),
      work_contract_tax_amount: faker.datatype.number(),
      material_issued_recovery_amount: faker.datatype.number(),
      advance_provided_recovery_amount: faker.datatype.number(),
      other_deduction_amount: faker.datatype.number(),
      net_paid_amount: faker.datatype.number(),
      department_id: 1,
      remarks: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
    await prisma.advance_managements.create({ data: record });
  }
};
export default advance_management_seeder;
