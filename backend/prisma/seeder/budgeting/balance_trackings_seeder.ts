import { PrismaClient, account_codes, municipality_codes } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
const balance_trackings_seeder = async () => {

    console.log("Seeding balance trackings ...");

    const acc_codes = await prisma.$queryRaw<account_codes[]>`SELECT id FROM account_codes`;
    if (!acc_codes){
      return;
    }


    const ulbs = await prisma.$queryRaw<municipality_codes[]>`SELECT id FROM municipality_codes`;
    if (!ulbs){
      return;
    }


    const finYears = [2020, 2021, 2022, 2023, 2024];

    
    const dummyBalances = [0, 100000.50, -10000.34];

    finYears.forEach(async (year) => {
        for(let u=0;u<ulbs.length;u++){

            const records: any = [];

            for (let i = 0; i < acc_codes.length; i++) {
                const date1 = faker.date.between({ from: `${year}-04-05T00:00:00.000Z`, to: `${year+1}-03-20T00:00:00.000Z` });
                // const balance = i%10 == 0 ? 0 : faker.number.float({ min: -100000000, max: 100000000 });
                // const balance = dummyBalances[i%dummyBalances.length];
                // const balance = 0;
                
                const record = {
                    primary_acc_code_id: acc_codes[i].id,
                    total_balance: 0,
                    debit_balance: 0,
                    credit_balance: 0,
                    ulb_id: ulbs[u].id,
                    created_at: date1,
                    updated_at: date1
                };

                records.push(record);
            }

            await prisma.balance_trackings.createMany({ data: records });
        }
    
    });

    


};

export default balance_trackings_seeder;