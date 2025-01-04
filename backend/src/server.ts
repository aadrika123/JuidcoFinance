import dotenv from "dotenv";

import app from './app';
// import startGRPC from './grpc_server';

dotenv.config();


const PORT = process.env.PORT || 5001;
// const GRPC_PORT = process.env.GRPC_PORT || 9090;
app.use('/',(req,res)=>{
  res.send("checker")
})

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

// if(process.env.GRPC_ENABLED === "1"){startGRPC(GRPC_PORT);}