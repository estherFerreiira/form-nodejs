const express =  require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const routes = require("./src/route/formRoutes.js")
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=> console.log("DB Conncection Successfull"))
    .catch((err)=> {
        console.log(err)
});


app.listen(process.env.PORT || 4000,()=>{
    console.log("Backend server is runnig!")
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/form",routes)