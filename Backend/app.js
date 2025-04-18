const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.use(express.json());
require("dotenv").config(); // Load .env file

const cors = require("cors");
app.use(cors()); // Allow all origins


const mongoUrl="mongodb+srv://pfa2nd:QHJBuTHwoPLOWqVz@cluster0.jg69u.mongodb.net/AppData?retryWrites=true&w=majority&appName=Cluster0"

require('./models/UserDetails')
require('./models/SpecificCategory')
require("./models/Product")
require("./models/BarcodeInfo")
require("./models/Preference")
require('./models/Search')
require('./models/ProductHistory')

const { verifyToken } = require("./routes/authentication");
const authRoutes = require("./routes/authentication"); // Correct import
app.use(authRoutes); //  Use it correctly
app.use(require('./routes/specificcat'))
app.use(require("./routes/products"))
app.use(require("./routes/barcodeinfo"))
app.use(require("./routes/preference"))
app.use(require('./routes/search'))
app.use(require('./routes/producthistory'))

app.get("/",(req,res)=>{
  res.send({status:"Started"})
})

mongoose.connect(mongoUrl).then(()=>{
  console.log("pfa2 mongodb connected")
}).catch((e)=>{
  console.log(e)
})



app.listen(5001,()=>{
    console.log("nodejs server started");
})