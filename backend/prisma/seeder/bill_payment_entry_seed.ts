import { PrismaClient, bill_payment_entries } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const bill_payment_entry_seed = async () => {
  ///////////////// Direct Payment Entry ////////////////////////
  function createRandomBillPaymentEntry(): bill_payment_entries {
    return {
      id: faker.datatype.number(),
      bill_no: "1",
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
    };
  }

  const billPaymentEntries = faker.helpers.multiple(
    createRandomBillPaymentEntry,
    {
      count: 20,
    }
  );

  await prisma.bill_payment_entries.createMany({
    data: billPaymentEntries,
  });
};

export default bill_payment_entry_seed;
