const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//userregistration

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });


        //check user exists
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hashing the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);



        //create the user

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        //generate the JWT token

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })



    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
}


//userlogin

exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user = await User.findOne({ email });


        //check user exists
        if (!user) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hashing the password

        const isMatch = await bcrypt.compare(password,user.password);
        if (!user) {
            return res.status(401).json({ message: "Invalid Password" });
        }



        
        //generate the JWT token

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })



    }
 
    catch (error) {
        res.status(500).json({ message: error.message });

    }
   
}