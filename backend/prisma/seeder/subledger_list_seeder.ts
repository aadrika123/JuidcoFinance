import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const subledgers_seeder = async () => {
  ///////////////// Subledgers ////////////////////////
  
  const names = [
    "Venu Builders",
    "Rakesh Catering",
    "Prince Movies"
  ];
  
  for(let i=0;i<names.length;i++){
    const item = {
      id: i+1,
      name: names[i],
      remark: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent()
    };

    await prisma.subledgers.create({
      data: item
    });
  }

};

export default subledgers_seeder;
