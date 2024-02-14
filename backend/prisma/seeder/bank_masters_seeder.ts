//   ///////////////// Bank Master ////////////////////////
//   function createRandomUser(): bank_masters {
//     return {
//       id: faker.datatype.number(),
//       bank_name: faker.company.name(),
//       ifsc_code: faker.finance.routingNumber(),
//       branch: faker.company.companySuffix(),
//       micr_code: faker.finance.account(),
//       branch_address: faker.address.streetAddress(),
//       branch_city: faker.address.city(),
//       branch_state: faker.address.state(),
//       branch_district: faker.address.county(),
//       email: faker.internet.email(),
//       contact_no: faker.phone.number(),
//       contact_person_name: faker.internet.userName(),
//       created_at: faker.date.recent(),
//       updated_at: faker.date.recent(),
//     };
//   }

//   const data = faker.helpers.multiple(createRandomUser, {
//     count: 20,
//   });

//   for (const item of data) {
//     await prisma.bank_masters.create({
//       data: {
//         id: item.id,
//         bank_name: item.bank_name,
//         ifsc_code: item.ifsc_code,
//         branch: item.branch,
//         micr_code: item.micr_code,
//         branch_address: item.branch_address,
//         branch_city: item.branch_city,
//         branch_state: item.branch_state,
//         branch_district: item.branch_district,
//         email: item.email,
//         contact_no: item.contact_no,
//         contact_person_name: item.contact_person_name,
//         created_at: item.created_at,
//         updated_at: item.updated_at,
//       },
//     });
//   }
