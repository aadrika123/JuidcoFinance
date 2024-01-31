import { PrismaClient, subledgers } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const subledgers_seeder = async () => {
  ///////////////// Subledgers ////////////////////////
  



  const records : subledgers[]  = [];

  const names = [
    "Venu Builders",
    "Rakesh Catering",
    "Prince Movies"
  ];
  
  for(let i=0;i<names.length;i++){
    records.push({
      id: i,
      name: names[i],
      remark: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent()
    });
  }


  for (const item of records) {
    await prisma.subledgers.create({
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

export default subledgers_seeder;
