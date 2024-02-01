import { faker } from "@faker-js/faker";
import { PrismaClient, voucher_entries } from "@prisma/client";

const prisma = new PrismaClient();

const voucher_entries_seed = async () => {
  function createRandomVoucherEntries(): voucher_entries {
    return {
      id: faker.datatype.number(),
      voucher_no: faker.datatype.number(),
      voucher_date: faker.date.past().toISOString(),
      voucher_type_id: faker.datatype.number(),
      narration: faker.lorem.sentence(),
      department_id: faker.datatype.number(),
      adminis_ward_id: faker.datatype.number(),
      voucher_sub_id: faker.datatype.number(),
      amount: faker.datatype.number(),
      dr_cr: faker.datatype.number(),
      total: faker.datatype.number(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent()
    };
  }

  const voucherEntry = faker.helpers.multiple(createRandomVoucherEntries, {
    count: 20,
  });

  let id = 1;
  for (const item of voucherEntry) {
    await prisma.voucher_entries.create({
      data: {
        id: id,
        voucher_no: item.voucher_no,
        voucher_date: item.voucher_date,
        voucher_type_id: 1,
        narration: item.narration,
        department_id: 1,
        adminis_ward_id: 1,
        voucher_sub_id: 1,
        amount: item.amount,
        dr_cr: item.dr_cr,
        total: item.total,
        created_at: item.created_at,
        updated_at: item.updated_at
      },
    });
    id++;
  }
};

export default voucher_entries_seed;
