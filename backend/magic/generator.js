const fs = require('fs');


const templatesFolder = `${__dirname}/templates`;
const outputFolder = `${__dirname}/generated`;

const daoFolder = outputFolder;
const controllerFolder = outputFolder;
const routeFolder = outputFolder;
const seederFolder = outputFolder;
const validationFolder = outputFolder;
const schemaFolder = outputFolder;


const toPascalCase = (s) => {
    s = s.replace("_", "-");
    return s = s.replace(/\w+/g,
    function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase();}).replaceAll("-", "");
}

const toCamelCase = (s) => {
    s = toPascalCase(s);
    return s.charAt(0).toLowerCase() + s.substring(1);
}


const loadModel = (args) => {
    if(args.length<1){
        console.log("Kindly provide the path to the model details file (.js)");
        return;
    }

    const filePath = args[0];
    const schemaPath = `${process.cwd()}/${filePath}`;
    if(!fs.existsSync(schemaPath)){
        console.log("File does not exist.");
        return;
    }

    return require(schemaPath);

}
const generateDao = (args) => {
    const modelDetails = loadModel(args);
    if(modelDetails == undefined)
        return;

    const daoClassName = toPascalCase(modelDetails.name)+"Dao";
    const daoFilePath = `${daoFolder}/${daoClassName}.ts`;
    var templateData = fs.readFileSync(`${templatesFolder}/all_apis/dao.ts`).toString();
    
    templateData = templateData.replaceAll("{{model_name}}", modelDetails.name);
    templateData = templateData.replaceAll("{{dao_class_name}}", daoClassName);

    // generate field list for get and get-all apis
    let select_fields = "";
    let search_fields = "";
    modelDetails.fields.forEach(field => {
        const fieldName = field.name;
        if(fieldName.endsWith("_id")){
            const relatedModel = fieldName.substring(0, fieldName.lastIndexOf('_'));
            select_fields += `${relatedModel}:{\nselect:{\nid: true,\nname: true\n},\n},\n`;
            search_fields += `{\n${relatedModel}:{\nname:{\ncontains: search, mode: "insensitive",\n},\n},\n},\n`;
        }else{
            select_fields += `${fieldName}: true,\n`;
        }
    });
    templateData = templateData.replaceAll("{{select_fields}}", select_fields);
    templateData = templateData.replaceAll("{{search_fields}}", search_fields);


    fs.writeFileSync(daoFilePath,templateData,{encoding:'utf8',flag:'w'});
    console.log("Generated a Dao file: " + daoFilePath);
    

}



const generateController = (args) => {
    const modelDetails = loadModel(args);
    if(modelDetails == undefined)
        return;



    const nameInPascalCase = toPascalCase(modelDetails.name);
    const nameInCamelCase = toCamelCase(modelDetails.name);

    const controllerClassName = nameInPascalCase + "Controller";
    const controllerFilePath = `${controllerFolder}/${controllerClassName}.ts`;
    var templateData = fs.readFileSync(`${templatesFolder}/all_apis/controller.ts`).toString();

    templateData = templateData.replaceAll("{{BillInvoices}}", nameInPascalCase);
    templateData = templateData.replaceAll("{{billInvoices}}", nameInCamelCase);

    fs.writeFileSync(controllerFilePath, templateData, {encoding: 'utf8', flag: 'w'});
    console.log("Controller file: " + controllerFilePath);
}


const generateRouteFile = (args) => {
    
    const modelDetails = loadModel(args);
    if(modelDetails == undefined)
        return;



    const nameInPascalCase = toPascalCase(modelDetails.name);
    const nameInCamelCase = toCamelCase(modelDetails.name);
    const apiRouteName = modelDetails.name.replace('_', '-');

    const routeClassName = nameInPascalCase + "Route";
    const routeFilePath = `${routeFolder}/${routeClassName}.ts`;

    let templateData = fs.readFileSync(`${templatesFolder}/all_apis/route.ts`).toString();

    templateData = templateData.replaceAll("{{BillInvoices}}", nameInPascalCase);
    templateData = templateData.replaceAll("{{bill-invoices}}", apiRouteName);

    fs.writeFileSync(routeFilePath, templateData, {encoding: 'utf8', flag: 'w'});
    console.log("Route file: " + routeFilePath);
}


