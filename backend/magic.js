
const showHelp = () => {
    console.log("\n\nSyntax: node magic.js <command>")
    console.log("\ncommands:");
    console.log(`
        merge:  merges all the schema files into one file.
    `);
}


const mergeSchemas = () => {
}


const args = process.argv;
if(args.length < 3){console.log("Please provide an argument ...");showHelp();}
else
{
    const command = args[2];
    
    if(command == "merge"){mergeSchemas();}

    else{console.log("Unknown command: " + command);showHelp();}
}