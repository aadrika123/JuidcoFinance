import { PrismaClient } from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";


const prisma = new PrismaClient();

const isSchedule = (majorHead: string, minorHead: string, detailCode: string) => {
    return majorHead[majorHead.length - 1] == "0" && detailCode == "00" && minorHead == "00";
}

const isGeneralLedger = (detailCode: string, minorHead: string) => {
    return detailCode == "00" && minorHead != "00";
}


const account_codes_seeder = async () => {
    const file_path = "./prisma/data/chart_of_accounts.xlsx";

    const schedules = new Map();

    const generalLedgers = new Map();

    readXlsxFile(file_path, { sheet: 'Primary Accouting Code' }).then(async (rows) => {
        const n = rows.length;
        
        let scheduleNumber = 1;

        for (let i = 1; i < n; i++) {
            const row = rows[i];
            //console.log(row);

            if (row && row[0] && row[7]) {

                if (row[7].toString().trim().length == 0) // skip empty cells
                    continue;

                const majorHead = row[0].toString() + row[1].toString() + row[2].toString();
                const minorHead = row[3].toString() + row[4].toString();
                const detailCode = row[5].toString() + row[6].toString();
                const code = majorHead + minorHead + detailCode;
                const description = row[7].toString();//majorHead + minorHead + detailCode + " " + row[7].toString();

                if (!row[7].toString().startsWith("The detailed Head codes from")) {
                    // if(detailCode == "00" && minorHead == "00"){
                    //     // ignore
                    // }
                    // else
                    if (isSchedule(majorHead, minorHead, detailCode)) {
                        const x = await prisma.account_codes.create({
                            data: {
                                code: code,
                                code_type_id: 1,
                                major_head: majorHead,
                                minor_head: minorHead,
                                detail_code: detailCode,
                                description: `Schedule I-${scheduleNumber}: ${description}`,
                                created_at: faker.date.past(),
                                updated_at: faker.date.recent(),
                            },
                        });

                        schedules.set(code, x);
                        scheduleNumber ++;
                    }
                    else if (isGeneralLedger(detailCode, minorHead)) {

                        const parent = schedules.get(majorHead.substring(0, majorHead.length-1) + "0" + "00" + "00");
                        if (parent == undefined) {
                            // console.log("No parent found");
                        } else {

                            const id: number = parent.id;

                            const x = await prisma.account_codes.create({
                                data: {
                                    code: code,
                                    code_type_id: 2,
                                    major_head: majorHead,
                                    minor_head: minorHead,
                                    detail_code: detailCode,
                                    description: description,
                                    parent_id: id,
                                    created_at: faker.date.past(),
                                    updated_at: faker.date.recent(),
                                },
                            });

                            generalLedgers.set(code, x);

                        }
                    } else {

                        const parent = generalLedgers.get(majorHead + minorHead + "00");
                        if (parent == undefined) {
                            // console.log("No parent found");
                        } else {

                            const id: number = parent.id;

                            await prisma.account_codes.create({
                                data: {
                                    code: code,
                                    code_type_id: 3,
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