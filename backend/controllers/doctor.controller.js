const DoctorProfile=require("../models/doctor.model");

exports.createDoctorProfile=async(req, res)=>{
    const userId=req.user.userId; //from JWT and middleware
    const {speciality, fee, clinicAddress, emergencyContact, availableSlots }=req.body;
    try {
        const existingProfile=await DoctorProfile.findOne({user: userId});
        if(existingProfile){
            return res.status(400).json({message: "Doctor Profile already exists"});
        }

        const newProfile=await DoctorProfile.create({
            user: userId,
            speciality,
            fee,
            clinicAddress,
            emergencyContact,
            availableSlots
        });
        res.status(201).json({message: "Doctor Profile created successfully", profile:newProfile});
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};

exports.getDoctorProfile=async(req, res)=>{
    try {
        const profile=await DoctorProfile.findOne({user: req.user.userId}).populate("users");
        if(!profile)
            return res.status(404).json({message: "Profile not found"});
    } catch (err) {
        res.status(500).json({message: err.message})
    }
};