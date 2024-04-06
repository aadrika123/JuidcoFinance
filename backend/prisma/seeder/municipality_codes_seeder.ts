import { PrismaClient, account_codes } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";


const prisma = new PrismaClient();
const municipality_codes_seeder = async () => {
    console.log("Seeding municipality codes ...");

    const acc_codes = await prisma.$queryRaw<account_codes[]>`SELECT id FROM account_codes`;
    if (!acc_codes){
      return;
    }

    const file_path = "./prisma/data/municipality-codes.xlsx";

    readXlsxFile(file_path).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.municipality_codes.create({
            data: {
                ulbs: row[1].toString(),
                district: row[2].toString(),
                state_code: row[3].toString(),
                district_code: row[4].toString(),
                category: row[5].toString(),
                code: row[6].toString(),
                account_codes:{
                  connect: acc_codes
                }
            },
          });

        }
      });



    

};
export default municipality_codes_seeder;