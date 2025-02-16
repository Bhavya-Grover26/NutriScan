const express=require("express");
const router = express.Router()
const mongoose=require("mongoose");

const User=mongoose.model("User")

router.post("/login", async (req, res) => {
    const { name, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ name: name });
  
      if (!user) {
        return res.send({ status: "error", data: "User not found" });
      }
  
      // Check if the password is correct (assuming plain text for now)
      if (user.password !== password) {
        return res.send({ status: "error", data: "Invalid password" });
      }
  
      // Login successful
      res.send({ status: "ok", data: "Login successful" });
    } catch (error) {
      res.send({ status: "error", data: error });
      console.error("Error logging in:", error);
    }
  });
  
  

router.post("/register",async(req,res)=>{
    const {name,email,password,phone}=req.body;

    const oldUser= await User.findOne({name:name});

    if(oldUser){
        return res.send({data:"User already exists"});
    }

    try{
        await User.create({
            name:name,
            email:email,
            password:password,
            phone:phone
        });
        res.send({status:'ok', data:"user created yay"})
    } catch(error) {
        res.send({status:'error', data:error})
        console.error("Error creating user:", error);

    }
});

module.exports = router;