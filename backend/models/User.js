const mongoose=require("mongoose");


//define the user Schema

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }



})

const User=mongoose.model("User",userSchema);
module.export=User;