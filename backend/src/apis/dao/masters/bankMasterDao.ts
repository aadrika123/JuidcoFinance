import { Prisma, PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { BankMasterValidation } from "jflib";

const prisma = new PrismaClient();

class BankMasterDao {

  // store bank details in DB
  store = async (data: any) => {
    return await prisma.bank_masters.create({
      data: BankMasterValidation.requestData(data),
    });
  };

  // Get limited bank master
  get = async (page: number, limit: number, search: string, order: number) => {
    
    const query: Prisma.bank_mastersFindManyArgs = {
      orderBy: [
        { updated_at: order == -1 ? "desc" : "asc" }
      ],

      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        bank:{
          select: {
            id: true,
            name: true,  
          }
        },
        ifsc_code: true,
        branch: true,
      },
    };

    if (search !== "undefined" && search !== "") {
      query.where = {
        OR: [
          {
            bank: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          { ifsc_code: { contains: search, mode: "insensitive" } },
          { branch: { contains: search, mode: "insensitive" } }

        ],
      }
    }

    const [data, count] = await prisma.$transaction([
      prisma.bank_masters.findMany(query),
      prisma.bank_masters.count({ where: query.where }),
    ]);
    return generateRes(data, count, page, limit);
  };

  // Get single bank details
  getById = async (id: number) => {

    const query: Prisma.bank_mastersFindManyArgs = {
      where: { id },
      select: {
        id: true,
        bank:{
          select: {
            id: true,
            name: true,  
          }
        },
        ifsc_code: true,
        branch: true,
        micr_code: true,
        branch_address: true,
        branch_city: true,
        branch_state: true,
        branch_district: true,
        email: true,
        contact_no: true,
        ulb:{
          select:{
            id: true,
            ulbs: true
          }
        },
        bank_type:{
          select:{
            id: true,
            name: true
          }
        }
      },
    };
    const data = await prisma.bank_masters.findFirst(query);
    return generateRes(data);
  };

  // Update bank details
  update = async (data: any) => {

    const id: number = data.id;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [copy, record] = await prisma.$transaction([

      prisma.$queryRaw`insert into bank_masters_history select * from bank_masters where id=${id}`,

      prisma.bank_masters.update({
        where: {
          id: id,
        },
        data: data,
      }),
    ])

    return record;
  }
}

export default BankMasterDao;
