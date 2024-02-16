import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";
  

const prisma = new PrismaClient();

const function_codes_seeder = async () => {
    const file_path = "./prisma/data/chart_of_accounts.xlsx";

    readXlsxFile(file_path, { sheet: 'Function Codes' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];
          //console.log(row);

          if(row && row[0]){


            const group = row[0].toString() + row[1].toString();
            const description_code = row[2].toString() + row[3].toString();
            const code_center = row[4].toString() + row[5].toString();
            const description = group + description_code + code_center + " " + row[6].toString();
  
            await prisma.function_codes.create({
              data: {
                  group: group,
                  description_code: description_code,
                  code_center: code_center,  
                  description: description,
                  created_at: faker.date.past(),
                  updated_at: faker.date.recent(),
              },
            });

          }
          

        }
      });
}

export default function_codes_seeder;