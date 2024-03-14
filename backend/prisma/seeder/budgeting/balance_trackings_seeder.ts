import { PrismaClient, account_codes } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const balance_trackings_seeder = async () => {

    const acc_codes = await prisma.$queryRaw<account_codes[]>`SELECT * FROM account_codes`;
    if (!acc_codes){
      return;
    }

    for (let i = 0; i < acc_codes.length; i++) {

        const date1 = faker.date.between({ from: '2022-04-01T00:00:00.000Z', to: '2023-03-30T00:00:00.000Z' });
        const record1 = {
            primary_acc_code_id: acc_codes[i].id,
            total_balance: faker.datatype.float({ min: -100000000, max: 100000000 }),
            debit_balance: faker.datatype.number(),
            credit_balance: faker.datatype.number(),
            created_at: date1,
            updated_at: date1
        };
        await prisma.balance_trackings.create({ data: record1 });
    }

    
    for(let i=0;i<acc_codes.length;i++){
        const date2 =  faker.date.between({ from: '2023-04-01T00:00:00.000Z', to: '2024-03-30T00:00:00.000Z' });
        const record2 = {
            primary_acc_code_id: acc_codes[i].id,
            total_balance: faker.datatype.float({ min: -100000000, max: 100000000 }),
            debit_balance: faker.datatype.number(),
            credit_balance: faker.datatype.number(),
            created_at: date2,
            updated_at: date2
        };
        await prisma.balance_trackings.create({ data: record2 });
    }

    for(let i=0;i<acc_codes.length;i++){
        const date2 =  faker.date.between({ from: '2024-04-01T00:00:00.000Z', to: '2025-03-30T00:00:00.000Z' });
        const record2 = {
            primary_acc_code_id: acc_codes[i].id,
            total_balance: faker.datatype.float({ min: -100000000, max: 100000000 }),
            debit_balance: faker.datatype.number(),
            credit_balance: faker.datatype.number(),
            created_at: date2,
            updated_at: date2
        };
        await prisma.balance_trackings.create({ data: record2 });
    }
};

export default balance_trackings_seeder;