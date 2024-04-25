import { PrismaClient, bill_stages } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { BillStages } from "jflib";

const prisma = new PrismaClient();

const bill_stages_seeder = async () => {
  ///////////////// Receipt Types ////////////////////////

  const records: bill_stages[] = [];

  function formatString(inputString: string) {
    return inputString.replace(/([A-Z])/g, ' $1').trim();
}

  Object.keys(BillStages).forEach((item) => {
    records.push({
      id: Number(BillStages[item as keyof typeof BillStages]),
      name: formatString(item),
      remark: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  });

  for (const item of records) {
    await prisma.bill_stages.create({
      data: {
        id: item.id, 
        name: item.name,
        remark: item.remark,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
  }
};

export default bill_stages_seeder;
