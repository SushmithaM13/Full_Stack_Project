const mongoose=require('mongoose');

const SlotSchema=new mongoose.Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    isBooked: {type: Boolean, default: false}
});

const DoctorProfileSchema=new mongoose.Schema({
    users:{
        type :mongoose.Schema.Types.ObjectId, 
        ref: "Users", required: true, unique: true
    },
    speciality :{type: String, required: true},
    fee: {type: Number, required: true},
    clinicAddress: {type: String, required: true},
    emergencyContact:{ type: Number, required: true},
    availableSlots: [SlotSchema],
},{ timestamps: true}
);

module.exports=mongoose.model("DoctorProfile", DoctorProfileSchema);
// module.exports=doctormodel;
