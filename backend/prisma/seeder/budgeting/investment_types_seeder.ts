import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";


const prisma = new PrismaClient();
const investment_types_seeder = async () => {

    const file_path = "./prisma/data/sprint2/investments.xlsx";

    readXlsxFile(file_path, { sheet: 'Type of Investment' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
          const row = rows[i];

          await prisma.investment_types.create({
            data: {
                name: row[0].toString(),
                remarks: row[0].toString(),
            },
          });
        }
      });

};
export default investment_types_seeder;