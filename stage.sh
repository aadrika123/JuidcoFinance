#!/bin/sh
SERVER_PORT=5001
DB_PASSWORD="judico@2024"


installModules () {
    echo "Installing frontend node modules ..."
    npm --prefix ./frontend install

    echo "Installing backend node modules ..."
    npm --prefix ./backend install
}

resetDatabases() {
    rm -rf ./backend/prisma/migrations
    cd backend
    echo "creating/updating the env file ..."
    echo "PORT=$SERVER_PORT\nDATABASE_URL=\"postgresql://postgres:$DB_PASSWORD@localhost:5432/juidco_finance?schema=public\"" > .env
    npx prisma migrate dev --name init
    cd ..
}

buildThem(){
    echo "building backend ..."
    npm --prefix ./backend run build

    echo "building frontend ..."
    npm --prefix ./frontend run build
}

startServices(){

    pm2 delete "jfinance-back"
    pm2 delete "jfinance-front"

    cd ./backend

    pm2 start npm --name "jfinance-back" -- start
    cd ../frontend
    pm2 start npm --name "jfinance-front" -- start

    cd ..
    pm2 list
}




installModules
resetDatabases
buildThem
startServices


echo "things to do now: "
echo "modify the frontend next.config.js file to indicate the server port"
echo "modify the frontend package.json file to set the port (-p 4000), in the start command"
echo "use pm2 to start the frontend and backend separately, hint: "
echo "pm2 start npm --name "jfinance-back" -- start"
echo "pm2 start npm --name "jfinance-front" -- start"
echo "make sure services are running: "
echo "pm2 list"
