const connectDB=require("./config/db");
const app=require('./app');

connectDB();

const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})