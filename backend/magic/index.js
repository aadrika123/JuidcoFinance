const prisma = require("./prisma");
const generator = require("./generator");
const generator2 = require("./generator2");

const commands = {
    prisma: {
        meta: { desc: "prisma related commands" },
        options: {
            merge: {
                desc: "merges all the schema files into one file.",
                task: prisma.mergeSchemas
            }
        }
    },

    generate: {
        meta: { desc: "generates code for the project" },
        options: {
            dao: {
                desc: "generates dao code from schema",
                task: generator.generateDao
            },
            controller: {
                desc: "generates controller code from schema",
                task: generator.generateController
            },
            route:{
                desc: "generates route code from schema",
                task: generator.generateRouteFile
            },
            seeder:{
                desc: "generate seeder code",
                task: generator.generateSeeder
            },
            validation: {
                desc: "generate validation file",
                task: generator.generateValidationFile
            },
            schema: {
                desc: "generate .prisma file",
                task: generator.generatePrismaSchema
            },
            all:{
                desc: "generate full api (.prisma, dao, controller, route, validation, seeder )",
                task: (args) => {
                    generator.generatePrismaSchema(args);
                    generator.generateDao(args);
                    generator.generateController(args);
                    generator.generateSeeder(args);
                    generator.generateRouteFile(args);
                    generator.generateValidationFile(args);
                }
            }
        }
    },
    generate2: {
        meta: {
            desc: "generates code for reference tables (those having only id, name)"
        },
        options: {
            schema: {
                desc: "generate .prisma file",
                task: generator2.generatePrismaSchema
            },
            seeder:{
                desc: "generate seeder code",
                task: generator2.generateSeeder
            },
            dao: {
                desc: "generates dao code from schema",
                task: generator2.generateDao
            },
            controller: {
                desc: "generates controller code from schema",
                task: generator2.generateController
            },
            route:{
                desc: "generates route code from schema",
                task: generator2.generateRouteFile
            },
            all:{
                desc: "generate full api (.prisma, dao, controller, route, validation, seeder )",
                task: (args) => {
                    generator2.generatePrismaSchema(args);
                    generator2.generateDao(args);
                    generator2.generateController(args);
                    generator2.generateSeeder(args);
                    generator2.generateRouteFile(args);
                }
            }
        }

    }
};


const showHelp = () => {
    console.log("\n\nSyntax: node magic.js <command> <option>")
    console.log("\ncommands:\n");
    
    for (const [command, command_info] of Object.entries(commands)) {
        console.log(`${command}: ${command_info.meta.desc}`);

        console.log(" options: ");
        for(const [option, option_info] of Object.entries(command_info.options)){
            console.log(`  ${option}: ${option_info.desc}`);
        }
        console.log("\n");
    }
}



const main = () => {

    const args = process.argv.slice(2);
    const argc = args.length;
    if (argc < 1) {
        console.log("Must provide a command.")
        showHelp();
        return;
    }

    const command = args[0];
    if(Object.prototype.hasOwnProperty.call(commands, command)){
        const options = commands[command].options;

        if(argc < 2){
            console.log("Must provide an option.");
            showHelp();
            return;
        }

        const option = args[1];
        if(Object.prototype.hasOwnProperty.call(options, option)){
            const task = options[option].task;
            task(args.slice(2));
        }else{
            console.log("\nInvalid Option.");
            showHelp();
        }

    }else{
        console.log("\nInvalid command.");
        showHelp();
    }
}

main();
