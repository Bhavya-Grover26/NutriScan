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
      const { name, email, password, phone } = req.body;
      const newUser = new User({ name, email, password, phone });
      await newUser.save();
  
      res.status(201).json({ 
        _id: newUser._id, 
        name: newUser.name, 
        email: newUser.email, 
        phone: newUser.phone 
      }); // Ensure _id is returned
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Registration failed" });
    }
});

module.exports = router;