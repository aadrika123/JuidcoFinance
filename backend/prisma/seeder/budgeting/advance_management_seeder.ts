import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const advance_management_seeder = async () => {
  const number_of_records = 10;
  for (let i = 0; i < number_of_records; i++) {
    const record = {
      ulb_id: 1,
      primary_acc_code_id: 1,
      serial_no_of_estimate: faker.string.alphanumeric(6),
      work_order_no: faker.string.alphanumeric(6),
      work_name: faker.word.sample(),
      work_nature: faker.word.sample(),
      contract_amount: faker.number.int(),
      contractor_name: faker.person.fullName(),
      order_sanctioning_the_contract_no: faker.string.alphanumeric(6),
      order_sanctioning_the_contract_resolution_date: faker.date.past(),
      order_sanctioning_the_estimate_no: faker.string.alphanumeric(6),
      order_sanctioning_the_estimate_date: faker.date.past(),
      voucher_no: faker.string.alphanumeric(6),
      date: faker.date.past(),
      amount: faker.number.int(),
      officer_id: 1,
      bill_no: faker.string.alphanumeric(6),
      bill_date: faker.date.past(),
      payable_amount: faker.number.int(),
      approved_amount: faker.number.int(),
      cumulative_approved_amount: faker.number.int(),
      pwd_officer_id: 1,
      security_deposit_deducted_amount: faker.number.int(),
      tds_amount: faker.number.int(),
      work_contract_tax_amount: faker.number.int(),
      material_issued_recovery_amount: faker.number.int(),
      advance_provided_recovery_amount: faker.number.int(),
      other_deduction_amount: faker.number.int(),
      net_paid_amount: faker.number.int(),
      department_id: 1,
      remarks: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
    await prisma.advance_managements.create({ data: record });
  }
};
export default advance_management_seeder;