const generateSeeder = (args) => {  
    const modelDetails = loadModel(args);
    if(modelDetails == undefined)
        return;

    const recordCount = 10;
    

    const seederName = `${modelDetails.name}_seeder`;
    const seederFilePath = `${seederFolder}/${seederName}.ts`;
    let data = "";
    data += 'import { PrismaClient  } from "@prisma/client";\n';
    data += 'import { faker } from "@faker-js/faker";\n';
    data += 'const prisma = new PrismaClient();\n';
    data += `const ${seederName} = async () => {\n`;
    
    data += `const number_of_records = ${recordCount};\n`;
    data += `for(let i=0;i<number_of_records; i++){\n`;
    data += `const record ={\n`;

    modelDetails.fields.forEach(field => {
        if(field.name == 'id'){}
        else if(field.name.endsWith('id')){
            data += `${field.name}: 1,\n`;
        }else if(field.name === 'created_at'){
            data += `${field.name}: faker.date.past(),\n`;
        }else if(field.name == "updated_at"){
            data += `${field.name}: faker.date.recent(),\n`;
        }else if(field.type === 'Int' || field.type === 'Float'){
            data += `${field.name}: faker.datatype.number(),\n`;
        }else if(field.type === 'DateTime'){
            data += `${field.name}: faker.date.past(),\n`;
        }else if(field.type === 'DateTime'){
            data += `${field.name}: faker.date.past(),\n`;
        }else if(field.type === 'String'){
            data += `${field.name}: faker.lorem.sentence(),\n`;
        }else{
            console.log("Unknown data type for " + field.name);
        }
    });

    data += '};\n';
    data += `await prisma.${modelDetails.name}.create({data: record});\n`;
    data += `}};\n`;
    data += `export default ${seederName};`;
 
    
    fs.writeFileSync(seederFilePath,data,{encoding:'utf8',flag:'w'});
    console.log("Seeder created: " + seederFilePath); 
    
}


const generateValidationFile = (args) => {

    const modelDetails = loadModel(args);
    if(modelDetails == undefined)
        return;


    const nameInPascalCase = toPascalCase(modelDetails.name);
    const nameInCamelCase = toCamelCase(modelDetails.name);
    const validationFilePath = `${validationFolder}/${nameInCamelCase}Validation.ts`;
    let data = "";

    data += `import Joi from "joi";\n`;
    data += `import { Request } from "express";\n\n`;

    // data type interface
    let type_interface = `export interface ${nameInPascalCase}RequestData {\n`;
    let joi_schema = `const ${nameInCamelCase}Schema = Joi.object ({\n`;
    let request_data_collector = `export const requestData = (req: Request): ${nameInPascalCase}RequestData => {\nreturn {\n`;
    let multi_request_data_collector = `export const multiRequestData = (req: Request): ${nameInPascalCase}RequestData [] => {\nconst data = [];\nfor(const item of req.body) {\ndata.push({\n`;

    modelDetails.fields.forEach(field => {
        if(['id', 'created_at', 'updated_at'].indexOf(field.name) != -1){}
        else{
            request_data_collector += `${field.name}: req.body.${field.name},\n`;
            multi_request_data_collector += `${field.name}: item.${field.name},\n`;
            if(field.type == "Int" || field.type == "Float"){
                type_interface += `${field.name}: number,\n`;
                joi_schema += `${field.name}: Joi.number().required(),\n`;
            }else if(field.type == "String"){
                type_interface += `${field.name}: string,\n`; 
                joi_schema += `${field.name}: Joi.string().required(),\n`;
            }else if(field.type == "DateTime"){
                type_interface += `${field.name}: Date,\n`; 
                joi_schema += `${field.name}: Joi.date().required(),\n`;
            }else{
                console.log(">>> Unknown field type: " + field.name);
            }
    
        }
    });

    type_interface += `}\n\n`;
    joi_schema += `})\n\n`;
    request_data_collector += `};\n};\n`;
    multi_request_data_collector += `});\n}\nreturn data;\n};`;

    data += type_interface + joi_schema;

    data += `export const ${nameInCamelCase}Validation = Joi.array().items(\n${nameInCamelCase}Schema\n);\n`;
    
    data += `export const ${nameInCamelCase}ValidationWithID = ${nameInCamelCase}Schema.keys({\nid: Joi.number().required(),\n});\n`;

    data += request_data_collector;
    data += multi_request_data_collector;

    fs.writeFileSync(validationFilePath, data, {encoding: 'utf8', flag: 'w'});
    console.log("Validation File: " + validationFilePath);
}


const generatePrismaSchema = (args) => {

    const modelDetails = loadModel(args);
    if(modelDetails == undefined)
        return;

    let schema = "";
    schema += `\n////${modelDetails.name}: Managed by: Bijoy Paitandi\n`;
    schema += `model ${modelDetails.name}{\n`;

    modelDetails.fields.forEach(field => {
        const fieldName = field.name.padEnd(20);
            if(field.hasOwnProperty('constraint')){
                const fieldType = field.type.padEnd(20);
                const constraint = field.constraint;
                
                schema += `\t${fieldName}${fieldType}${constraint}\n`;
                
            }else{
                schema += `\t${fieldName}${field.type}\n`;
            }
            
    });

    schema += `}\n`;
    
    const schemaFilePath = `${schemaFolder}/${modelDetails.name}.prisma`;
    fs.writeFileSync(schemaFilePath, schema, {encoding: 'utf8', flag: 'w'});
    console.log("Prisma Schema File: " + schemaFilePath);
}



module.exports = {
    generateDao,
    generateController,
    generateRouteFile,
    generateSeeder,
    generateValidationFile,
    generatePrismaSchema,
}