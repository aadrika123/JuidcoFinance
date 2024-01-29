import {
  PrismaClient,
  adminis_wards,
  bank_masters,
  cheque_book_entries,
  departments,
  dir_payment_entries,
  employees,
  grants,
  payment_types,
  vendor_masters,
  vendor_types,
} from "@prisma/client";
import readXlsxFile from "read-excel-file/node";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
async function main() {
  /////// Accounting Code //////////////
  const file_path = "./prisma/data/sample-accounting-code.xlsx";

  // File path.
  readXlsxFile(file_path).then(async (rows) => {
    const n = rows.length;
    for (let i = 1; i < n; i++) {
      const row = rows[i];
      await prisma.account_codes.create({
        data: {
          id: parseInt(row[0].toString()),
          major_head: row[1].toString(),
          minor_head: row[2].toString(),
          detail_code: row[3].toString(),
          description: row[4].toString(),
          remark: row[5].toString(),
        },
      });
    }
  });

  /////// Accounting Code //////////////
  const file_path1 = "./prisma/data/sample-function-code.xlsx";

  // File path.
  readXlsxFile(file_path1).then(async (rows) => {
    const n = rows.length;
    for (let i = 1; i < n; i++) {
      // console.log(rows[i]);
      const row = rows[i];
      await prisma.function_codes.create({
        data: {
          id: parseInt(row[0].toString()),
          group: row[1].toString(),
          description_code: row[2].toString(),
          cost_center: row[3].toString(),
          description: row[4].toString(),
          remark: row[5].toString(),
        },
      });
    }
  });

  /////// Municipality Code //////////////
  const file_path2 = "./prisma/data/sample-municipality-code1.xlsx";

  // File path.
  readXlsxFile(file_path2).then(async (rows) => {
    const n = rows.length;
    for (let i = 1; i < n; i++) {
      // console.log(rows[i]);
      const row = rows[i];
      await prisma.municipality_codes.create({
        data: {
          id: parseInt(row[0].toString()),
          ulbs: row[1].toString(),
          district: row[2].toString(),
          state_code: row[3].toString(),
          district_code: row[4].toString(),
          category: row[5].toString(),
          code: row[6].toString(),
          remark: row[7].toString(),
        },
      });
    }
  });

  ///////////////// department ////////////////////////
  function createRandomDepartment(): departments {
    return {
      id: faker.datatype.number(),
      name: faker.company.name(),
      remark: faker.lorem.sentence(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    };
  }

  const departments = faker.helpers.multiple(createRandomDepartment, {
    count: 5,
  });

  let id = 1;
  for (const item of departments) {
    await prisma.departments.create({
      data: {
        id: id, //item.id,
        name: item.name,
        remark: item.remark,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
    id++;
  }

  ///////////////// Vendor Type ////////////////////////
  function createRandomVendorType(): vendor_types {
    return {
      id: faker.datatype.number(),
      name: faker.company.name(),
      remark: faker.lorem.sentence(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    };
  }

  const vendorTypes = faker.helpers.multiple(createRandomVendorType, {
    count: 5,
  });

  let iv = 1;
  for (const item of vendorTypes) {
    await prisma.vendor_types.create({
      data: {
        id: iv, //item.id,
        name: item.name,
        remark: item.remark,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
    iv++;
  }

  ///////////////// Employee ////////////////////////
  function createRandomEmployee(): employees {
    return {
      id: faker.datatype.number(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    };
  }

  const employees = faker.helpers.multiple(createRandomEmployee, {
    count: 5,
  });

  let iid = 1;
  for (const item of employees) {
    await prisma.employees.create({
      data: {
        id: iid,
        name: item.name,
        email: item.email,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
    iid++;
  }

  ///////////////// Bank Master ////////////////////////
  function createRandomUser(): bank_masters {
    return {
      id: faker.datatype.number(),
      bank_name: faker.company.name(),
      ifsc_code: faker.finance.routingNumber(),
      branch: faker.company.companySuffix(),
      micr_code: faker.finance.account(),
      branch_address: faker.address.streetAddress(),
      branch_city: faker.address.city(),
      branch_state: faker.address.state(),
      branch_district: faker.address.county(),
      email: faker.internet.email(),
      contact_no: faker.phone.number(),
      contact_person_name: faker.internet.userName(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    };
  }

  const data = faker.helpers.multiple(createRandomUser, {
    count: 20,
  });

  for (const item of data) {
    await prisma.bank_masters.create({
      data: {
        id: item.id,
        bank_name: item.bank_name,
        ifsc_code: item.ifsc_code,
        branch: item.branch,
        micr_code: item.micr_code,
        branch_address: item.branch_address,
        branch_city: item.branch_city,
        branch_state: item.branch_state,
        branch_district: item.branch_district,
        email: item.email,
        contact_no: item.contact_no,
        contact_person_name: item.contact_person_name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
  }

  ///////////////// cheque_book_entry ////////////////////////
  function createRandomChequeBook(): cheque_book_entries {
    return {
      id: faker.datatype.number(),
      date: faker.date.recent(),
      bank_name: faker.company.name(),
      bank_account_no: faker.finance.account(),
      cheque_no_from: faker.finance.creditCardNumber(),
      employee_id: faker.datatype.number(),
      bank_branch: faker.address.city(),
      page_count: faker.datatype.number(), // assuming page_count is a string
      cheque_no_to: faker.finance.creditCardNumber(),
      issuer_name: faker.person.fullName(),
      cheque_book_return: faker.datatype.boolean(),
      cheque_book_return_date: faker.date.future(),
      remarks: faker.lorem.sentence(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
  }

  const chequeBooks = faker.helpers.multiple(createRandomChequeBook, {
    count: 20,
  });

  for (const item of chequeBooks) {
    await prisma.cheque_book_entries.create({
      data: {
        id: item.id,
        date: item.date,
        bank_name: item.bank_name,
        bank_account_no: item.bank_account_no,
        cheque_no_from: item.cheque_no_from,
        employee_id: 1, //item.employee_id,
        bank_branch: item.bank_branch,
        page_count: item.page_count,
        cheque_no_to: item.cheque_no_to,
        issuer_name: item.issuer_name,
        cheque_book_return: item.cheque_book_return,
        cheque_book_return_date: item.cheque_book_return_date,
        remarks: item.remarks,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
  }

  ///////////////// Vendor ////////////////////////
  function createRandomVendor(): vendor_masters {
    return {
      id: faker.datatype.number(),
      vendor_type_id: faker.datatype.number(),
      vendor_no: faker.random.alphaNumeric(8),
      name: faker.person.fullName(),
      mobile_no: faker.phone.number(),
      tin_no: faker.finance.routingNumber(),
      pan_no: faker.finance.account(),
      bank_name: faker.company.name(),
      ifsc_code: faker.finance.routingNumber(),
      department_id: faker.datatype.number(),
      email: faker.internet.email(),
      contact_address: faker.address.streetAddress(),
      gst_no: faker.finance.creditCardNumber(),
      aadhar_no: faker.finance.creditCardNumber(),
      bank_account_no: faker.finance.account(),
      bank_branch_name: faker.address.city(),
      authorized_date: null,
      is_authorized: false,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
  }

  const vendors = faker.helpers.multiple(createRandomVendor, {
    count: 20,
  });

  for (const item of vendors) {
    await prisma.vendor_masters.create({
      data: {
        id: item.id,
        vendor_type_id: 1, //item.vendor_type_id,
        vendor_no: item.vendor_no,
        name: item.name,
        mobile_no: item.mobile_no,
        tin_no: item.tin_no,
        pan_no: item.pan_no,
        bank_name: item.bank_name,
        ifsc_code: item.ifsc_code,
        department_id: 1, //item.department_id,
        email: item.email,
        contact_address: item.contact_address,
        gst_no: item.gst_no,
        aadhar_no: item.aadhar_no,
        bank_account_no: item.bank_account_no,
        bank_branch_name: item.bank_branch_name,
        authorized_date: null,
        is_authorized: false,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
  }

  ///////////////// Administrative Ward /////////////////////
  function createRandomAdminisWard(): adminis_wards {
    return {
      id: faker.datatype.number(),
      name: faker.company.name(),
      remark: faker.lorem.sentence(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    };
  }

  const adminisWards = faker.helpers.multiple(createRandomAdminisWard, {
    count: 5,
  });

  let iw = 1;
  for (const item of adminisWards) {
    await prisma.adminis_wards.create({
      data: {
        id: iw, //item.id,
        name: item.name,
        remark: item.remark,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
    iw++;
  }

  //////////////// Payment Type ///////////////////////
  function createRandomPaymentType(): payment_types {
    return {
      id: faker.datatype.number(),
      type: faker.person.firstName(),
      remark: faker.lorem.sentence(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    };
  }

  const paymentTypes = faker.helpers.multiple(createRandomPaymentType, {
    count: 5,
  });

  const paymentModes = ['Credit Card', 'Debit Card', 'PayPal', 'Cash', 'Bank Transfer'];
  let ip = 1;
  for (const item of paymentTypes) {
    await prisma.payment_types.create({
      data: {
        id: ip,
        type: paymentModes[ip-1],
        remark: item.remark,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
    ip++;
  }

  /////////////// Grants //////////////////////////
  function createRandomGrant(): grants {
    return {
      id: faker.datatype.number(),
      name: faker.company.name(),
      remark: faker.lorem.sentence(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    };
  }

  const grants = faker.helpers.multiple(createRandomGrant, {
    count: 5,
  });

  let ig = 1;
  for (const item of grants) {
    await prisma.grants.create({
      data: {
        id: ig, //item.id,
        name: item.name,
        remark: item.remark,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
    ig++;
  }

  ///////////////// Direct Payment Entry ////////////////////////
  function createRandomDirPaymentEntry(): dir_payment_entries {
    return {
      id: faker.datatype.number(),
      payment_no: faker.datatype.number(),
      payment_date: faker.date.recent(),
      payment_type_id: faker.datatype.number(),
      payee_name: faker.person.fullName(),
      narration: faker.lorem.sentence(),
      grant_id: faker.datatype.number(),
      user_common_budget: faker.datatype.boolean(),
      adminis_ward_id: faker.datatype.number(),
      address: faker.address.streetAddress(),
      department_id: faker.datatype.number(),
      email: faker.internet.email(),
      payment_mode: faker.internet.email(),
      amount: faker.datatype.number(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };
  }

  const paymentEntries = faker.helpers.multiple(createRandomDirPaymentEntry, {
    count: 20,
  });

  let pn =1;
  for (const item of paymentEntries) {
    await prisma.dir_payment_entries.create({
      data: {
        id: item.id,
        payment_no: pn,
        payment_date: item.payment_date,
        payment_type_id: 1,
        payee_name: item.payee_name,
        narration: item.narration,
        grant_id: 1,
        user_common_budget: item.user_common_budget,
        adminis_ward_id: 2,
        address: item.address,
        department_id: 1,
        email: item.email,
        payment_mode: item.payment_mode,
        amount: item.amount,
        created_at: item.created_at,
        updated_at: item.updated_at,
      },
    });
    pn++;
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1)
  });
