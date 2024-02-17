import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";


const prisma = new PrismaClient();

const isParent = (detailCode: string, minorHead: string) => {
    return detailCode == "00" && minorHead != "00";
}


const account_codes_seeder = async () => {
    const file_path = "./prisma/data/chart_of_accounts.xlsx";

    const parents = new Map();

    readXlsxFile(file_path, { sheet: 'Primary Accouting Code' }).then(async (rows) => {
        const n = rows.length;
        for (let i = 1; i < n; i++) {
            const row = rows[i];
            //console.log(row);

            if (row && row[0] && row[7]) {

                const majorHead = row[0].toString() + row[1].toString() + row[2].toString();
                const minorHead = row[3].toString() + row[4].toString();
                const detailCode = row[5].toString() + row[6].toString();
                const code = majorHead + minorHead + detailCode;
                const description = majorHead + minorHead + detailCode + " " + row[7].toString();

                if (!row[7].toString().startsWith("The detailed Head codes from")) {
                    if(detailCode == "00" && minorHead == "00"){
                        // ignore
                    }
                    else if (isParent(detailCode, minorHead)){
                        const x = await prisma.account_codes.create({
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

                        parents.set(code, x);
                    }else{

                        const parent = parents.get(majorHead + minorHead + "00");
                        if(parent == undefined){
                            // console.log("No parent found");
                        }else{

                            const id:number = parent.id;
                        
                            await prisma.account_codes.create({
                                data: {
                                    code: code,
                                    major_head: majorHead,
                                    minor_head: minorHead,
                                    detail_code: detailCode,
                                    description: description,
                                    parent_id: id,
                                    created_at: faker.date.past(),
                                    updated_at: faker.date.recent(),
                                },
                            });
                        }

                    }

                }

            }

        }
    });
}

export default account_codes_seeder;