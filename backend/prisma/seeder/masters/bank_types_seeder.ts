import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const bank_types_seeder = async () => {
  // const items = [
  //   "4502100 - Nationalized Banks - Municipal Fund",
  //   "4502200 - Other Schedule Banks - Municipal Fund",
  //   "4502300 - Schedule Co-operative Banks - Municipal Fund",
  // ];

  const codeItems: number[] = [
    4502100,
    4502200,
    4502300,
    4502400,
    4502500,
    4504100,
    4504200,
    4504300,
    4504400,
    4504500,
    4506100,
    4506200,
    4506300,
    4506400,
    4506500
  ];




  codeItems.forEach(async (item, i) => {
    const data: any = await prisma.account_codes.findFirst({
      where: {
        code: ""+codeItems[i],
      },
    });

    console.log(data);

    const record = {
      id: i + 1,
      primary_acc_code_id: data.id,
      name: `${data.code} ${data.description}`,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
    await prisma.bank_types.create({ data: record });
  });
};
export default bank_types_seeder;
