import { PrismaClient, bill_stages, receipt_types } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const bill_stages_seeder = async () => {
  ///////////////// Receipt Types ////////////////////////
  



  const records : bill_stages[]  = [];

  const names = ["Stage1", "Stage2", "Stage3"];
  
  for(let i=0;i<names.length;i++){
    records.push({
      id: i+1,
      name: names[i],
      remark: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent()
    });
  }


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