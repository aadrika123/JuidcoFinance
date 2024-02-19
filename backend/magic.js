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
    const subFolders = [];
    for (let i = 0; i < items.length; i++) {
        const file = items[i];
        const x = folder + "/" + file;
        if (fs.lstatSync(x).isDirectory()) {
            subFolders.push(x);
        } else {
            list.push(x);
        }
    }

    for(let i=0;i< subFolders.length;i++){
        await getSchemaFileList(subFolders[i], list);
    };
}


const mergeSchemas = async () => {
    const schemaFolder = "./prisma/schemas";

    const list = [];
    await getSchemaFileList(schemaFolder, list);
    
    // console.log(list);

    const outputFile = "./prisma/schema.prisma";
    
    fs.writeFileSync(outputFile,"");

    list.forEach(file => {
        var d = fs.readFileSync(file).toString();
        fs.appendFileSync(outputFile, d + "\n");
    });

    console.log(`Merged ${list.length} schema files into ${outputFile}`);
}


const args = process.argv;
if (args.length < 3) { console.log("Please provide an argument ..."); showHelp(); }
else {
    const command = args[2];

    if (command == "merge") { mergeSchemas(); }

    else { console.log("Unknown command: " + command); showHelp(); }
}