const fs = require('fs');
    
const showHelp = () => {
    console.log("\n\nSyntax: node magic.js <command>")
    console.log("\ncommands:");
    console.log(`
        merge:  merges all the schema files into one file.
    `);
}


const getSchemaFileList = async (folder, list) => {

    const items = fs.readdirSync(folder);
    for (let i=0;i<items.length;i++){
        const file = items[i];
        const x = folder+"/"+file;
        if(fs.lstatSync(x).isDirectory()){
            await getSchemaFileList(x, list);
        }else{
            list.push(x);
        }
    }
}


const mergeSchemas = async () => {
    const schemaFolder = "./prisma/schemas";
    const list = [];
    await getSchemaFileList(schemaFolder, list);
    console.log(list);
    
}


const args = process.argv;
if (args.length < 3) { console.log("Please provide an argument ..."); showHelp(); }
else {
    const command = args[2];

    if (command == "merge") { mergeSchemas(); }

    else { console.log("Unknown command: " + command); showHelp(); }
}