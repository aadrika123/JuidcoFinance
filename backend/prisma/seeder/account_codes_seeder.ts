import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";
  

const prisma = new PrismaClient();

const account_codes_seeder = async () => {
    const file_path = "./prisma/data/chart_of_accounts.xlsx";

    readXlsxFile(file_path, { sheet: 'Sheet6' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];
          //console.log(row);

          if(row && row[0] && row[7]){


            const majorHead = row[0].toString() + row[1].toString();
            const minorHead = row[2].toString() + row[3].toString();
            const detailCode = row[4].toString() + row[5].toString() + row[6].toString();
            const code = majorHead + minorHead + detailCode;
            const description = majorHead + minorHead + detailCode + " " +row[7].toString();
  
            await prisma.account_codes.create({
              data: {
                  code: code,
                  major_head: majorHead,
                  minor_head: minorHead,
                  detail_code: detailCode,
                  description: description,
                  created_at: faker.date.past(),
                  updated_at: faker.date.recent(),
              },
            });

          }
          

        }
      });
}

export default account_codes_seeder;