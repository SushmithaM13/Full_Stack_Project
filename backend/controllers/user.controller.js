const User=require("../models/user.model");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

exports.registerUser=async(req, res)=>{
    const {name, email, password, role, address, contact, gender}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "User already exists"});
        const hashedPassword=await bcrypt.hash(password, 10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role,
            address,
            contact,
            gender
            // ...req.body,password:hashedpassword
        });
        res.status(201).json({message: "User registerd successfully", user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.loginUser=async(req,res)=>{
    const {email, password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user)
            return res.status(404).json({message: "User not found"});
        // compare passwords
        const isMatch=await bcrypt.compare(password, user.password);
        // after compare if it doen't match 
        if(!isMatch)
            return res.status(401).json({messsage:"Invalid credentials"});
        // if it match then we will generate token
        const token = jwt.sign({ userId:user._id, role:user.role }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h'}   //'1d'
        );
        res.status(200).json({message: "Login Successful", token, user});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}