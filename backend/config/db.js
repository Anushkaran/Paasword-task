const mongoose=require("mongoose");


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected Successfully");

    }

    catch(error){
        console.log("MongoDB connection failed",error.message);
    }
}

module.exports=connectDB;