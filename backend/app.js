const express=require('express');
const cors =require('cors');
const dotenv=require('dotenv');

dotenv.config();

const app=express();

//middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', require("./routes/user.routes"));
app.use('/api/doctor', require("./routes/doctor.routes"));

module.exports=app;