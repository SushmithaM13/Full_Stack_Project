const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role : {type: String, required: true, enum:["doctor", "patient"], default: 'user'},
    address : {type: String},
    contact: {type: Number, required: true},
    gender: {type: String, required: true}
},{timestamps: true}
);

module.exports=mongoose.model("Users", UserSchema);



