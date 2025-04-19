//create the Server

const express=require("express");

const dotenv=require("dotenv");

const connectDB=require("./config/db");
const userRoutes=require("./routes/userRoutes");
const cors=require("cors");
const { connect } = require("mongoose");

dotenv.config();  //to load the environment variables



const app=express();  //initialize the express app


app.use(express.json());  //to parse the incoming request body as JSON


connectDB();  //connect to the database


//middleware to handle the cors origin
//app.use(cors());  //allow all origins

//use the user routes
app.use("/api/user",userRoutes);

const PORT=process.env.PORT || 5000;  //define the port

app.listen(PORT,()=>{  //start the server
    console.log(`Server is running on port ${PORT}`);
}
)

