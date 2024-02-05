import { PrismaClient, bill_payment_entries } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const bill_payment_entry_seed = async () => {
  ///////////////// Direct Payment Entry ////////////////////////
  function createRandomBillPaymentEntry(): bill_payment_entries {
    return {
      id: faker.datatype.number(),
      bill_no: faker.datatype.number(),
      bill_type_id: faker.datatype.number(),
      bill_entry_date: faker.date.recent().toISOString(),
      department_id: faker.datatype.number(),
      vendor_name: faker.person.fullName(),
      address: faker.address.streetAddress(),
      payee_name_id: faker.datatype.number(),
      adminis_ward_id: faker.datatype.number(),
      bill_amount: faker.datatype.number(),
      advance: faker.datatype.number(),
      deposit: faker.datatype.number(),
      other_deductions: faker.datatype.number(),
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

  let bn = 1;
  for (const item of billPaymentEntries) {
    await prisma.bill_payment_entries.create({
      data: {
        id: item.id,
        bill_no: bn,
        bill_type_id: 1,
        bill_entry_date: item.bill_entry_date,
        department_id: 1,
        vendor_name: item.vendor_name,
        address: item.address,
        payee_name_id: 1,
        adminis_ward_id: 1,
        bill_amount: item.bill_amount,
        advance: item.advance,
        deposit: item.deposit,
        other_deductions: item.other_deductions,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
    bn++;
  }
};

export default bill_payment_entry_seed;
